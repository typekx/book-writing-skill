# Historia zmian

## 3.6.0 — 5 XI 2026

Zmiany wynikające z publikacji tomu w Amazon KDP i sesji uwag autora prowadzonej strona po stronie. Skill nie zawiera treści ani danych żadnej konkretnej książki.

### Dodane

- `references/publikacja-kdp.md`: publikacja w KDP prowadzona krok po kroku (polski tylko w druku, seria w podtytule, ISBN i imprint, zgodność rozmiaru i papieru z plikami, pusta strefa kodu kreskowego dla Amazona, odczyt podglądu, ujawnienie AI, ceny netto i tantiemy, Expanded Distribution, egzemplarz próbny).
- `references/sesja-uwag-autora.md`: uwagi adresowane stroną PDF i akapitem, rejestr par z próbą `zamien`, naniesienie hurtowe po zamknięciu sesji, weryfikacja poprawionej wersji autora, echa i motywy przed zmianą.
- Scenariusze B21 (KDP) i B22 (sesja uwag).

### Zmienione

- `SKILL.md`: tabela modułów, bezpiecznik 13 (publikację, ujawnienie AI i cenę wybiera autor).
- `references/wydanie-i-sklad.md`: strefa kodu kreskowego zostaje pusta.

## 3.5.0 — 2 XI 2026

Zmiany wynikające z redakcji i wydania wielotomowej serii: przebiegów spójności na kolejnych tomach, kontroli między tomami, przerzedzania tików w kilku tomach naraz i przygotowania stron praw autorskich. Skill nie zawiera treści ani danych żadnej konkretnej książki.

### Dodane

- `ks.mjs tiki|ticks -w wzorzec plik.md [--kontekst N]`: zdania z wzorcem z numerem linii, kontekstem i numerem wystąpienia zgodnym z `zamien`.
- `ks.mjs gestosc|density -w wzorzec pliki…`: trafienia na 10 tys. słów w każdym tomie, do wyrównywania stylu serii.
- `zamien`: pole `wystapienie` (`{"stary","nowy","wystapienie"}` albo `["stary","nowy",n]`) dla zdań powtarzanych w tomie; pusty „nowy” usuwa fragment razem z osieroconą spacją i pustym akapitem.
- `references/redakcja-schematycznej-prozy.md`: „Przerzedzanie tików w tomie i w serii”, czyli pomiar gęstości, cel według najchudszego tomu, reguły dla automatu (bez dialogów, bez klityk na początku zdania, pary „Najpierw… Potem…”), kontrola mówcy po cięciach, motyw a tik.
- `references/skan-spojnosci.md`: pułapki deiktyk czasu („w piątek” w piątek), zaokrągleń, łańcuchów godzin, obecności w miejscu, kolejności w scenie, fizyki rzeczy, tytułów między tomami; nakaz sprawdzenia sceny we wcześniejszym tomie przed „poprawką”.
- `references/wydanie-i-sklad.md`: strona praw autorskich według prawa polskiego (dozwolony użytek, zastrzeżenie TDM z art. 26³, TDMRep w EPUB), przypadki bękartów pomijane przez prostą regułę (kursywa na końcu akapitu, myślnik dialogowy), fałszywe alarmy miernika, przeliczniki grzbietu KDP, przebudowa całej serii jednym przebiegiem.
- Scenariusze B19 (tiki w zdaniach powtarzanych) i B20 (strona praw autorskich); testy `tiki`, `gestosc` i `wystapienie`.

### Zmienione

- `SKILL.md`: bezpieczniki 6 i 13 (tiki z kontekstem, nigdy w dialogu, kontrola mówcy, gęstość w serii; brzmienie strony praw autorskich do decyzji autora), lista narzędzi.

## 3.4.0 — 2 XI 2026

Zmiany wynikające z redakcji i wydania ukończonego tomu powieści: pełnego audytu, kilkunastu przebiegów poprawek, skanów spójności, analiz innych modeli i przygotowania wydania. Skill nie zawiera treści ani danych żadnej konkretnej książki.

### Dodane

- `references/redakcja-calosci.md`: redakcja ukończonego tomu przebiegami tematycznymi na **całości** (jeden temat, cały tom, po kolei na jednym pliku; zakaz dzielenia na zakresy), kolejność przebiegów P0–P6, pętla poprawki (para stary → nowy, zastosuj, przeczytaj w kontekście), migawki, dziennik, zapis stanu i wznowienie po przerwie, kryterium zatrzymania, uczciwe podejście do ocen (rozrzut ±5, bez obietnic).
- `references/skan-spojnosci.md`: skan kategoriami K1–K6 (czas, przedmioty, ludzie i liczby, wiedza postaci, realia, regresja), niezależne rejestry, weryfikator, rundy kontrolne do dwóch czystych z rzędu, lista typowych źródeł sprzeczności.
- `references/weryfikacja-opinii.md`: traktowanie analiz innych modeli jak hipotez (cytat istnieje? kontekst? kto mówi?), oznaczenia T/M/? dla pewności ustaleń w prozie śledczej, zasady dla realiów prawnych, finansowych i technicznych.
- `scripts/zamien.mjs` i podkomenda `ks.mjs zamien|patch`: zamiany „stary → nowy” z weryfikacją jednokrotnego wystąpienia, dopasowaniem twardych spacji, atomowością, próbą bez zapisu, obowiązkową kopią przy zapisie i wykrywaniem nowych artefaktów; testy w `test-zamien.mjs`.
- Szablony: `DZIENNIK_PRZEBIEGU.md`, `ZADANIE_PRZEBIEGU.md`; sekcja „Wznowienie po przerwie” w `STAN_KONTYNUACJI.md`.
- Komendy `przebieg/pass`, `skan/scan`, `weryfikuj/verify`.
- `wydanie-i-sklad.md`: budowa plików na polecenie i z jednego źródła, przeliczanie grzbietu po zmianie liczby stron, pakiet wydawniczy, wersja do druku domowego (impozycja arkuszy A4 w składki po 4 strony).
- `przekazanie-miedzy-modelami.md`: opis tomu dla innych modeli (układ pliku, odświeżanie po zmianach).
- Sześć scenariuszy testowych (B13–B18) w `evals/scenariusze.json`.

### Zmienione

- `SKILL.md`: pięć nowych bezpieczników (9–13) i trzy nowe wiersze modułów; opis zawiera redakcję ukończonego tomu.

## 3.3.0 — 12 X 2026

### Dodane

- Tryb lekki (`lekki`/`light`) dla opowiadań, krótkich form, pojedynczych książek i szybkiej redakcji: skrócona karta, raport trzypunktowy, bez rejestrów serii (`references/tryb-lekki.md`); komenda `pełny`/`full` przywraca pełny proces.
- `evals/scenariusze.json`: 12 scenariuszy zachowania z listami wymaganych i zakazanych reakcji, z instrukcją uruchamiania.
- `scripts/test-skill.mjs`: automatyczna kontrola spójności skilla (nagłówek, limit słów `SKILL.md`, odnośniki, zgodność komend, format scenariuszy).
- Licencja PolyForm Noncommercial 1.0.0 i warunki licencji komercyjnej (`COMMERCIAL.md`).

### Zmienione

- `SKILL.md` skrócony z około 2000 do około 1000 słów: tabela komend zastąpiona listą, szczegóły zostały w modułach.

## 3.2.0 — 12 X 2026

### Dodane

- Jednowyrazowe komendy czatu po polsku i angielsku (`pisz`/`write`, `dalej`/`next`, `audyt`/`audit`, `sprawdź`/`check`, `przekaż`/`handoff` i inne, razem 22 pary); polskie znaki opcjonalne. Tabela w `SKILL.md`, szczegóły w `references/komendy.md`.
- `scripts/ks.mjs`: jedna komenda do narzędzi z podkomendami `sprawdz|check`, `tom|volume`, `porownaj|diff`, `styl|style`, `spacje|nbsp`, `pomoc|help`; automatyczne wyszukiwanie `reguly_kontroli.json` w folderze projektu. Testy w `test-ks.mjs`.
- Krótkie opcje `kontrola-jednostki.mjs`: `-r`, `-p`, `-n` i angielskie `--rules`, `--compare`, `--nbsp`.
- Komendy skrócone w szablonie pakietu przekazania.

### Zmienione

- README: przykłady jako komendy zamiast długich zdań; `agents/openai.yaml`: domyślne polecenie `$pisz-ksiazke stan`.

## 3.1.0 — 12 X 2026

Zmiany wynikające z doświadczeń przy pisaniu wielotomowej powieści i przekazywaniu pracy między modelami. Skill nie zawiera treści ani danych żadnej konkretnej książki.

### Dodane

- Sekcja „Bezpieczniki wyniesione z praktyki” w `SKILL.md`: zakaz cichego skracania rękopisu, pomiar przed deklaracją ukończenia, sprawdzanie faktów w prozie kanonu, rozdział wiedzy czytelnika i postaci, zapas długości, tiki zastępcze, jedno źródło decyzji, czysta proza.
- Instrukcje: `praca-modulowa.md`, `przekazanie-miedzy-modelami.md`, `nazwy-i-kolizje.md`, `kontrola-techniczna.md`, `wydanie-i-sklad.md`.
- Szablony: `KARTA_JEDNOSTKI.md`, `PAKIET_PRZEKAZANIA.md`, `katalog_nazw.md`, `granice_tresci.md`, `reguly_kontroli.przyklad.json`.
- Skrypt `kontrola-jednostki.mjs` z testami: dni tygodnia, typografia, pozostałości robocze, znaki niewidoczne, limity fraz i wzorce wbudowane (antyteza, „To nie było X. To było Y.” z przebraniami, dwukropek zapowiadający, potrójna anafora), wycofane nazwy, minimum według typu jednostki, porównanie z poprzednią wersją, kontrola całego tomu z limitami `maxTom` i wykrywaniem duplikatów, kopia z twardymi spacjami do nowego pliku.

### Zmienione

- `zrodla-i-ciaglosc.md`: typowe pułapki wersji (fałszywe ukończenie, pusty wynik, dwie warstwy w pliku, wycofany master, konkurujące decyzje, plan z pamięci); formy zwracania się, rekwizyty stałe i liczniki serii.
- `walidacja-serii.md`: klasy błędów ciągłości z przykładami i niezależny przegląd.
- `redakcja-schematycznej-prozy.md`: przebrania konstrukcji, tik zastępczy, limity projektu, nowe wzorce w katalogu.
- `warsztat-i-kontrola.md`: perspektywa i hak, granice treści, zakazane zestawienia, realia.
- `projektowanie-serii.md`: identyfikatory i rejestry serii, rejestr decyzji, klasy dowodów, stan po tomie, rejestr konfliktów planu z kanonem.
- `analiza-i-zachowanie-stylu.md`: przewodnik stylu wygrywa z planem, głosy postaci, dryf przy pracy kilku modeli.
- Raport jednostki, stan kontynuacji, profil książki, spis tomu i rejestr decyzji: statusy akceptacji, porównanie objętości, tabela wiedzy, formy zwracania się, liczniki, hierarchia źródeł, wersje wycofane.
- `audyt-stylu.mjs`: eksport funkcji `proseLines` do użycia przez kontrolę jednostki (bez zmiany działania).

## 3.0.0

Projektowanie serii przed tomem I, analiza i zachowanie stylu, immersja, redakcja schematycznej prozy, walidacja serii, szablon projektu i skaner stylu.
