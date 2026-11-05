# Kontrola techniczna jednostki

Najkrócej: `node scripts/ks.mjs sprawdz plik.md`, `tom pliki…`, `porownaj stara.md nowa.md`, `spacje plik.md wynik.md`, `zamien plik.md pary.json` (po angielsku: check, volume, diff, nbsp, patch). Reguły projektu są wtedy wyszukiwane automatycznie. Poniżej pełna forma.

Opcjonalny skrypt `scripts/kontrola-jednostki.mjs` wymaga Node.js 20 lub nowszego, bez bibliotek. Czyta jeden plik jednostki i wypisuje JSON. Nigdy nie zmienia pliku wejściowego. Uzupełnia [skaner stylu](skaner-stylu.md): skaner szuka powtórzeń i kandydatów manier, kontrola sprawdza reguły projektu.

```sh
node scripts/kontrola-jednostki.mjs /sciezka/rozdzial.md
node scripts/kontrola-jednostki.mjs --reguly /projekt/01_Zasady_Projektu/reguly_kontroli.json /sciezka/rozdzial.md
node scripts/kontrola-jednostki.mjs --porownaj /sciezka/rozdzial_v1.md /sciezka/rozdzial_v2.md
node scripts/kontrola-jednostki.mjs --twarde-spacje /sciezka/rozdzial_nbsp.md /sciezka/rozdzial.md
node scripts/kontrola-jednostki.mjs --reguly reguly_kontroli.json tom/00_prolog.md tom/01_rozdzial_I.md tom/02_rozdzial_II.md
node --test scripts/
```

Skróty opcji: `-r` (`--reguly`, `--rules`), `-p` (`--porownaj`, `--compare`), `-n` (`--twarde-spacje`, `--nbsp`).

Kod wyjścia 1 oznacza błąd wywołania albo znalezione błędy kontroli, co pozwala użyć skryptu w automatyzacji.

## Co sprawdza zawsze

- **Dzień tygodnia** w każdym zapisie w rodzaju „wtorek, 3 marca 2026” (także poza linią daty) oraz nieistniejące daty. Rok przestępny jest uwzględniony.
- **Pozostałości robocze:** zmienne szablonu (`${...}`, `{{...}}`), znaczniki `[NF]`, `[TODO]`, `[DO WERYFIKACJI]`, komentarze HTML, dopiski „TODO”.
- **Znaki niewidoczne i zastępcze:** spacja o zerowej szerokości, miękki łącznik, BOM w tekście, znaki kierunku, U+FFFD.
- **Brak prozy:** plik z samymi nagłówkami jest błędem.
- **Liczba słów:** ciągi znaków między białymi znakami, twarda spacja liczy się jako biały znak; „slowa” obejmuje nagłówki i daty, „slowaProzy” je pomija. Licznik projektu może być inny; podaj w raporcie, którego użyto.

## Co sprawdza według reguł projektu

Reguły zapisz w JSON; wzór jest w [reguly_kontroli.przyklad.json](../assets/szablon-projektu/01_Zasady_Projektu/reguly_kontroli.przyklad.json). Wartości we wzorze są przykładowe; każdy projekt ustala własne.

| Klucz | Znaczenie |
|---|---|
| `typografiaPolska` | Prosty cudzysłów, angielski cudzysłów otwierający, pauza (—), trzy kropki, dywiz zamiast półpauzy. Bez pliku reguł są to uwagi; z jawną wartością `true` — błędy. |
| `cyfryTylkoWKursywie` | Cyfry dozwolone wyłącznie w kursywie (linie dat, cytowane dokumenty). Nagłówki są pomijane. |
| `zakazNawiasowKwadratowych` | Każdy nawias kwadratowy w prozie jest błędem. |
| `minSlow`, `maxSlow` | Granice dla wszystkich jednostek. |
| `slowaWgTypu` | Granice według typu z nagłówka jednostki, np. `"Interludium": {"min": 1200, "max": 1500}`. Typ to pierwsze słowo ostatniego nagłówka. |
| `maxSpadekSlowProc` | Próg spadku objętości przy `--porownaj` (domyślnie 3). |
| `limity` | Lista liczników z polem `max`. Każdy ma `fraza` (dosłownie, bez wielkości liter; `*` na końcu dopuszcza końcówki: `"dokładn*"`), `wzorzec` (wyrażenie regularne z flagami `giu`; granice słów zapisuj `(?<![\\p{L}])`, nie `\\b`) albo `wbudowany`. Opcjonalnie `tylkoNarracja: true` pomija linie dialogu. |
| `zakazaneNazwy` | Nazwy wycofane lub zakazane; wykrywane z końcówkami odmiany. |
| `maxTom` (w pozycji `limity`) | Limit dla całego zakresu przy kontroli kilku plików, np. drastyczne słowo najwyżej raz w tomie. |
| `minSlowTomu` | Minimum słów całego zakresu (np. tom nie krótszy od poprzedniego). |

Wzorce wbudowane:

| Nazwa | Co liczy | Fałszywe alarmy |
|---|---|---|
| `antyteza` | „nie X, tylko/lecz Y” w jednym zdaniu | zwykłe przeczenie z „tylko” w znaczeniu „jedynie” |
| `to-nie-bylo` | pary „To nie było X. To było Y.” i przebrania „Nie był to X. Był to Y.”, „nie była dowodem. Była cechą.” | „Nie było go w domu. Była już noc.” |
| `dwukropek-zapowiedz` | dwukropek po małej literze w narracji, bez linii dialogu | dwukropek przed wyliczeniem, zapis z dokumentu |
| `potrojna-anafora` | „bez…, bez…, bez…”, „ani…, ani…, ani…”, „nie…, nie…, nie…” | cytaty i celowe refreny |

Trafienie licznika jest kandydatem. Fałszywy alarm zostawiasz i opisujesz w raporcie; prawdziwe trafienie przepisujesz, a potem uruchamiasz kontrolę ponownie, żeby złapać zamiennik, który stał się nowym tikiem.

## Kontrola zakresu

Podanie kilku plików uruchamia kontrolę każdej jednostki osobno oraz zakresu: sumę słów, sumy liczników z limitami `maxTom`, minimum `minSlowTomu`, pliki o identycznej treści i powtórzone nagłówki jednostek (np. dwie kopie tego samego rozdziału albo roboczy plik całości dołączony obok jednostek). Podawaj jednostki w kolejności ze spisu tomu. Nie dołączaj pliku całości razem z jego jednostkami.

## Porównanie wersji

`--porownaj poprzednia.md` zestawia liczbę słów, nagłówki i separatory scen. Błędem jest spadek objętości powyżej progu oraz zniknięcie nagłówka obecnego w poprzedniej wersji. Używaj go po każdej redakcji, korekcie, scaleniu i przy przyjmowaniu „wersji ostatecznej” z innego środowiska. Typowy przypadek: plik opisany jako „kompletny, po korekcie” zawiera streszczenia scen zamiast prozy.

## Twarde spacje

`--twarde-spacje wynik.md` zapisuje kopię z twardą spacją po jednoliterowych wyrazach (a, i, o, u, w, z). Plik wynikowy nie może istnieć; wejście nie jest nadpisywane. Typografię składu lepiej powierzyć narzędziu składu, jeśli projekt takie ma.

## Ograniczenia

Skrypt nie zna kanonu, nie sprawdza wiedzy postaci, perspektywy, form zwracania się ani chronologii między scenami. Nie ocenia stylu i nie wykrywa „AI”. Uniksowe `wc -w` liczy twardą spację jako część słowa i zaniża wynik o kilkanaście procent; do porównań z licznikiem projektu używaj tego skryptu albo licznika projektu. Linia daty w innym formacie niż „dzień tygodnia, liczba miesiąc rok” nie jest sprawdzana. Wynik bez błędów oznacza tylko spełnienie sprawdzanych reguł.

## Zamiany: `ks.mjs zamien`

Narzędzie jedyne zmieniające tekst (`scripts/zamien.mjs`). Przyjmuje plik tekstu i plik par `[["stary","nowy"], …]` (albo `{"pary":[…]}`; pusty „nowy” usuwa fragment).

```sh
node scripts/ks.mjs zamien rozdzial.md pary.json                                  # próba, nic nie zapisuje
node scripts/ks.mjs zamien rozdzial.md pary.json --zapisz --kopia przed.md       # zapis z obowiązkową kopią
```

- Każdy „stary” musi wystąpić w pliku dokładnie raz, chyba że para podaje numer wystąpienia: `{"stary":"Skinął głową.","nowy":"","wystapienie":3}` albo `["Skinął głową.","",3]`. To jedyny sposób na krótkie zdania powtarzane w tomie; numery bierz z `tiki`, nie licz ręcznie. Kilka par na tym samym zdaniu podawaj od najwyższego numeru, bo każde usunięcie przesuwa kolejne. Zamiany idą kolejno, na tekście już poprawionym, i są **atomowe**: przy błędzie którejkolwiek nic się nie zmienia, a raport podaje numer pary i liczbę wystąpień.
- Zwykła spacja w „starym” dopasowuje też twardą; w „nowym” twarde spacje po jednoliterowych wyrazach dodaje narzędzie.
- Zapis wymaga `--kopia` i nie nadpisuje istniejącej kopii.
- Raport podaje liczbę zastosowanych par, słowa przed/po i **nowe artefakty** (podwójne spacje, przecinek przed kropką, prosty cudzysłów, uszkodzony znak). Zapis z nowym artefaktem kończy się kodem 1: popraw go, zanim pójdziesz dalej.
- Pusty „nowy” usuwa fragment razem z osieroconą spacją, a gdy zdanie było całym akapitem, także z pustym akapitem.
- Narzędzie nie ocenia jakości zamiany. Po zapisie przeczytaj zmieniony akapit w kontekście ([redakcja całości](redakcja-calosci.md#pętla-poprawki)).

## Tiki i gęstość: `ks.mjs tiki`, `ks.mjs gestosc`

Tylko odczyt. Służą przebiegowi tików na całości ([schematyczna proza](redakcja-schematycznej-prozy.md#przerzedzanie-tików-w-tomie-i-w-serii)).

```sh
node scripts/ks.mjs tiki -w 'skin(ął|ęła|ęli) głową' --kontekst 90 tom.md      # zdania z kontekstem i numerem wystąpienia
node scripts/ks.mjs gestosc -w '(?:^|(?<=[.!?…] ))Potem\b' T1.md T2.md T3.md     # trafienia na 10 tys. słów w każdym tomie
```

- `tiki` zwraca każde zdanie z wzorcem: linię, kontekst (¶ = granica akapitu) i, gdy zdanie powtarza się w pliku, `wystapienie` zgodne z `zamien`. Decyzję podejmuje lektura kontekstu: kto mówi, czy po usunięciu zostaje jasny podmiot, czy zdanie nie niesie znaczenia.
- `gestosc` porównuje tomy serii. Twarde spacje traktuje jak zwykłe, wzorzec ma flagi `gmu` (`^` = początek wiersza). Cel wyrównania wyznacza najchudszy tom autora, nie arbitralny limit.
