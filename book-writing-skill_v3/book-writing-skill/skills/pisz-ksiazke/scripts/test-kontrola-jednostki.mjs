import test from 'node:test';
import assert from 'node:assert/strict';
import { addHardSpaces, checkUnit } from './kontrola-jednostki.mjs';

const rodzaje = r => r.bledy.map(b => b.rodzaj);

test('sprawdza dzień tygodnia, także w roku przestępnym', () => {
  const ok = checkUnit('### Rozdział I. Start\n\n*Kraków, wtorek, 29 lutego 2028*\n\nTekst.');
  assert.deepEqual(rodzaje(ok), []);
  const zle = checkUnit('*Kraków, poniedziałek, 3 marca 2026*\n\nTekst.');
  assert.match(rodzaje(zle)[0], /w kalendarzu wtorek/);
});

test('wykrywa pozostałości robocze i znaki niewidoczne', () => {
  const r = checkUnit('Wszedł.​\n\nPowiedział [NF] coś.\n\n${report_md}');
  const k = rodzaje(r).join(' | ');
  assert.match(k, /znak niewidoczny/);
  assert.match(k, /znacznik roboczy/);
  assert.match(k, /szablon/);
});

test('typografia bez reguł daje uwagi, z jawną regułą błędy', () => {
  const text = '- Tak - powiedział. "Nie"... — dodał.';
  const bez = checkUnit(text);
  assert.equal(bez.bledy.length, 0);
  assert.ok(bez.uwagi.length >= 3);
  const z = checkUnit(text, { typografiaPolska: true });
  assert.ok(z.bledy.length >= 3);
});

test('polski cudzysłów nie jest błędem', () => {
  const r = checkUnit('– „Tak” – powiedział.', { typografiaPolska: true });
  assert.deepEqual(rodzaje(r), []);
});

test('limity fraz liczą odmiany z gwiazdką i granice słów', () => {
  const r = checkUnit('Dokładnie tak. Dokładny opis. Niedokładnie.', { limity: [{ fraza: 'dokładn*', max: 0 }] });
  assert.equal(r.liczniki[0].liczba, 2);
  assert.match(rodzaje(r)[0], /limit przekroczony/);
});

test('cyfry tylko w kursywie, gdy projekt tego wymaga', () => {
  const r = checkUnit('*9:45.*\n\nO 9 wyszedł.', { cyfryTylkoWKursywie: true });
  assert.equal(r.bledy.filter(b => b.rodzaj === 'cyfry poza kursywą').length, 1);
});

test('wycofana nazwa jest wykrywana w odmianie', () => {
  const r = checkUnit('Pracował dla Kalweru.', { zakazaneNazwy: ['Kalwer'] });
  assert.match(rodzaje(r)[0], /wycofana nazwa: Kalwer/);
});

test('porównanie wykrywa ciche skrócenie i zniknięte nagłówki', () => {
  const stara = '### Rozdział I. A\n\n' + 'słowo '.repeat(1000) + '\n\n### Rozdział II. B\n\n' + 'słowo '.repeat(1000);
  const nowa = '### Rozdział I. A\n\n' + 'słowo '.repeat(300);
  const r = checkUnit(nowa, {}, stara);
  const k = rodzaje(r).join(' | ');
  assert.match(k, /spadek objętości/);
  assert.match(k, /zniknęły nagłówki/);
  assert.deepEqual(r.porownanie.brakujaceNaglowki, ['### Rozdział II. B']);
});

test('twarde spacje tylko po jednoliterowych wyrazach', () => {
  assert.equal(addHardSpaces('Szedł w las i z psem, a potem wózek.'), 'Szedł w las i z psem, a potem wózek.');
});

test('pusty plik jest błędem', () => {
  assert.match(rodzaje(checkUnit('# Tytuł\n')).join(), /brak prozy/);
});

test('wbudowane wzorce łapią przebrania antytezy i pomijają dialog przy dwukropku', () => {
  const text = 'To nie był przypadek. To był plan.\n\nNie był to strach. Był to wybór.\n\nWiedział jedno: wróci.\n\n– Słuchaj: wracamy.\n\nNie pytał, nie dzwonił, nie czekał.';
  const r = checkUnit(text, { limity: [
    { wbudowany: 'to-nie-bylo', max: 0 }, { wbudowany: 'dwukropek-zapowiedz', max: 5 }, { wbudowany: 'potrojna-anafora', max: 0 },
  ] });
  const n = Object.fromEntries(r.liczniki.map(l => [l.nazwa, l.liczba]));
  assert.equal(n['to-nie-bylo'], 2);
  assert.equal(n['dwukropek-zapowiedz'], 1);
  assert.equal(n['potrojna-anafora'], 1);
});

test('nieznany wzorzec wbudowany zgłasza czytelny błąd', () => {
  assert.throws(() => checkUnit('Tekst.', { limity: [{ wbudowany: 'brak', max: 0 }] }), /Dostępne/);
});

test('minimum słów zależy od typu jednostki z nagłówka', () => {
  const reguly = { minSlow: 50, slowaWgTypu: { Epilog: { min: 5 } } };
  const epilog = checkUnit('## CZĘŚĆ II\n\n### Epilog. Tytuł\n\nJedno dwa trzy cztery pięć sześć.', reguly);
  assert.equal(epilog.typJednostki, 'Epilog');
  assert.equal(epilog.bledy.length, 0);
  const rozdzial = checkUnit('### Rozdział I. Start\n\nJedno dwa trzy.', reguly);
  assert.match(rodzaje(rozdzial)[0], /za krótko: \d+ < 50 \(Rozdział\)/);
});

test('zakres: sumy, limit na tom, duplikaty treści i nagłówków', async () => {
  const { checkVolume } = await import('./kontrola-jednostki.mjs');
  const a = { path: 'a.md', text: '### Rozdział I. A\n\nByła mgła nad rzeką.' };
  const b = { path: 'b.md', text: '### Rozdział II. B\n\nNic nie było widać.' };
  const kopia = { path: 'c.md', text: '### Rozdział I. A\n\nByła mgła nad rzeką.' };
  const r = checkVolume([a, b, kopia], { limity: [{ fraza: 'mgł*', max: 5, maxTom: 1 }] });
  const k = r.bledy.map(e => e.rodzaj).join(' | ');
  assert.equal(r.jednostek, 3);
  assert.equal(r.liczniki[0].liczba, 2);
  assert.match(k, /limit zakresu przekroczony/);
  assert.match(k, /identycznej treści/);
  assert.match(k, /powtórzony nagłówek/);
});
