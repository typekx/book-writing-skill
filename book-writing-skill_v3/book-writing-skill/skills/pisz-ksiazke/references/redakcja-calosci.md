# Redakcja ukończonego tomu: przebiegi tematyczne na całości

Czytaj, gdy rękopis tomu lub książki już istnieje i autor zamawia audyt, redakcję, poprawę stylu albo przygotowanie do wydania. Praca modułowa ([praca modułowa](praca-modulowa.md)) dotyczy pisania; tu jest redakcja gotowego tekstu.

## Zasada naczelna: całość, jeden temat

Tekstu nie dzielisz na części, zakresy linii ani „fragmenty do osobnych agentów”. Każdy przebieg (lub agent) czyta **cały tom** od pierwszej do ostatniej linii i zajmuje się **jednym tematem** (dialogi, narrator, tiki, fakty, język, spójność). Powód: błędy spójności łączą odległe miejsca, a czytelnik zakresu widzi tylko jeden ich koniec; podział na zakresy daje losowe pokrycie i fałszywe poczucie kontroli. Czytanie „po 300–700 linii” to technika wczytywania, nie podział pracy.

Przebiegi wykonuj **jeden po drugim na jednym pliku**, nigdy równolegle na tym samym pliku. Kolejny przebieg widzi tekst poprawiony przez poprzednie i nie cofa ich poprawek bez przyczyny (sprzeczność, błąd). Równolegle wolno uruchamiać tylko przeglądy tylko do odczytu (skany, oceny), bo nie zmieniają pliku.

Jeśli autor wprost zakazał dzielenia tekstu, ten zakaz obowiązuje bezwzględnie; jeśli o to nie pytał, i tak wybieraj całość.

## Kolejność przebiegów

Kolejność od spraw, które zmieniają fakty, do tych, które zmieniają tylko brzmienie. Poprawka późniejsza nie powinna unieważniać wcześniejszej.

| Przebieg | Temat | Uwagi |
|---|---|---|
| P0 | formalia: spis osób, nota, tytuły, nazwy własne, marki | decyzje autora zostają autorowi |
| P1 | fakty, logika, chronologia, realia, wiedza postaci | najpierw, bo reszta opiera się na faktach |
| P2 | dialogi: tyrady, aforyzmy w ustach postaci, zróżnicowanie głosów | |
| P3 | głos narratora: puenty-tezy, rekapitulacje, wykłady, objaśnienia | |
| P4 | maniera składniowa i tiki: „Nie…”, „jakby”, jednozdaniowe akapity, powtarzane gesty | policz też zamienniki |
| P5 | korekta językowa: gramatyka, interpunkcja, powtórzenia, szwy po scaleniach, zapis notatek | |
| P6 | skan spójności po wszystkich zmianach ([skan spójności](skan-spojnosci.md)) | zawsze na końcu |

Dopiero po P6 buduj pliki wydania ([wydanie i skład](wydanie-i-sklad.md)).

## Pętla poprawki

Dla każdego defektu: (1) zaproponuj najmniejszą skuteczną poprawkę jako parę „stary fragment → nowy fragment”; (2) zastosuj ją narzędziem (`node scripts/ks.mjs zamien plik.md pary.json`; próba bez zapisu, potem `--zapisz --kopia przed.md`); (3) **przeczytaj zmieniony akapit razem z sąsiednimi**: rytm, zaimki, kolejność informacji, nowe powtórzenia, czy kwestia nadal odpowiada na poprzednią; (4) jeśli gorzej, popraw drugi raz; dopiero potem następny defekt. Kolejne poprawki odnoszą się do tekstu już poprawionego.

Zasady techniczne:

- Stary fragment występuje w pliku **dokładnie raz**; zwykła spacja dopasowuje też twardą; twarde spacje po jednoliterowych wyrazach dodaje narzędzie.
- Zamiany idą partiami (10–20 par, zapis do `pNN.json`), żeby przerwanie nie zgubiło pracy.
- **Migawka przed każdym przebiegiem** (`T_przed_P3.md`); bez niej nie ma powrotu.
- Po zamianach automatycznych szukaj artefaktów: podwójne spacje, przecinek przed kropką, prosty cudzysłów, zdublowany cytat, uszkodzony znak (np. ©), pusty „– –”. Narzędzie zgłasza je w raporcie, ale i tak przeszukaj plik.
- **Po usunięciu wtrąceń narratora sprawdź zapis dialogu:** dwie kolejne kwestie tej samej postaci w osobnych akapitach z półpauzą sugerują zmianę rozmówcy; scal je albo wstaw reakcję. To najczęstszy skutek uboczny przebiegów P2 i P3.
- Przed usunięciem lub mocnym przeredagowaniem wyrazistego zdania wyszukaj jego rdzeń (≥4 słowa) w pozostałych tomach: frazy cytowane dosłownie w dalszych tomach zostają bez zmian. Spis takich fraz trzymaj w profilu książki.
- Stan wejścia do następnego tomu (kto ma jaki przedmiot, kto co wie, kto żyje i gdzie jest) jest nienaruszalny; zmiana go wymaga decyzji autora.

## Dziennik i stan

Po każdej partii dopisuj do dziennika przebiegu ([szablon](../assets/DZIENNIK_PRZEBIEGU.md)) wpisy `[kat] rozdział | BYŁO | JEST | powód`. Pod koniec zbierz je w jeden **dziennik poprawek** dla autora, razem z raportem wydania. Instrukcję dla agenta przebiegu masz w [szablonie zadania](../assets/ZADANIE_PRZEBIEGU.md).

Stan pracy zapisuj w pliku stanu **po każdym przebiegu i co 20–30 minut długiej pracy**: który przebieg, wersja pliku, liczba słów, identyfikatory agentów, decyzje otwarte, następny krok. Po przerwie (limit sesji, restart środowiska) wznów od stanu, `postep.md` i dziennika, nie od zera; pliki na dysku przeżywają, rozmowa nie. Przed wznowieniem sprawdź, czy poprawki z ostatniej partii są już w pliku, żeby ich nie zastosować drugi raz.

## Co sprawdzać po każdym przebiegu

1. Kontrola techniczna (`ks.mjs sprawdz`) bez błędów; grep na artefakty.
2. Liczba słów przed/po. Cięcia stylistyczne wolno przekroczyć próg 3% tylko wtedy, gdy autor zamówił skracanie; zapisz bilans i powód. Wzrost objętości po zmianach fabularnych wyjaśnij w raporcie.
3. Lektura kilkunastu losowo wybranych zmienionych miejsc w kontekście.
4. Wskaźniki właściwe tematowi przed/po (np. akapity od „Nie”, tyrady powyżej 100 słów, aforyzmy w dialogu).
5. Raport przebiegu: liczba zmian per kategoria, wskaźniki, **odrzucone zarzuty z powodem**, sprawy do decyzji autora, sprawy dla kolejnych przebiegów.

## Kiedy skończyć

Redakcja nie ma końca, ma kryterium zatrzymania. Zatrzymaj się, gdy: dwie kolejne niezależne rundy skanu spójności nie dają twardych konfliktów; kolejne przeglądy dają już tylko kosmetykę (gust, rytm); pozostałe sprawy to decyzje autora lub weryfikacja przez specjalistę. Nie obiecuj konkretnej oceny. Niezależni recenzenci różnią się o około ±5 punktów na skali 0–100, więc różnica kilku punktów między dwiema ocenami jest szumem. Nie goń za wynikiem (np. „minimum 90”): daj uczciwy przedział, wskaż, co faktycznie podnosi jakość (pewność ustaleń, powtórzenia, głosy), i oddaj decyzje autorowi.

## Ograniczenia

- Przy opiniach i analizach z zewnątrz stosuj [weryfikację opinii i pewności ustaleń](weryfikacja-opinii.md): cytat musi istnieć w tekście, kontekst się zgadzać.
- Realia prawne, finansowe i techniczne w fikcji: popraw oczywiste błędy, a spory oznacz „do weryfikacji przez specjalistę”; nie rozstrzygaj ich pewnym tonem.
- Zmiany wprowadzone przez narzędzie lub agenta to dalej propozycje, dopóki autor ich nie przyjmie; wersje do wydania buduj dopiero na polecenie.
