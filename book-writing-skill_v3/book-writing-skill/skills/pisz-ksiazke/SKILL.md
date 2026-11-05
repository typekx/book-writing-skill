---
name: pisz-ksiazke
description: "Projektuj książki i wielotomowe serie, analizuj i zachowuj styl autora, pisz oraz redaguj prozę modułami z kontrolą kanonu, wiedzy postaci, immersji i schematycznych manier. Używaj także przy biblii serii, kartach rozdziałów, przekazaniu pracy innemu modelowi, nazwach własnych, researchu, audycie i redakcji ukończonego tomu (przebiegi tematyczne na całości, skan spójności, weryfikacja opinii innych modeli), organizacji projektu i wydaniu. Rozpoznaje jednowyrazowe komendy po polsku i angielsku (pisz/write, dalej/next, audyt/audit, sprawdź/check…). Ma tryb lekki dla opowiadań i krótkich form."
metadata:
  version: "3.6.0"
---

# Pisz książkę

Pracuj na aktualnym rękopisie, w zakresie zamówionym przez autora. Konwencja, narracja, długość i typografia należą do projektu, nie do skilla. Ukończenie szkicu, audytu, redakcji i wydania to odrębne stany; zgodność oznacza kontrolowane zależności i jawne ograniczenia, nie obietnicę bezbłędności.

## Komendy

Pierwsze słowo wiadomości może być komendą (PL lub EN, polskie znaki opcjonalne), z opcjonalnym zakresem: `pisz R5`, `audit część II`. W środku zdania to słowo nie jest komendą; komenda nie poszerza zakresu. Lista: `pomoc/help`, `stan/status`, `źródła/sources`, `seria/series`, `plan`, `karty/cards`, `pisz/write`, `dalej/next`, `popraw/fix`, `redaguj/edit`, `korekta/proof`, `przebieg/pass`, `skan/scan`, `weryfikuj/verify`, `styl/style`, `immersja/immersion`, `sprawdź/check`, `audyt/audit`, `porównaj/diff`, `wpływ/impact`, `nazwy/names`, `decyzje/decisions`, `przekaż/handoff`, `wydanie/export`, `projekt/setup`, `lekki/light`, `pełny/full`. Znaczenie i zakres każdej: [komendy](references/komendy.md).

## Bezpieczniki

Obowiązują zawsze, także w trybie lekkim.

1. **Nie skracaj rękopisu po cichu.** Przy zmianie istniejącej jednostki porównaj liczbę słów i nagłówki z poprzednią wersją; spadek powyżej progu (domyślnie 3%) bez zamówionych cięć to błąd. Nie przepisuj całego tomu w jednej odpowiedzi.
2. **Nie deklaruj ukończenia bez pomiaru.** „Final” dopiero po policzeniu jednostek i słów i sprawdzeniu, że plik zawiera prozę, a nie szablon lub streszczenie.
3. **Fakty z przeszłości sprawdzaj w prozie kanonu, wyszukiwaniem, przed napisaniem zdania.** Pamięć rozmowy, streszczenie i plan nie są źródłem.
4. **Wiedza czytelnika nie jest wiedzą postaci** bez sceny, w której postać ją zdobywa.
5. **Planuj długość z zapasem** (około 110% celu); braki uzupełniaj beatami, nie wodą.
6. **Usunięty tik wraca w przebraniu;** po redakcji policz też zamienniki. Tiki przerzedzaj z kontekstem (`ks tiki`), nigdy w dialogu; po cięciu sprawdź, kto mówi; w serii wyrównuj gęstość (`ks gestosc`).
7. **Decyzja autora ma jedno źródło.** Otwartej decyzji fabularnej nie rozstrzygasz sam: zatrzymaj zależną scenę i podaj 2–3 warianty ze skutkami.
8. **Proza jest czysta:** bez komentarzy, znaczników, ukrytych znaków i metadanych; raport i stan to osobne pliki.
9. **Redakcję gotowego tomu prowadź na całości, nie na kawałkach:** jeden przebieg = cały tom + jeden temat, po kolei na jednym pliku. Zakres linii, „część dla agenta” i równoległe zapisy do tego samego pliku są błędem ([redakcja całości](references/redakcja-calosci.md)).
10. **Poprawka to pętla:** para „stary → nowy” (stary dokładnie raz), zastosowanie, lektura w kontekście, dopiero potem następna; migawka przed przebiegiem, dziennik zmian, stan zapisany do wznowienia po przerwie. Po scaleniach sprawdź zapis dialogu i artefakty (podwójne spacje, przecinki, cudzysłowy).
11. **Hipoteza bohatera nie jest faktem:** oznaczaj T (pokazane), M (rekonstrukcja), ? (nierozstrzygnięte); realia prawne i finansowe sprawdź u źródła, spory oznacz „do specjalisty” ([weryfikacja opinii](references/weryfikacja-opinii.md)).
12. **Opinię innego modelu sprawdzaj w tekście** (cytat istnieje? kontekst? kto mówi?), nie stosuj na ślepo; ocena 0–100 waha się o ±5, nie obiecuj wyniku, zatrzymaj się po rundach bez twardych konfliktów.
13. **Pliki wydania buduj na polecenie i z jednego źródła;** pracuj na MD, po zmianie tekstu odśwież opis i dziennik albo oznacz je jako nieaktualne. Brzmienie strony praw autorskich (dozwolony użytek, zastrzeżenie TDM) pokaż autorowi do decyzji. Publikację, ujawnienie AI i cenę wybiera autor.

## Tryb pracy: lekki albo pełny

Dobierz tryb do projektu i zapisz go w profilu.

- **Lekki** (`lekki`): opowiadanie, krótka forma, pojedyncza książka bez serii, próbka, szybka redakcja. Bez architektury serii, rejestrów i kart tomów; karta jednostki skrócona, raport trzypunktowy, stan opcjonalny. Szczegóły: [tryb lekki](references/tryb-lekki.md).
- **Pełny** (`pełny`): powieść pisana modułami, seria, przekazywanie pracy między modelami, praca z wieloma wersjami. Cały proces opisany niżej.

Domyślnie: lekki dla tekstów do około 20 tys. słów i pojedynczych zleceń redakcyjnych, pełny dla serii i projektów z istniejącym stanem kontynuacji. Przejdź na pełny, gdy pojawią się kolejne tomy, przekazanie lub poważne sprzeczności.

## Moduły

| Zadanie | Instrukcja |
|---|---|
| Seria, nowy tom, zmiana finału | [Projektowanie serii](references/projektowanie-serii.md) |
| Pisanie modułami, karty, akceptacja, pętla części | [Praca modułowa](references/praca-modulowa.md) |
| Głos autora | [Analiza stylu](references/analiza-i-zachowanie-stylu.md) |
| Zanurzenie czytelnika | [Immersja](references/immersja.md) |
| Wyliczenia, antytezy, tiki, puenty | [Redakcja schematycznej prozy](references/redakcja-schematycznej-prozy.md) |
| Audyt i redakcja ukończonego tomu: przebiegi tematyczne | [Redakcja całości](references/redakcja-calosci.md) |
| Sprzeczności czasu, przedmiotów, wiedzy, realiów po poprawkach | [Skan spójności](references/skan-spojnosci.md) |
| Analiza od innego modelu, hipoteza czy fakt, realia prawne | [Weryfikacja opinii](references/weryfikacja-opinii.md) |
| Uwagi autora do stron PDF, jego wersja | [Sesja uwag autora](references/sesja-uwag-autora.md) |
| Zależności między tomami, wpływ poprawek | [Walidacja serii](references/walidacja-serii.md) |
| Wiele wersji, przejęcie projektu, stan postaci | [Źródła i ciągłość](references/zrodla-i-ciaglosc.md) |
| Scena, perspektywa, granice treści, kontrola jednostki | [Warsztat i kontrola](references/warsztat-i-kontrola.md) |
| Nazwy własne i kolizje | [Nazwy i kolizje](references/nazwy-i-kolizje.md) |
| Praca w innym modelu lub aplikacji | [Przekazanie między modelami](references/przekazanie-miedzy-modelami.md) |
| Liczniki, daty, typografia, porównanie wersji | [Kontrola techniczna](references/kontrola-techniczna.md) |
| Organizacja folderów książki | [Repozytorium książki](references/repozytorium-ksiazki.md) |
| Skład, okładka, wydanie | [Wydanie i skład](references/wydanie-i-sklad.md) |
| Publikacja w KDP | [Publikacja KDP](references/publikacja-kdp.md) |

Czytaj tylko moduły potrzebne zadaniu.

## Start

Rozpoznaj tryb zadania: planowanie, pisanie jednostki, poprawka, redakcja, audyt, przekazanie. Analiza nie zamawia prozy; poprawka bieżącego rozdziału nie oznacza przejścia do następnego. Jeśli rękopis jest ukończony, `dalej` nie zaczyna go od nowa ani nie zamawia kolejnego tomu; zapytaj o cel.

Przeczytaj instrukcje projektu, [profil](assets/PROFIL_KSIAZKI.md), stan i mapę źródeł. Przy wielu wersjach wybierz tekst według [źródeł i ciągłości](references/zrodla-i-ciaglosc.md); nazwa FINAL lub data nie wystarczy, sprawdź objętość i treść. Zapisz hierarchię źródeł: kanon (proza) wygrywa z rejestrami, a te z planem; sprzeczność karty z kanonem trafia do raportu. Brakującego kanonu nie zastępuj wymyśloną przeszłością.

Nowy projekt: ustal tylko rodzaj książki, odbiorcę, obietnicę, perspektywę, język, granice treści i zakres; resztę zaproponuj jako oznaczone założenia.

## Pisanie

Przed pisaniem lub większą redakcją oprzyj się na [profilu stylu](assets/szablon-projektu/01_Zasady_Projektu/PROFIL_STYLU.md) z fragmentów autora; nie wyrównuj wszystkich scen do jednego rytmu. Konflikt i stawkę wyprowadź z celów postaci. W trybie pełnym rozpisz [karty jednostek](assets/KARTA_JEDNOSTKI.md); w serii najpierw architekturę całości ([projektowanie serii](references/projektowanie-serii.md)), ale nie blokuj nią zamówionej próbki.

Przed kontynuacją przeczytaj poprzednią jednostkę, jej raport, kartę i sceny źródłowe dla używanych faktów; odtwórz wiedzę, daty, miejsca, przedmioty, obrażenia, relacje i formy zwracania się. Pisz jedną jednostkę i zatrzymaj się, chyba że zamówiono więcej; prolog, interludium i epilog to osobne jednostki. W książce faktograficznej oddziel źródła od interpretacji i nie fabularyzuj bez oznaczenia.

## Redakcja i audyt

Oceniaj funkcję i kumulację zabiegu, nie sam zwrot; limity autora egzekwuj licznikiem i lekturą. Stosuj najmniejszą skuteczną poprawkę, potem sprawdź zachowanie informacji, głosu i objętości. Korekta nie zmienia fabuły; poprawki fabularne w tekście autora są propozycjami, chyba że je zamówiono. Te cechy nie dowodzą autorstwa AI: żadnego „procentu AI”.

Przy zmianie faktu znajdź zależności w późniejszych scenach i wcześniejszych tomach; nie zmieniaj po cichu przeszłości. Audyt podaje miejsce, źródło porównania, skutek i poprawkę, oddzielając błędy od hipotez. Jeśli możesz, zleć dodatkowy przegląd komuś, kto nie pisał tekstu; jeśli nie, zapisz to ograniczenie. Nierozstrzygnięta sprzeczność blokuje tylko zależne sceny.

Narzędzia (Node.js 20+): `node scripts/ks.mjs sprawdz|tom|porownaj|styl|spacje|tiki|gestosc` (tylko odczyt) oraz `zamien` (zmienia tekst wyłącznie z `--zapisz --kopia`) ([kontrola techniczna](references/kontrola-techniczna.md)). Wynik narzędzia nie zastępuje lektury.

## Po każdej jednostce

1. Czysta proza w osobnym pliku.
2. [Raport](assets/RAPORT_JEDNOSTKI.md): dziewięć punktów w trybie pełnym, trzy w lekkim.
3. Kontrola techniczna i lektura całości; przy poprawce porównanie z poprzednią wersją.
4. Aktualizacja [stanu](assets/STAN_KONTYNUACJI.md) faktami rzeczywiście zapisanymi; karta poprawiona tak, by opisywała napisany tekst.
5. Lokalizacja plików, wynik kontroli, status „do akceptacji autora”, ograniczenia. Zatrzymanie na końcu zakresu.

Kolejność łączenia ustalaj ze spisu tomu, nie z nazw plików. Zmiana tekstu w jednym formacie oznacza nieaktualne pozostałe wydania. Przy przekazaniu pracy innemu modelowi przygotuj [pakiet](assets/PAKIET_PRZEKAZANIA.md) według [instrukcji](references/przekazanie-miedzy-modelami.md), a tekst, który wraca, sprawdź jak własny szkic. Utworzenie tekstu nie upoważnia do publikacji ani wysyłki.
