import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { proseLines } from './audyt-stylu.mjs';

const DNI = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia',
  'września', 'października', 'listopada', 'grudnia'];
const DATA = new RegExp(`(?<![\\p{L}])(${DNI.join('|')}),?\\s+(\\d{1,2})\\s+(${MIESIACE.join('|')})\\s+(\\d{4})`, 'giu');
const UKRYTE = /[­​-‏‪-‮⁠﻿�]/u;
const POZOSTALOSCI = [
  ['szablon', /\$\{[^}]*\}|\{\{[^}]*\}\}/u],
  ['znacznik roboczy', /\[(?:NF|TODO|TBD|DO WERYFIKACJI|DO UZUPEŁNIENIA|PRZYPIS)[^\]]*\]/iu],
  ['komentarz', /<!--|-->/u],
  ['dopisek roboczy', /(?<![\p{L}])(?:DO WERYFIKACJI|DO UZUPEŁNIENIA|TODO)(?![\p{L}])/u],
];
const DOMYSLNE = {
  typografiaPolska: true,
  cyfryTylkoWKursywie: false,
  zakazNawiasowKwadratowych: false,
  minSlow: null,
  maxSlow: null,
  maxSpadekSlowProc: 3,
  limity: [],
  zakazaneNazwy: [],
};

// Wzorce gotowe do użycia w regułach projektu bez pisania wyrażeń regularnych.
const WBUDOWANE = {
  'antyteza': { rx: /(?<![\p{L}])nie(?![\p{L}])[^.!?\n]{1,80}?, (?:tylko|lecz)(?![\p{L}])/giu },
  'to-nie-bylo': { rx: /(?<![\p{L}])(?:to\s+)?nie\s+był[aoy]?(?:\s+to)?\s[^.!?\n]{1,80}[.!?]\s+(?:to\s+)?był[aoy]?(?![\p{L}])/giu },
  'dwukropek-zapowiedz': { rx: /[\p{Ll}»”]:\s/gu, narracja: true },
  'potrojna-anafora': { rx: /(?<![\p{L}])(bez|ani|nie)\s[^,.;!?\n]{1,40},\s+\1\s[^,.;!?\n]{1,40},\s+\1(?![\p{L}])/giu },
};

function escape(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// „fraza” to dosłowny zwrot z granicami słów Unicode; gwiazdka na końcu dopuszcza końcówki odmiany.
function compileLimit(limit) {
  if (limit.wbudowany) {
    const item = WBUDOWANE[limit.wbudowany];
    if (!item) throw new Error(`Nieznany wzorzec wbudowany: ${limit.wbudowany}. Dostępne: ${Object.keys(WBUDOWANE).join(', ')}.`);
    return new RegExp(item.rx.source, item.rx.flags);
  }
  if (limit.wzorzec) return new RegExp(limit.wzorzec, 'giu');
  const prefix = limit.fraza.endsWith('*');
  const core = escape(prefix ? limit.fraza.slice(0, -1) : limit.fraza).replace(/\s+/g, '\\s+');
  return new RegExp(`(?<![\\p{L}\\p{N}])${core}${prefix ? '[\\p{L}]*' : '(?![\\p{L}\\p{N}])'}`, 'giu');
}

function countWords(text) {
  return text.split(/[\s ]+/u).filter(Boolean).length;
}

function headings(text) {
  return text.split(/\r?\n/).filter(l => /^\s{0,3}#{1,6}\s/.test(l)).map(l => l.trim());
}

export function addHardSpaces(text) {
  return text.replace(/(?<![\p{L}\p{N}])([aiouwzAIOUWZ]) (?=\S)/gu, '$1 ');
}

export function checkUnit(text, rules = {}, previous = null) {
  const cfg = { ...DOMYSLNE, ...rules };
  const bledy = [];
  const uwagi = [];
  const add = (list, rodzaj, linia, fragment) => list.push({ rodzaj, linia, fragment: fragment.slice(0, 160) });
  const typo = cfg.typografiaPolska && Object.hasOwn(rules, 'typografiaPolska') ? bledy : uwagi;
  const prose = proseLines(text);
  const rawLines = text.replace(/^﻿/, '').split(/\r?\n/);

  rawLines.forEach((line, i) => {
    if (UKRYTE.test(line)) add(bledy, 'znak niewidoczny lub zastępczy', i + 1, JSON.stringify(line.match(UKRYTE)[0]));
    for (const [rodzaj, rx] of POZOSTALOSCI) if (rx.test(line)) add(bledy, `pozostałość robocza: ${rodzaj}`, i + 1, line);
    for (const m of line.matchAll(DATA)) {
      const [, dzien, d, mies, rok] = m;
      const date = new Date(Date.UTC(+rok, MIESIACE.indexOf(mies.toLowerCase()), +d));
      if (date.getUTCDate() !== +d) { add(bledy, 'nieistniejąca data', i + 1, m[0]); continue; }
      const real = DNI[date.getUTCDay()];
      if (real !== dzien.toLowerCase()) add(bledy, `dzień tygodnia: w kalendarzu ${real}`, i + 1, m[0]);
    }
  });

  for (const { line, text: l } of prose) {
    if (!l.trim()) continue;
    if (cfg.typografiaPolska) {
      if (/"/u.test(l)) add(typo, 'prosty cudzysłów', line, l);
      if (/“/u.test(l)) add(typo, 'angielski cudzysłów otwierający (“)', line, l);
      if (/—/u.test(l)) add(typo, 'pauza (—) zamiast półpauzy', line, l);
      if (/\.\.\./u.test(l)) add(typo, 'trzy kropki zamiast wielokropka', line, l);
      if (/^\s*-\s/u.test(l) || /\s-\s/u.test(l)) add(typo, 'dywiz zamiast półpauzy', line, l);
    }
    if (cfg.cyfryTylkoWKursywie && /\p{Nd}/u.test(l.replace(/\*[^*]+\*/gu, '').replace(/_[^_]+_/gu, '')))
      add(bledy, 'cyfry poza kursywą', line, l);
    if (cfg.zakazNawiasowKwadratowych && /[[\]]/u.test(l)) add(bledy, 'nawias kwadratowy w prozie', line, l);
  }

  const body = prose.map(p => p.text).join('\n');
  const liczniki = [];
  for (const limit of cfg.limity) {
    const rx = compileLimit(limit);
    const narracja = limit.tylkoNarracja ?? WBUDOWANE[limit.wbudowany]?.narracja ?? false;
    const miejsca = [];
    for (const { line, text: l } of prose) {
      if (narracja && /^\s*[–—-]\s/u.test(l)) continue;
      for (const m of l.matchAll(rx)) miejsca.push({ linia: line, fragment: m[0] });
    }
    const item = { nazwa: limit.nazwa ?? limit.wbudowany ?? limit.fraza ?? limit.wzorzec, liczba: miejsca.length, max: limit.max ?? null, miejsca: miejsca.slice(0, 12) };
    liczniki.push(item);
    if (item.max !== null && item.liczba > item.max)
      bledy.push({ rodzaj: `limit przekroczony: ${item.nazwa} (${item.liczba} > ${item.max})`, linia: miejsca[0]?.linia ?? null, fragment: miejsca.map(m => `L${m.linia}`).join(', ') });
  }
  for (const name of cfg.zakazaneNazwy) {
    const rx = compileLimit({ fraza: name.endsWith('*') ? name : `${name}*` });
    rawLines.forEach((l, i) => { if (rx.test(l)) add(bledy, `zakazana lub wycofana nazwa: ${name}`, i + 1, l); rx.lastIndex = 0; });
  }

  const slowa = countWords(text);
  const slowaProzy = countWords(body);
  // Typ jednostki to pierwsze słowo ostatniego nagłówka przed prozą, np. „### Interludium II. Tytuł”.
  const typ = headings(text).map(h => h.replace(/^#+\s*/, '').split(/[\s.]/)[0]).at(-1) ?? null;
  const wgTypu = cfg.slowaWgTypu?.[typ] ?? {};
  const min = wgTypu.min ?? cfg.minSlow;
  const max = wgTypu.max ?? cfg.maxSlow;
  if (min !== null && min !== undefined && slowa < min) bledy.push({ rodzaj: `za krótko: ${slowa} < ${min}${typ ? ` (${typ})` : ''}`, linia: null, fragment: '' });
  if (max !== null && max !== undefined && slowa > max) bledy.push({ rodzaj: `za długo: ${slowa} > ${max}${typ ? ` (${typ})` : ''}`, linia: null, fragment: '' });
  if (slowaProzy === 0) bledy.push({ rodzaj: 'brak prozy w pliku', linia: null, fragment: '' });

  let porownanie = null;
  if (previous !== null) {
    const stare = countWords(previous);
    const zmiana = stare ? Math.round((slowa - stare) / stare * 1000) / 10 : null;
    const now = new Set(headings(text));
    const brakujaceNaglowki = headings(previous).filter(h => !now.has(h));
    const separatory = t => t.split(/\r?\n/).filter(l => /^\s*(\*\s*){3}$|^\s*([-_]\s*){3,}$/u.test(l)).length;
    porownanie = { slowaPoprzednio: stare, slowaTeraz: slowa, zmianaProc: zmiana, brakujaceNaglowki,
      separatoryScenPoprzednio: separatory(previous), separatoryScenTeraz: separatory(text) };
    if (zmiana !== null && -zmiana > cfg.maxSpadekSlowProc)
      bledy.push({ rodzaj: `spadek objętości o ${-zmiana}% (próg ${cfg.maxSpadekSlowProc}%): sprawdź, czy nie usunięto lub nie streszczono scen`, linia: null, fragment: '' });
    if (brakujaceNaglowki.length) bledy.push({ rodzaj: 'zniknęły nagłówki z poprzedniej wersji', linia: null, fragment: brakujaceNaglowki.join(' | ') });
  }

  return {
    wersja: 1,
    znaczenie: 'Kontrola techniczna jednostki. Nie ocenia jakości literackiej ani kanonu i niczego nie poprawia w pliku wejściowym.',
    metodaLiczeniaSlow: 'Ciągi znaków rozdzielone białymi znakami, twarda spacja liczy się jako biały znak. „slowa” obejmuje nagłówki i linie dat; „slowaProzy” pomija nagłówki, tabele, bloki kodu i frontmatter.',
    typJednostki: typ, slowa, slowaProzy, liczniki, porownanie, bledy, uwagi,
  };
}

// Kontrola zakresu (część, tom): każda jednostka osobno, potem sumy i limity „maxTom”.
export function checkVolume(inputs, rules = {}) {
  const jednostki = inputs.map(input => ({ plik: input.path, ...checkUnit(input.text, rules) }));
  const bledy = [];
  const slowa = jednostki.reduce((a, j) => a + j.slowa, 0);
  const liczniki = (rules.limity ?? []).map((limit, i) => {
    const liczba = jednostki.reduce((a, j) => a + j.liczniki[i].liczba, 0);
    const item = { nazwa: jednostki[0]?.liczniki[i].nazwa, liczba, maxTom: limit.maxTom ?? null,
      wJednostkach: jednostki.filter(j => j.liczniki[i].liczba).map(j => `${j.plik} (${j.liczniki[i].liczba})`) };
    if (item.maxTom !== null && liczba > item.maxTom) bledy.push({ rodzaj: `limit zakresu przekroczony: ${item.nazwa} (${liczba} > ${item.maxTom})`, linia: null, fragment: item.wJednostkach.join(', ') });
    return item;
  });
  if (rules.minSlowTomu && slowa < rules.minSlowTomu) bledy.push({ rodzaj: `zakres za krótki: ${slowa} < ${rules.minSlowTomu}`, linia: null, fragment: '' });
  const teksty = new Map();
  const naglowki = new Map();
  inputs.forEach(input => {
    const key = input.text.replace(/\s+/gu, ' ').trim();
    if (key && teksty.has(key)) bledy.push({ rodzaj: 'dwa pliki o identycznej treści', linia: null, fragment: `${teksty.get(key)} = ${input.path}` });
    else teksty.set(key, input.path);
    for (const h of headings(input.text).filter(h => /^#{3,}\s/.test(h))) {
      if (naglowki.has(h)) bledy.push({ rodzaj: 'powtórzony nagłówek jednostki', linia: null, fragment: `${h}: ${naglowki.get(h)} i ${input.path}` });
      else naglowki.set(h, input.path);
    }
  });
  const bledyJednostek = jednostki.reduce((a, j) => a + j.bledy.length, 0);
  return {
    wersja: 1,
    znaczenie: 'Kontrola techniczna zakresu: jednostki osobno oraz sumy. Nie ocenia jakości literackiej ani kanonu.',
    jednostek: jednostki.length, slowa, liczniki, bledy, bledyJednostek, jednostki,
  };
}

function loadFile(arg) {
  const path = realpathSync(resolve(arg));
  if (!statSync(path).isFile()) throw new Error(`Wejście nie jest plikiem: ${arg}`);
  return { path, text: readFileSync(path, 'utf8') };
}

const HELP = `Użycie: node kontrola-jednostki.mjs [--reguly reguly.json] [--porownaj poprzednia.md] [--twarde-spacje wynik.md] [--] plik.md
       node kontrola-jednostki.mjs [--reguly reguly.json] [--] jednostka1.md jednostka2.md ...
Raport JSON na standardowym wyjściu. Pliki wejściowe nigdy nie są zmieniane.
Kilka plików: kontrola każdej jednostki, sumy, limity „maxTom”, duplikaty treści i nagłówków.
--twarde-spacje zapisuje kopię z twardymi spacjami po jednoliterowych wyrazach do NOWEGO pliku.
Skróty: -r/--rules, -p/--compare, -n/--nbsp. Prościej: node scripts/ks.mjs pomoc.
Kod wyjścia 1 oznacza błąd wywołania albo znalezione błędy kontroli. Node.js 20 lub nowszy.
`;

const ALIASY = {
  '--reguly': '--reguly', '--rules': '--reguly', '-r': '--reguly',
  '--porownaj': '--porownaj', '--compare': '--porownaj', '-p': '--porownaj',
  '--twarde-spacje': '--twarde-spacje', '--nbsp': '--twarde-spacje', '-n': '--twarde-spacje',
};

function readArgs(args) {
  const opts = {};
  const files = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--') { files.push(...args.slice(i + 1)); break; }
    const name = ALIASY[a];
    if (name) {
      if (i + 1 >= args.length) throw new Error(`Brak wartości dla ${a}.`);
      opts[name] = args[++i];
    } else if (a.startsWith('--')) throw new Error(`Nieznana opcja ${a}; szczegóły: --help.`);
    else files.push(a);
  }
  if (!files.length) throw new Error('Podaj plik jednostki; szczegóły: --help.');
  return { opts, files };
}

function main(args) {
  if (args.length === 1 && args[0] === '--help') { process.stdout.write(HELP); return; }
  const { opts, files } = readArgs(args);
  const rules = opts['--reguly'] ? JSON.parse(loadFile(opts['--reguly']).text.replace(/^﻿/, '')) : {};
  if (files.length > 1) {
    if (opts['--porownaj'] || opts['--twarde-spacje']) throw new Error('--porownaj i --twarde-spacje działają tylko dla jednego pliku.');
    const seen = new Set();
    const inputs = files.map(f => {
      const input = loadFile(f);
      const id = process.platform === 'win32' ? input.path.toLowerCase() : input.path;
      if (seen.has(id)) throw new Error(`Ten sam plik podano więcej niż raz: ${f}`);
      seen.add(id);
      return input;
    });
    const report = checkVolume(inputs, rules);
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
    if (report.bledy.length || report.bledyJednostek) process.exitCode = 1;
    return;
  }
  const input = loadFile(files[0]);
  const previous = opts['--porownaj'] ? loadFile(opts['--porownaj']) : null;
  if (previous && previous.path.toLowerCase() === input.path.toLowerCase()) throw new Error('Plik porównania jest tym samym plikiem co wejście.');
  const report = checkUnit(input.text, rules, previous?.text ?? null);
  report.plik = input.path;
  if (opts['--twarde-spacje']) {
    const out = resolve(opts['--twarde-spacje']);
    if (existsSync(out)) throw new Error(`Plik wynikowy już istnieje, nie nadpisuję: ${opts['--twarde-spacje']}`);
    writeFileSync(out, addHardSpaces(input.text), 'utf8');
    report.zapisanoKopie = out;
  }
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  if (report.bledy.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`Błąd: ${error.message}\n`);
    process.exitCode = 1;
  }
}
