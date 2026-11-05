import { addHardSpaces } from './kontrola-jednostki.mjs';

// Zamiany „stary fragment → nowy fragment”, kolejno na tekście już poprawionym.
// Stary fragment musi wystąpić dokładnie raz, chyba że para wskazuje numer wystąpienia (1, 2, …),
// np. przy krótkim zdaniu powtarzanym w tomie („Skinął głową.”); numery podaje `ks tiki`.
// Pusty „nowy” usuwa fragment razem z osieroconą spacją i pustym akapitem.
// Zamiany są atomowe: gdy którakolwiek się nie powiedzie, nic nie zostaje zmienione.

const NBSP = '\u00a0';
const ARTEFAKTY = {
  podwojneSpacje: /[  ]{2,}/g,
  przecinekPrzedKropka: /,\s*[.?!]/g,
  prosteCudzyslowy: /"/g,
  zepsutyZnak: /�/g,
};

function escapeRx(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function pattern(old) {
  return new RegExp([...old].map(ch => (ch === ' ' || ch === NBSP ? `[ ${NBSP}]` : escapeRx(ch))).join(''), 'gu');
}

export function normalizePairs(raw) {
  const list = Array.isArray(raw) ? raw : raw?.pary;
  if (!Array.isArray(list) || !list.length) throw new Error('Plik par musi zawierać listę [["stary","nowy"], …] albo {"pary": […]}.');
  return list.map((p, i) => {
    const [stary, nowy, wystapienie] = Array.isArray(p) ? p : [p?.stary, p?.nowy, p?.wystapienie];
    if (typeof stary !== 'string' || typeof nowy !== 'string' || !stary) throw new Error(`Para ${i + 1}: potrzebny niepusty „stary” i „nowy” (pusty „nowy” usuwa fragment).`);
    if (wystapienie !== undefined && !(Number.isInteger(wystapienie) && wystapienie >= 1)) throw new Error(`Para ${i + 1}: „wystapienie” to liczba całkowita od 1.`);
    return { stary, nowy, wystapienie };
  });
}

// Po usunięciu fragmentu: jedna spacja zamiast dwóch, bez spacji na brzegu akapitu, bez pustego akapitu.
export function tidyDeletion(before, after) {
  const sp = /[ \u00a0]$/;
  if (sp.test(before) && (/^[ \u00a0]/.test(after) || /^[\n.,;:!?…]/.test(after) || after === '')) before = before.replace(/[ \u00a0]+$/, '');
  else if ((before === '' || before.endsWith('\n')) && /^[ \u00a0]/.test(after)) after = after.replace(/^[ \u00a0]+/, '');
  if (/\n\n$/.test(before) && /^\n\n/.test(after)) after = after.slice(2);
  if (before === '' && after.startsWith('\n\n')) after = after.slice(2);
  return [before, after];
}

function countArtifacts(text) {
  return Object.fromEntries(Object.entries(ARTEFAKTY).map(([k, rx]) => [k, (text.match(rx) ?? []).length]));
}

function countWords(text) {
  return text.split(/[\s ]+/u).filter(Boolean).length;
}

export function applyPairs(text, rawPairs) {
  const pairs = normalizePairs(rawPairs);
  let current = text;
  const bledy = [];
  pairs.forEach((p, i) => {
    const matches = [...current.matchAll(pattern(p.stary))];
    const ok = p.wystapienie ? matches.length >= p.wystapienie : matches.length === 1;
    if (!ok) {
      bledy.push({ para: i + 1, wystapien: matches.length, ...(p.wystapienie ? { wystapienie: p.wystapienie } : {}), stary: p.stary.slice(0, 90) });
      return;
    }
    const m = matches[(p.wystapienie ?? 1) - 1];
    let before = current.slice(0, m.index);
    let after = current.slice(m.index + m[0].length);
    if (p.nowy === '') [before, after] = tidyDeletion(before, after);
    current = before + addHardSpaces(p.nowy) + after;
  });
  if (bledy.length) return { ok: false, bledy, tekst: text };
  const przed = countArtifacts(text);
  const po = countArtifacts(current);
  const artefakty = Object.keys(po).filter(k => po[k] > przed[k]).map(k => ({ rodzaj: k, przed: przed[k], po: po[k] }));
  return {
    ok: true,
    tekst: current,
    zastosowano: pairs.length,
    slowa: { przed: countWords(text), po: countWords(current) },
    artefakty,
  };
}
