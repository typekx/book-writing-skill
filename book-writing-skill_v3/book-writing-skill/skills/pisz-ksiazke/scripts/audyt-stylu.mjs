import { readFileSync, realpathSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const WORD = /[\p{L}\p{N}][\p{L}\p{M}\p{N}’'-]*/gu;
const RULES = [
  ['wyliczenie', '(?:po pierwsze|po drugie|po trzecie|po czwarte|kolejnym aspektem)'],
  ['objasnianie', '(?:oznaczało to|oznacza to|innymi słowy|to właśnie dlatego|zrozumiał wtedy|zrozumiała wtedy)'],
  ['antyteza', '(?:to nie było|to nie była|nie chodziło o|nie dlatego)'],
  ['zapowiedz', '(?:jeszcze nie wiedział|jeszcze nie wiedziała|nic już nie będzie takie samo|wszystko miało się zmienić)'],
  ['kwalifikator', '(?:w pewnym sensie|niejako|jakby|coś w nim|coś w niej)'],
  ['gest', '(?:zacisnął szczękę|zacisnęła szczękę|zacisnął pięści|zacisnęła pięści|wstrzymał oddech|wstrzymała oddech)'],
];

// Wyłącznie wybór zakresu analizy. Tekst wejściowy nigdy nie jest zapisywany.
function proseLines(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  const result = [];
  let frontmatter = lines[0]?.trim() === '---';
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (frontmatter) {
      if (i > 0 && /^(---|\.\.\.)\s*$/.test(line)) frontmatter = false;
      result.push({ line: i + 1, text: '' });
      continue;
    }
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (marker && marker[1][0] === fence.char && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      result.push({ line: i + 1, text: '' });
      continue;
    }
    if (marker) {
      fence = { char: marker[1][0], length: marker[1].length };
      result.push({ line: i + 1, text: '' });
      continue;
    }
    const omit = /^\s{0,3}#{1,6}\s/.test(line) || /^\s*\|/.test(line) || /^\s*([*\-_]\s*){3,}$/.test(line);
    result.push({ line: i + 1, text: omit ? '' : line });
  }
  return result;
}

function median(values) {
  if (!values.length) return 0;
  const a = [...values].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

export function analyzeTexts(inputs) {
  const phrases = new Map();
  const files = [];
  for (const input of inputs) {
    const lines = proseLines(input.text);
    const hits = [];
    const paragraphs = [];
    let paragraph = [];
    const flush = () => {
      if (!paragraph.length) return;
      paragraphs.push(paragraph.length);
      for (let i = 0; i + 5 <= paragraph.length; i++) {
        const key = paragraph.slice(i, i + 5).map(t => t.word).join(' ');
        let item = phrases.get(key);
        if (!item) {
          item = { fraza: key, wystapienia: 0, przyklady: [] };
          phrases.set(key, item);
        }
        item.wystapienia++;
        if (item.przyklady.length < 6) item.przyklady.push({ plik: input.path, linia: paragraph[i].line });
      }
      paragraph = [];
    };
    for (const row of lines) {
      if (!row.text.trim()) { flush(); continue; }
      for (const token of row.text.matchAll(WORD)) {
        paragraph.push({ word: token[0].normalize('NFC').toLocaleLowerCase('pl'), line: row.line });
      }
      for (const [category, pattern] of RULES) {
        const rx = new RegExp(`(?<![\\p{L}\\p{N}])${pattern}(?![\\p{L}\\p{N}])`, 'giu');
        for (const match of row.text.matchAll(rx)) {
          hits.push({ kategoria: category, fraza: match[0], linia: row.line,
            kontekst: row.text.slice(Math.max(0, match.index - 80), match.index + match[0].length + 120) });
        }
      }
    }
    flush();
    const words = paragraphs.reduce((a, b) => a + b, 0);
    const categories = Object.fromEntries(RULES.map(([c]) => [c, hits.filter(h => h.kategoria === c).length]));
    files.push({ plik: input.path, slowa: words, akapity: paragraphs.length,
      medianaSlowWAkapicie: median(paragraphs), kategorie: categories,
      trafieniaNa1000Slow: words ? Math.round(hits.length / words * 100000) / 100 : 0,
      trafienia: hits });
  }
  const repeats = [...phrases.values()].filter(p => p.wystapienia >= 3)
    .sort((a, b) => b.wystapienia - a.wystapienia || a.fraza.localeCompare(b.fraza, 'pl'));
  return {
    wersja: 1,
    znaczenie: 'Kandydaci do lektury; brak oceny autorstwa, jakości i procentu AI. Żaden plik nie jest zmieniany.',
    metoda: 'Wybrane zwroty na pojedynczych liniach i dosłowne frazy 5-wyrazowe, minimum 3 wystąpienia w podanym korpusie. Pominięto frontmatter, nagłówki ATX, tabele z pionową kreską, separatory i bloki kodu. Pozostawiono daty, dialogi, cytaty i listy. Frazy nie przechodzą przez granice akapitów.',
    ograniczenia: 'Brak analizy semantycznej i rozpoznawania celowych motywów; odmiany i parafrazy mogą nie zostać wykryte. Zwrot podzielony końcem linii może nie trafić do reguł. Nakładające się okna fraz liczone osobno. Lista fraz: najwyżej 40; przykładów na frazę: najwyżej 6. Nie łącz całości tomu z jej rozdziałami jako odrębnymi wejściami.',
    pliki: files,
    powtarzaneFrazyLacznie: repeats.length,
    powtarzaneFrazy: repeats.slice(0, 40),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    let args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--help') {
      process.stdout.write('Użycie: node audyt-stylu.mjs [--] plik.md [plik2.md ...]\nRaport JSON na standardowym wyjściu; brak zmian plików. Node.js 20 lub nowszy.\n');
    } else {
      const literal = args[0] === '--';
      if (literal) args = args.slice(1);
      if (!args.length || (!literal && args.some(a => a.startsWith('--')))) throw new Error('Podaj pliki tekstowe; szczegóły: --help.');
      const seen = new Set();
      const inputs = [];
      for (const arg of args) {
        const path = realpathSync(resolve(arg));
        const identity = process.platform === 'win32' ? path.toLowerCase() : path;
        if (seen.has(identity)) throw new Error(`Ten sam plik podano więcej niż raz: ${arg}`);
        seen.add(identity);
        if (!statSync(path).isFile()) throw new Error(`Wejście nie jest plikiem: ${arg}`);
        inputs.push({ path, text: readFileSync(path, 'utf8') });
      }
      process.stdout.write(JSON.stringify(analyzeTexts(inputs), null, 2) + '\n');
    }
  } catch (error) {
    process.stderr.write(`Błąd: ${error.message}\n`);
    process.exitCode = 1;
  }
}
