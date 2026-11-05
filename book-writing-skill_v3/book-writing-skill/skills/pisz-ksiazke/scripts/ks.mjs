import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { analyzeTexts } from './audyt-stylu.mjs';
import { addHardSpaces, checkUnit, checkVolume } from './kontrola-jednostki.mjs';
import { applyPairs, pattern } from './zamien.mjs';

// Jednowyrazowe komendy po polsku i po angielsku; polskie znaki są opcjonalne.
const KOMENDY = {
  sprawdz: 'sprawdz', check: 'sprawdz',
  tom: 'tom', volume: 'tom',
  porownaj: 'porownaj', diff: 'porownaj',
  styl: 'styl', style: 'styl',
  spacje: 'spacje', nbsp: 'spacje',
  zamien: 'zamien', patch: 'zamien',
  tiki: 'tiki', ticks: 'tiki',
  gestosc: 'gestosc', density: 'gestosc',
  pomoc: 'pomoc', help: 'pomoc',
};
const REGULY = ['reguly_kontroli.json', join('01_Zasady_Projektu', 'reguly_kontroli.json')];

const POMOC = `Użycie: node scripts/ks.mjs <komenda> [-r reguly.json] pliki…

  sprawdz | check    plik.md                kontrola techniczna jednostki
  tom     | volume   plik1.md plik2.md …    jednostki osobno, sumy i limity tomu
  porownaj| diff     stara.md nowa.md       spadek objętości i zniknięte nagłówki
  styl    | style    plik.md …              skaner manier i powtarzanych fraz
  spacje  | nbsp     plik.md wynik.md       kopia z twardymi spacjami (nowy plik)
  zamien  | patch    plik.md pary.json      zamiany „stary → nowy” (domyślnie próba bez zapisu;
                                          zapis: --zapisz --kopia przed.md, kopia obowiązkowa)
  tiki    | ticks    -w wzorzec plik.md      zdania z wzorcem (regex): nr wystąpienia, linia, kontekst;
                                          [--kontekst N]; wynik gotowy do par zamien z "wystapienie"
  gestosc | density  -w wzorzec pliki…      trafienia na 10 tys. słów w każdym pliku (wyrównanie serii)
  pomoc   | help                            ta pomoc

Reguły: -r plik.json albo automatycznie reguly_kontroli.json (lub 01_Zasady_Projektu/reguly_kontroli.json)
w katalogu pliku i do czterech poziomów wyżej. Wynik: JSON; kod 1 przy błędach. Pliki wejściowe nie są zmieniane.
`;

export function normalizeCommand(word = '') {
  const key = word.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l');
  return KOMENDY[key] ?? null;
}

export function findRules(startPath) {
  let dir = dirname(resolve(startPath));
  for (let i = 0; i <= 4; i++) {
    for (const name of REGULY) {
      const candidate = join(dir, name);
      if (existsSync(candidate)) return candidate;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function load(path) {
  const real = realpathSync(resolve(path));
  if (!statSync(real).isFile()) throw new Error(`Wejście nie jest plikiem: ${path}`);
  return { path: real, text: readFileSync(real, 'utf8') };
}

// Zdania pasujące do wzorca, w kolejności tekstu. „wystapienie” to numer tego samego zdania
// w całym pliku (tak liczy zamien), więc parę {stary: zdanie, nowy, wystapienie} można przepisać wprost.
export function listSentences(text, rx, kontekst = 80) {
  const zdania = [];
  const lines = text.split('\n');
  let offset = 0;
  lines.forEach((line, li) => {
    if (!line.startsWith('#')) {
      for (const m of line.matchAll(/[^.!?…\n]*[.!?…]+[”"]?|[^.!?…\n]+$/gu)) {
        const raw = m[0];
        const zdanie = raw.trim();
        if (!zdanie || !rx.test(zdanie.replace(/\u00a0/g, ' '))) continue;
        const start = offset + m.index + (raw.length - raw.trimStart().length);
        const all = [...text.matchAll(pattern(zdanie))];
        const wystapienie = all.findIndex(x => x.index === start) + 1;
        const flat = s => s.replace(/\u00a0/g, ' ').replace(/\n/g, ' ¶ ');
        zdania.push({
          nr: zdania.length,
          linia: li + 1,
          zdanie,
          ...(all.length > 1 ? { wystapienie } : {}),
          kontekst: kontekst ? `…${flat(text.slice(Math.max(0, start - kontekst), start))}[[${flat(zdanie)}]]${flat(text.slice(start + zdanie.length, start + zdanie.length + Math.round(kontekst / 2)))}…` : undefined,
        });
      }
    }
    offset += line.length + 1;
  });
  return { trafien: zdania.length, zdania };
}

export function run(argv) {
  const [word, ...rest] = argv;
  const cmd = normalizeCommand(word);
  if (!word || cmd === 'pomoc') return { text: POMOC };
  if (!cmd) throw new Error(`Nieznana komenda „${word}”. Lista: node scripts/ks.mjs pomoc`);
  let rulesPath = null;
  let save = false;
  let copyPath = null;
  let wzorzec = null;
  let kontekst = 80;
  const files = [];
  for (let i = 0; i < rest.length; i++) {
    if (['-r', '--reguly', '--rules'].includes(rest[i])) {
      if (i + 1 >= rest.length) throw new Error('Brak pliku reguł po -r.');
      rulesPath = rest[++i];
    } else if (['--zapisz', '--write'].includes(rest[i])) save = true;
    else if (['--kopia', '--backup'].includes(rest[i])) {
      if (i + 1 >= rest.length) throw new Error('Brak ścieżki po --kopia.');
      copyPath = rest[++i];
    } else if (['-w', '--wzorzec', '--pattern'].includes(rest[i])) {
      if (i + 1 >= rest.length) throw new Error('Brak wzorca po -w.');
      wzorzec = rest[++i];
    } else if (['--kontekst', '--context'].includes(rest[i])) {
      kontekst = Number(rest[++i]);
      if (!Number.isInteger(kontekst) || kontekst < 0) throw new Error('--kontekst przyjmuje liczbę znaków.');
    } else files.push(rest[i]);
  }
  if (!files.length) throw new Error('Podaj plik; szczegóły: node scripts/ks.mjs pomoc');
  const needRules = ['sprawdz', 'tom', 'porownaj'].includes(cmd);
  const usedRules = needRules ? (rulesPath ?? findRules(files[0])) : null;
  const rules = usedRules ? JSON.parse(load(usedRules).text.replace(/^﻿/, '')) : {};
  const withRules = report => ({ reguly: usedRules ? realpathSync(usedRules) : 'brak (tylko kontrole domyślne)', ...report });

  if (cmd === 'sprawdz') {
    if (files.length !== 1) throw new Error('sprawdz/check przyjmuje jeden plik; dla kilku użyj tom/volume.');
    const input = load(files[0]);
    const report = withRules({ plik: input.path, ...checkUnit(input.text, rules) });
    return { report, fail: report.bledy.length > 0 };
  }
  if (cmd === 'tom') {
    const seen = new Set();
    const inputs = files.map(f => {
      const input = load(f);
      const id = process.platform === 'win32' ? input.path.toLowerCase() : input.path;
      if (seen.has(id)) throw new Error(`Ten sam plik podano więcej niż raz: ${f}`);
      seen.add(id);
      return input;
    });
    const report = withRules(checkVolume(inputs, rules));
    return { report, fail: report.bledy.length > 0 || report.bledyJednostek > 0 };
  }
  if (cmd === 'porownaj') {
    if (files.length !== 2) throw new Error('porownaj/diff przyjmuje dwa pliki: stara.md nowa.md');
    const [old, now] = files.map(load);
    if (old.path.toLowerCase() === now.path.toLowerCase()) throw new Error('Podano dwa razy ten sam plik.');
    const report = withRules({ plik: now.path, poprzedni: old.path, ...checkUnit(now.text, rules, old.text) });
    return { report, fail: report.bledy.length > 0 };
  }
  if (cmd === 'styl') {
    const inputs = files.map(load);
    return { report: analyzeTexts(inputs), fail: false };
  }
  if (cmd === 'spacje') {
    if (files.length !== 2) throw new Error('spacje/nbsp przyjmuje dwa pliki: wejście.md wynik.md');
    const input = load(files[0]);
    const out = resolve(files[1]);
    if (existsSync(out)) throw new Error(`Plik wynikowy już istnieje, nie nadpisuję: ${files[1]}`);
    writeFileSync(out, addHardSpaces(input.text), 'utf8');
    return { report: { zapisano: out, zrodlo: input.path }, fail: false };
  }
  if (cmd === 'zamien') {
    if (files.length !== 2) throw new Error('zamien/patch przyjmuje dwa pliki: tekst.md pary.json');
    const input = load(files[0]);
    const pairs = JSON.parse(load(files[1]).text.replace(/^﻿/, ''));
    const result = applyPairs(input.text, pairs);
    if (!result.ok) return { report: { plik: input.path, zapisano: false, bledy: result.bledy }, fail: true };
    const report = { plik: input.path, zapisano: false, tryb: 'próba (bez zapisu)', zastosowano: result.zastosowano, slowa: result.slowa, artefakty: result.artefakty };
    if (save) {
      if (!copyPath) throw new Error('Zapis wymaga kopii przed zmianą: --zapisz --kopia przed.md');
      const copy = resolve(copyPath);
      if (existsSync(copy)) throw new Error(`Kopia już istnieje, nie nadpisuję: ${copyPath}`);
      writeFileSync(copy, input.text, 'utf8');
      writeFileSync(input.path, result.tekst, 'utf8');
      Object.assign(report, { zapisano: true, tryb: 'zapis', kopia: copy });
    }
    return { report, fail: result.artefakty.length > 0 && save };
  }
  if (cmd === 'tiki' || cmd === 'gestosc') {
    if (!wzorzec) throw new Error(`${cmd} wymaga wzorca: -w 'skin(ął|ęła) głową'`);
    let rx;
    try { rx = new RegExp(wzorzec, 'u'); } catch (e) { throw new Error(`Błędny wzorzec: ${e.message}`); }
    if (cmd === 'gestosc') {
      const pliki = files.map(load).map(({ path, text }) => {
        const flat = text.replace(/\u00a0/g, ' ');
        const trafien = [...flat.matchAll(new RegExp(wzorzec, 'gmu'))].length;
        const slowa = flat.split(/\s+/u).filter(Boolean).length;
        return { plik: path, trafien, slowa, na10tys: slowa ? Math.round(trafien / slowa * 1e5) / 10 : 0 };
      });
      return { report: { wzorzec, pliki }, fail: false };
    }
    if (files.length !== 1) throw new Error('tiki/ticks przyjmuje jeden plik.');
    const input = load(files[0]);
    return { report: { plik: input.path, wzorzec, ...listSentences(input.text, rx, kontekst) }, fail: false };
  }
  throw new Error(`Nieobsłużona komenda: ${word}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = run(process.argv.slice(2));
    process.stdout.write(result.text ?? JSON.stringify(result.report, null, 2) + '\n');
    if (result.fail) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`Błąd: ${error.message}\n`);
    process.exitCode = 1;
  }
}
