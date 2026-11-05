import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { applyPairs } from './zamien.mjs';
import { run } from './ks.mjs';

test('każdy stary fragment musi wystąpić dokładnie raz; zamiany są atomowe', () => {
  const t = 'Ala ma kota. Ala ma psa.';
  const bad = applyPairs(t, [['Ala ma kota.', 'Ola ma kota.'], ['ma', 'miała']]);
  assert.equal(bad.ok, false);
  assert.equal(bad.bledy[0].wystapien, 2);
  assert.equal(bad.tekst, t);
  assert.equal(applyPairs(t, [['brak', 'x']]).bledy[0].wystapien, 0);
});

test('kolejne zamiany działają na tekście już poprawionym', () => {
  const r = applyPairs('Szedł szybko.', [['Szedł szybko.', 'Szedł wolno.'], ['wolno', 'powoli']]);
  assert.equal(r.ok, true);
  assert.equal(r.tekst, 'Szedł powoli.');
});

test('spacja w starym fragmencie pasuje także do twardej; nowy dostaje twarde spacje', () => {
  const r = applyPairs('Poszedł w las.', [['w las', 'w ciemny las']]);
  assert.equal(r.tekst, 'Poszedł w\u00a0ciemny las.');
  assert.equal(applyPairs('Poszedł w las.', [['Poszedł w las.', 'Poszedł w las.']]).ok, true);
});

test('twarda spacja w tekście jest dopasowana zwykłą spacją ze starego fragmentu', () => {
  const r = applyPairs('Poszedł z\u00a0psem w\u00a0las.', [['z psem w las', 'z kotem w las']]);
  assert.equal(r.ok, true);
  assert.equal(r.tekst, 'Poszedł z\u00a0kotem w\u00a0las.');
});

test('pusty nowy usuwa fragment, a nowe artefakty są zgłaszane', () => {
  const r = applyPairs('Raz, dwa.', [[', dwa', ' ,']]);
  assert.equal(r.ok, true);
  assert.ok(r.artefakty.some(a => a.rodzaj === 'przecinekPrzedKropka'));
  assert.equal(applyPairs('Raz. Dwa.', [[' Dwa.', '']]).tekst, 'Raz.');
});

test('ks zamien: próba nie zapisuje, zapis wymaga kopii i jej nie nadpisuje', () => {
  const root = mkdtempSync(join(tmpdir(), 'zam-'));
  const md = join(root, 'a.md');
  const js = join(root, 'p.json');
  writeFileSync(md, 'Stary tekst.');
  writeFileSync(js, JSON.stringify([['Stary', 'Nowy']]));
  const dry = run(['zamien', md, js]);
  assert.equal(dry.report.zapisano, false);
  assert.equal(readFileSync(md, 'utf8'), 'Stary tekst.');
  assert.throws(() => run(['patch', md, js, '--zapisz']), /wymaga kopii/);
  const kopia = join(root, 'przed.md');
  const done = run(['patch', md, js, '--zapisz', '--kopia', kopia]);
  assert.equal(done.report.zapisano, true);
  assert.equal(readFileSync(md, 'utf8'), 'Nowy tekst.');
  assert.equal(readFileSync(kopia, 'utf8'), 'Stary tekst.');
  writeFileSync(js, JSON.stringify([['Nowy', 'Inny']]));
  assert.throws(() => run(['patch', md, js, '--zapisz', '--kopia', kopia]), /nie nadpisuję/);
  assert.ok(existsSync(kopia));
});

test('ks zamien: błąd pary kończy się kodem niepowodzenia bez zapisu', () => {
  const root = mkdtempSync(join(tmpdir(), 'zam-'));
  const md = join(root, 'a.md');
  const js = join(root, 'p.json');
  writeFileSync(md, 'Tekst.');
  writeFileSync(js, JSON.stringify([['Nie ma', 'x']]));
  const r = run(['zamien', md, js, '--zapisz', '--kopia', join(root, 'k.md')]);
  assert.equal(r.fail, true);
  assert.equal(r.report.zapisano, false);
  assert.equal(readFileSync(md, 'utf8'), 'Tekst.');
});

test('wystapienie wskazuje, które z powtarzanych zdań zmienić; usunięcie nie zostawia pustego akapitu', () => {
  const t = 'A mówi.\n\nOla skinęła głową.\n\nB mówi. Ola skinęła głową. Dalej.';
  const r = applyPairs(t, [{ stary: 'Ola skinęła głową.', nowy: '', wystapienie: 2 }, ['Ola skinęła głową.', 'Ola przytaknęła.']]);
  assert.equal(r.ok, true);
  assert.equal(r.tekst, 'A mówi.\n\nOla przytaknęła.\n\nB mówi. Dalej.');
  assert.deepEqual(r.artefakty, []);
  const tooFar = applyPairs(t, [{ stary: 'Ola skinęła głową.', nowy: '', wystapienie: 3 }]);
  assert.equal(tooFar.ok, false);
  assert.equal(tooFar.bledy[0].wystapien, 2);
  const whole = applyPairs('A.\n\nSkinął głową.\n\nB.', [['Skinął głową.', '']]);
  assert.equal(whole.tekst, 'A.\n\nB.');
});
