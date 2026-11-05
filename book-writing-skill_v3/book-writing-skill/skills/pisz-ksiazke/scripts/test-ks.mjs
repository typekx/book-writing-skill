import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { findRules, normalizeCommand, run } from './ks.mjs';

test('komendy polskie i angielskie, z polskimi znakami i bez', () => {
  assert.equal(normalizeCommand('sprawdź'), 'sprawdz');
  assert.equal(normalizeCommand('SPRAWDZ'), 'sprawdz');
  assert.equal(normalizeCommand('check'), 'sprawdz');
  assert.equal(normalizeCommand('porównaj'), 'porownaj');
  assert.equal(normalizeCommand('diff'), 'porownaj');
  assert.equal(normalizeCommand('volume'), 'tom');
  assert.equal(normalizeCommand('nbsp'), 'spacje');
  assert.equal(normalizeCommand('xyz'), null);
});

test('reguły znajdowane automatycznie w folderze projektu', () => {
  const root = mkdtempSync(join(tmpdir(), 'ks-'));
  mkdirSync(join(root, '01_Zasady_Projektu'));
  mkdirSync(join(root, '04_Manuskrypt', 'Tom_I'), { recursive: true });
  writeFileSync(join(root, '01_Zasady_Projektu', 'reguly_kontroli.json'), '{"limity":[{"fraza":"jakby","max":0}]}');
  const unit = join(root, '04_Manuskrypt', 'Tom_I', '01.md');
  writeFileSync(unit, '### Rozdział I. A\n\nJakby nic.');
  assert.ok(findRules(unit).endsWith('reguly_kontroli.json'));
  const r = run(['check', unit]);
  assert.equal(r.fail, true);
  assert.match(r.report.bledy[0].rodzaj, /limit przekroczony/);
});

test('spacje nie nadpisują istniejącego pliku, porównanie wymaga dwóch plików', () => {
  const root = mkdtempSync(join(tmpdir(), 'ks-'));
  const a = join(root, 'a.md');
  writeFileSync(a, 'Szedł w las.');
  const out = join(root, 'b.md');
  run(['nbsp', a, out]);
  assert.ok(existsSync(out));
  assert.throws(() => run(['spacje', a, out]), /nie nadpisuję/);
  assert.throws(() => run(['diff', a]), /dwa pliki/);
  assert.throws(() => run(['nieznana', a]), /Nieznana komenda/);
});

test('pomoc bez argumentów', () => {
  assert.match(run([]).text, /sprawdz \| check/);
});

test('tiki: zdania z numerem wystąpienia zgodnym z zamien; gestosc liczy na 10 tys. słów', async () => {
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  const { tmpdir } = await import('node:os');
  const { applyPairs } = await import('./zamien.mjs');
  const root = mkdtempSync(join(tmpdir(), 'tiki-'));
  const md = join(root, 'a.md');
  const text = '# R. I\n\nOn mówi.\n\nSkinął głową.\n\nPotem wstał. Skinął głową. Potem wyszedł.';
  writeFileSync(md, text);
  const r = run(['tiki', '-w', 'Skinął', '--kontekst', '10', md]).report;
  assert.equal(r.trafien, 2);
  assert.equal(r.zdania[1].wystapienie, 2);
  assert.equal(r.zdania[1].linia, 7);
  const out = applyPairs(text, [{ stary: r.zdania[1].zdanie, nowy: '', wystapienie: r.zdania[1].wystapienie }]);
  assert.equal(out.tekst.endsWith('Potem wstał. Potem wyszedł.'), true);
  const g = run(['gestosc', '-w', '(?:^|(?<=[.!?] ))Potem\\b', md]).report.pliki[0];
  assert.equal(g.trafien, 2);
  assert.ok(g.na10tys > 0);
  assert.throws(() => run(['tiki', md]), /wymaga wzorca/);
});
