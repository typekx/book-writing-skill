# Skan spójności całego tomu

Czytaj przed końcowym wydaniem, po większych zmianach fabuły lub stylu i zawsze po zakończeniu przebiegów redakcyjnych ([redakcja całości](redakcja-calosci.md)). Skan znajduje sprzeczności, które powstają **na szwach** poprawek i między odległymi scenami.

## Dlaczego ta metoda

Wcześniejsze analizy zawodziły z czterech powodów: dzieliły tekst na zakresy (każdy widział jeden koniec sprzeczności); nie miały jednego źródła prawdy (agenci porównywali „na pamięć”); nie sprawdzały celowo zmienionych miejsc (każda runda poprawek dodawała nowe sprzeczności); mieszały błędy z gustem (fałszywe zarzuty tworzyły szum). Metoda poniżej to usuwa.

## Rejestry kategorii

Każdy agent czyta **cały tom** i buduje rejestr jednej kategorii: wiersze `fakt | wszystkie miejsca (linia, cytat) | spójne?`. Konflikt to pozycja do naprawy.

| Kod | Kategoria | Co wpisać |
|---|---|---|
| K1 | Czas | każda data, dzień tygodnia, godzina, odstęp („trzy dni później”), wiek, staż, rok zdarzenia; kalendarz nagłówków sprawdź skryptem, nie na oko |
| K2 | Przedmioty i dokumenty | każdy egzemplarz, kopia, oryginał, nośnik, klucz, kartka, teczka: liczba, kto ma, gdzie leży, kiedy się przemieszcza |
| K3 | Ludzie, miejsca, liczby | imiona, funkcje, relacje, adresy, trasy, odległości, nazwy podmiotów, kwoty, ceny, procenty, liczby rodzin i transz; przeliczenia (waluty, denominacja) |
| K4 | Wiedza postaci | kto się czego dowiaduje, kiedy i skąd; czy ktoś wie coś przed źródłem albo zapomina to, co wie |
| K5 | Realia | każde twierdzenie prawne, podatkowe, bankowe, procesowe, techniczne z oceną poprawności i źródłem |
| K6 | Regresja | każdy fragment zmieniony od wersji sprzed przebudowy (różnica wersji): szwy i sprzeczności z tekstem niezmienionym |

Rejestry buduj **od zera** (bez wglądu w poprzednie wyniki), niezależnie. Po przebiegach redakcyjnych przeczytaj wszystko jeszcze raz, bo każda poprawka mogła coś zmienić.

## Cykl

1. Rejestry K1–K6 (równolegle, tylko odczyt).
2. **Weryfikator** (osobny agent): dla każdego zgłoszonego konfliktu rozstrzyga, czy jest prawdziwy, czy koliduje z innymi tomami, i testuje parę poprawki na kopii pliku. Fałszywe alarmy odpadają tutaj, nie w tekście.
3. Poprawki: najmniejsze skuteczne, jako pary ([redakcja całości](redakcja-calosci.md#pętla-poprawki)); popraw też miejsca, w których inna kategoria zgłosiła ten sam konflikt, żeby nie naprawić go połowicznie.
4. **Świeża runda kontrolna** od zera na poprawionym tekście. Powtarzaj, aż dwie kolejne rundy nie dadzą twardych konfliktów. (W praktyce liczba konfliktów maleje szybko: 11 → 4 → 1.)

## Rozróżniaj

- **twardą sprzeczność** (dwa fakty wykluczają się),
- **hipotezę bohatera** (postać zakłada, tekst nie rozstrzyga),
- **zamierzoną tajemnicę** (autor nie ujawnił jeszcze odpowiedzi),
- **ocenę stylistyczną** (gust).

Tylko pierwsza jest błędem do naprawy bez pytania. Drugą traktuj jako sprawę pewności ustaleń ([weryfikacja opinii](weryfikacja-opinii.md)), trzecia zostaje, czwarta idzie do przebiegu stylu.

## Typowe źródła sprzeczności znalezione w praktyce

- Dzień tygodnia nie zgadza się z datą; odstęp „trzy tygodnie temu” nie zgadza się z datą sceny.
- Liczba egzemplarzy dokumentu lub nośników zmienia się między scenami; przedmiot jest w dwóch miejscach naraz.
- Postać wie coś, zanim ktoś jej to powiedział, albo „zapomina” fakt z wcześniejszej sceny.
- Ta sama komórka lub funkcja ma dwie nazwy (dział/departament, dyrektor/dyrektorka); nazwa rejestru z innej dziedziny wchodzi do cudzego (np. „Centralny” zamiast „Krajowy”).
- Notatka postaci przedstawia hipotezę jako ustalony fakt („płacił od dwudziestu lat”, gdy znany jest tylko ostatni przelew).
- Zdanie z liczbą lat odnosi się niejednoznacznie do roku (np. „pięć lat później” po dacie sprzed trzydziestu lat).
- Dwa różne zestawy dokumentów opisane „tymi samymi” słowami (np. umowy z dwoma różnymi kontrahentami).
- Zdublowany rekwizyt gestu u różnych postaci (ten sam nawyk ręki u dwóch osób).
- **Deiktyki czasu w dniu sceny:** w scenie piątkowej „w piątek” o zdarzeniu sprzed tygodnia, „od piątku” w ten sam piątek, „wczoraj” po nocy, która w tekście jeszcze nie minęła. Każde „w poniedziałek”, „wczoraj”, „od tygodnia” przelicz względem daty nagłówka.
- **Zaokrąglenia, które się rozjeżdżają:** „półtora roku” w jednym akapicie i „prawie dwa lata” w następnym o tym samym zdarzeniu; „dziesięć lat” czegoś, gdy daty w tekście dają dziewięć. Licz od daty w prozie, nie od wrażenia.
- **Łańcuchy godzin:** telefon o 7:10 i wiadomość o 7:40 „dziesięć minut po zdarzeniu”; spotkanie „od jedenastej”, a pociąg odjeżdża o dziewiątej. Wypisz godziny jednego dnia w kolejności i sprawdź odstępy.
- **Obecność w miejscu:** postać „czeka w kawiarni od piętnastej”, a o 15:30 ktoś inny widzi stolik pusty; postać jest w dwóch odległych miastach tego samego dnia bez opisanej podróży.
- **Kolejność w scenie:** „kiedy wróciła, zapytała ją…” postawione przed opisem jej wyjścia; wiedza z rozmowy, która w tekście następuje dwa dni później (postać zna szczegół, który usłyszy dopiero później).
- **Fizyka i realia rzeczy:** czynność wykonana ręką, która w tej sytuacji nie może jej wykonać; wskazówka zegara „przechodzi” przez godziny, których po drodze nie ma; sprzęt, którego bohater nie może obsłużyć z opisanym urazem.
- **Funkcje i tytuły między tomami:** inna funkcja tej samej osoby w dwóch tomach (np. „dyrektor” i „zastępca dyrektora”). Rozstrzygaj według dokumentu cytowanego w prozie wcześniejszego tomu.
- **Tytuły i nazwy jednostek** w różnych wersjach (sąd rejonowy/okręgowy) oraz odmiana obcych imion.

**Zanim poprawisz „sprzeczność z wcześniejszym tomem”, znajdź scenę w prozie tego tomu.** Pamięć i streszczenie mylą: w praktyce zdarzenie uznane za „pierwsze” okazuje się drugim, bo pierwsze opisano w poprzednim tomie, więc „poprawka” wprowadziłaby błąd. Wyszukaj nazwę miejsca lub rekwizytu we wszystkich tomach i przeczytaj nagłówki dat wokół trafień.

## Źródło prawdy

Przed skanem zbierz w jednym miejscu: tablicę faktów (daty, kwoty, kto ma jaki przedmiot, kto co wie) wyprowadzoną z prozy oraz spis fraz cytowanych dosłownie w innych tomach. Rejestry nie są kanonem: przy sprzeczności wygrywa proza zatwierdzona przez autora.
