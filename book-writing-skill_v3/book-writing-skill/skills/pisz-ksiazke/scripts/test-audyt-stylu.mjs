import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeTexts } from './audyt-stylu.mjs';

test('pomija dokumentację Markdown i zachowuje numery linii', () => {
  const text = '---\ntitle: Po pierwsze\n---\n# Po drugie\n| Po trzecie |\n```text\nJakby\n```\nPo pierwsze otworzył drzwi.';
  const r = analyzeTexts([{ path: 'a.md', text }]);
  assert.equal(r.pliki[0].trafienia.length, 1);
  assert.equal(r.pliki[0].trafienia[0].linia, 9);
});
test('cytat i dialog pozostają kandydatami, nie są cicho pomijane', () => {
  const r = analyzeTexts([{ path: 'a.md', text: '– Po pierwsze, sprawdź okno.\n\n> Po drugie, sprawdź drzwi.' }]);
  assert.equal(r.pliki[0].kategorie.wyliczenie, 2);
});
test('rozpoznaje polskie litery, wielkość liter i granice słów', () => {
  const r = analyzeTexts([{ path: 'a.md', text: 'ZACISNĘŁA SZCZĘKĘ. Jakby coś usłyszała. Jakbyśmy to znali.' }]);
  assert.equal(r.pliki[0].kategorie.gest, 1);
  assert.equal(r.pliki[0].kategorie.kwalifikator, 1);
});
test('znajduje frazę ponad podziałem wiersza i między plikami', () => {
  const r = analyzeTexts([
    { path: 'a.md', text: 'Zamknął drzwi i schował\nklucz.\n\nZamknął drzwi i schował klucz.' },
    { path: 'b.md', text: 'Zamknął drzwi i schował klucz.' },
  ]);
  const p = r.powtarzaneFrazy.find(p => p.fraza === 'zamknął drzwi i schował klucz');
  assert.equal(p.wystapienia, 3);
  assert.deepEqual(p.przyklady.map(p => p.plik), ['a.md', 'a.md', 'b.md']);
});
test('nie skleja frazy przez granicę akapitu', () => {
  const r = analyzeTexts([{ path: 'a.md', text: 'Zamknął drzwi\n\ni schował klucz.\n\nZamknął drzwi\n\ni schował klucz.\n\nZamknął drzwi\n\ni schował klucz.' }]);
  assert.equal(r.powtarzaneFrazyLacznie, 0);
});
test('pusty tekst daje określone metryki bez dzielenia przez zero', () => {
  const r = analyzeTexts([{ path: 'a.md', text: '' }]);
  assert.equal(r.pliki[0].slowa, 0);
  assert.equal(r.pliki[0].trafieniaNa1000Slow, 0);
  assert.equal(r.pliki[0].medianaSlowWAkapicie, 0);
});
