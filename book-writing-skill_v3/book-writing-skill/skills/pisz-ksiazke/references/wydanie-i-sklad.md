# Wydanie i skład

Czytaj, gdy zadanie obejmuje złożenie tomu, pliki produkcyjne, okładkę lub dane wydania. Eksport nie jest poleceniem publikacji ani wysyłki.

## Maszynopis gotowy do składu

- Jeden plik źródłowy na tom, złożony z jednostek według spisu. Objętość całości równa się sumie jednostek; sprawdź to po złożeniu.
- Stałe znaczniki rozpoznawane przez skrypty składu: część, rozdział, interludium, prolog, epilog, linia daty, separator scen, tekst wyśrodkowany, nota końcowa. Zapisz je w przewodniku stylu projektu i trzymaj od pierwszej strony kolejnego tomu; wtedy skład idzie tym samym torem.
- Część przedtytułowa i końcowa (nota prawna, „Od autora”, podziękowania, dedykacja) to decyzje autora. Projekty tych tekstów oznacz jako szkice do akceptacji.
- Nota o fikcyjności podmiotów obejmuje nazwy, które mogą przypominać realne; uzupełnij ją po teście kolizji ([nazwy i kolizje](nazwy-i-kolizje.md)).

## Kolejność prac przed drukiem

1. Akceptacja tekstu i otwartych decyzji tekstowych przez autora.
2. Ostatnie sprawdzenie nazw.
3. Korekta językowa (bez zmian fabularnych; porównanie objętości przed i po).
4. Skład próbny, liczba stron.
5. Korekta po łamaniu: kursywa, twarde spacje, wdowy i sieroty, żywa pagina, spis treści.
6. Okładka przeliczona na rzeczywistą liczbę stron.
7. Skład finalny i rejestr: z której wersji źródła powstał każdy plik.

## Pliki i ich sprawdzenie

| Plik | Co sprawdzić |
|---|---|
| DOCX | style nagłówków, język dokumentu, polskie znaki, kursywa, separator scen, numeracja stron |
| PDF do druku | format i marginesy wymagane przez drukarnię lub platformę, osadzone fonty, liczba stron |
| PDF e-book | spis treści z odnośnikami, wielkość pliku |
| EPUB | walidator (np. EPUBCheck) bez błędów, spis nawigacyjny, okładka, punkty orientacyjne |
| Okładka | rozdzielczość w druku co najmniej 300 DPI dla wymiaru ze spadem, grzbiet z rzeczywistej liczby stron i papieru, strefa kodu kreskowego pusta (kod wstawia platforma; w KDP własny kod bywa odrzucany, zob. [publikacja KDP](publikacja-kdp.md)), front e-booka w wymaganych proporcjach |

Wynik działania narzędzia nie zastępuje obejrzenia stron. Przy zmianie tekstu po składzie odnotuj, które pliki trzeba przebudować.

## Dane wydania

ISBN osobno dla każdego formatu, wydawca lub imprint, cena, kanał dystrybucji, metryka (tytuł, autor, język). Brakujące dane oznacz jako blokady produkcyjne zamiast wpisywać przykładowe wartości.

## Strona praw autorskich (prawo polskie)

Brzmienie to decyzja autora: pokaż warianty, nie wstawiaj po cichu. Zasady:

- **Nie obiecuj więcej niż prawo.** Formuła nie wyłącza dozwolonego użytku (art. 23–35 ustawy z 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych), więc dodaj „z wyjątkiem przypadków dozwolonego użytku” albo „przypadków dozwolonych przez prawo”.
- **Eksploracja tekstów i danych (TDM, trenowanie AI).** Art. 26³ dopuszcza ją domyślnie, chyba że uprawniony to wyraźnie zastrzeże, „odpowiednio do sposobu, w jaki utwór został udostępniony”. W druku wystarczy zdanie na stronie redakcyjnej. W e-booku dodaj też zastrzeżenie czytelne maszynowo: metadane W3C TDMRep w OPF (`tdm:reservation` = 1, opcjonalnie `tdm:policy`).
- Warianty: krótki („Kopiowanie… bez pisemnej zgody autora jest zabronione, z wyjątkiem przypadków dozwolonych przez prawo”), pełny (powielanie, przechowywanie w systemach wyszukiwania, rozpowszechnianie w jakiejkolwiek formie bez uprzedniej pisemnej zgody, z wyjątkiem dozwolonego użytku) i pełny z zastrzeżeniem TDM. Przy dużej dystrybucji zaleć przegląd prawnika.
- Sprawdzony układ autorski: „© rok Autor”, „Wydanie pierwsze, kraj rok”, zastrzeżenie z wymogiem pisemnej zgody i zdaniem, że nie ogranicza ono dozwolonego użytku, w tym prawa cytatu, wzór cytowania („Autor, *Seria. Tom N: Tytuł*, rok”), zastrzeżenie TDM, „Zgoda na wykorzystanie: adres”, ISBN. Adres kontaktowy podaje autor; nie wstawiaj adresu z konta bez jego zgody.
- **Po zmianie strony redakcyjnej obejrzyj ją w PDF.** Dłuższy tekst przy dużym górnym marginesie tej strony wypycha ostatnią linię na następną stronę i dokłada strony całej książce (w praktyce +2). Zmniejsz margines albo stopień pisma, aż wszystko zmieści się na jednej stronie, i dopiero wtedy przelicz grzbiet.

## Budowa plików: kiedy i jak

- **Pracuj na pliku źródłowym (Markdown), nie na PDF/EPUB/DOCX.** Pliki wydania buduj dopiero po ostatnim przebiegu redakcji albo na wyraźne polecenie autora; nie przebudowuj ich po każdej poprawce (marnuje czas i zużycie).
- Przy budowie wszystkie pliki powstają z **tej samej wersji źródła**; stare kopie wydania zastąp nowymi, żeby nie zostały równolegle dwie wersje. Zapisz w raporcie, z której wersji powstały.
- Proces skryptowy: jeden skrypt budujący (źródło → HTML/PDF, EPUB, DOCX) z jednym plikiem metadanych; znaki zmiany sceny, nagłówki części i rozdziałów to znaczniki rozpoznawane przez skrypt. Po każdej budowie: liczba stron, osadzone fonty, walidacja EPUB (EPUBCheck), kontrola spisu treści, obejrzenie kilku stron (tytułowa, spis, początek rozdziału, ostatnia). Narzędzie nie zastępuje oglądu.
- **Dzielenie wyrazów (przenosy) mierz, nie zgaduj.** Automatyczne dzielenie z domyślnymi limitami na wąskiej kolumnie (np. 5,5 × 8,5″, justowanie) daje kilkanaście procent wierszy z przenosem i serie kolejnych przenosów. Policz je w gotowym PDF (`pdftotext -layout`, wiersze kończące się literą i łącznikiem) i dobierz limity: dzielenie tylko wyrazów od ok. 11 liter, po min. 5 liter z każdej strony, strefa dzielenia ok. 12% (WeasyPrint: `hyphenate-limit-chars: 11 5 5`, `hyphenate-limit-zone: 12%`) obniżyło wynik z 16% do ok. 3% bez zmiany liczby stron; umiarkowane limity (9/4/4, strefa 6%) dają ok. 7–8%; całkowity zakaz dzielenia wydłuża książkę o strony i luzuje wiersze. Wybór należy do autora. **Bękarty** (ostatni wiersz akapitu z jednym krótkim wyrazem albo samym fragmentem przeniesionego wyrazu) usuwa się dwoma zabiegami w skrypcie składu: ostatni wyraz akapitu (do ok. 9 znaków) wiązać twardą spacją z poprzednim i wyłączyć dla niego dzielenie (`hyphens: manual` na ostatnim słowie); w praktyce ponad sto bękartów na tom spada do kilku. Dwa przypadki, które ta reguła przepuszcza: akapit kończący się kursywą (regex „ostatni wyraz” musi pominąć zamykające znaczniki `</em>`) i myślnik dialogowy przed ostatnim wyrazem („– Proszę.”), który trzeba związać twardymi spacjami z obu stron. Miernik bękartów w PDF zgłasza też fałszywe alarmy: jednowyrazowe akapity („Pięć.”, „Jedźcie.”) to nie bękarty, więc każdy alarm obejrzyj. **Wdowy i sieroty** (pojedynczy wiersz akapitu na początku lub końcu strony) blokuje `orphans: 2; widows: 2`. W EPUB nie wymuszaj dzielenia (`hyphens: manual`, tekst do lewej); w DOCX wyłączone jest domyślnie. Sprawdź próbkę podziałów pod kątem poprawności sylabizacji.
- **Liczba stron zmienia grzbiet.** Po każdej zmianie objętości przelicz okładkę: szerokość całej okładki = 2 × szerokość strony + grzbiet + spady; grzbiet zależy od papieru i liczby stron (przelicznik platformy; wynik potwierdź w jej kalkulatorze po wgraniu pliku). KDP, druk czarno-biały: papier biały ok. 0,002252″ na stronę, kremowy ok. 0,0025″; spad 0,125″ z każdej strony (np. 400 stron na białym papierze daje grzbiet ok. 0,90″).
- **Przebudowa serii.** Gdy poprawka obejmuje kilka tomów (np. wyrównanie tików), przebuduj wszystkie dotknięte tomy jednym przebiegiem tego samego skryptu i podmień całe pakiety naraz, żeby w obiegu nie zostały pliki z różnych wersji źródła.
- Przed publikacją przeczytaj książkę raz w formie docelowej (papier, czytnik): błędy składu i rytmu widać dopiero tam.

## Pakiet wydawniczy

Komplet po wydaniu: plik do druku, EPUB, DOCX, źródło MD, **dziennik poprawek** (zbiorczy, [szablon](../assets/DZIENNIK_PRZEBIEGU.md)), **raport wydania** (pliki, parametry druku, kontrola, historia ocen, decyzje autora, sprawy do specjalisty, co zastąpiono) oraz **opis tomu dla innych modeli** ([przekazanie](przekazanie-miedzy-modelami.md)). Po każdej późniejszej poprawce zaktualizuj opis i dziennik albo oznacz je jako nieaktualne.

## Wersja do druku domowego (drukarka laserowa)

Gdy autor chce wydrukować książkę w domu, przygotuj osobny plik z **impozycją na arkuszach dwustronnych** i nie zmieniaj składu głównego. Dla składek po jednym arkuszu (każdy arkusz A4 poziomo złożony na pół daje cztery kolejne strony A5):

| Arkusz | Strona PDF 1 (awers): lewa / prawa połowa | Strona PDF 2 (rewers): lewa / prawa połowa |
|---|---|---|
| 1 | 2 / 3 | 4 / 1 |
| k | 4k−2 / 4k−1 | 4k / 4k−3 |

Po odwróceniu arkusza względem krótszej krawędzi strona 1 leży za 2, a 4 za 3; po złożeniu na pół kolejność jest 1, 2, 3, 4. Marginesy lustrzane składu (większy wewnętrzny) pasują do tego układu, bo nieparzyste strony są po prawej.

- Liczbę stron dopełnij pustymi do wielokrotności czterech.
- Wydruk dwustronny z obrotem względem **krótszej krawędzi** (arkusz poziomo); skala 100%, bez „dopasuj do strony”; strony zmniejszone do połowy A4 (przy formacie 5,5 × 8,5″ około 97%).
- Arkusze składaj na pół i układaj w kolejności wydruku, pierwszy na wierzchu; potem zszycie lub klejenie grzbietu (nie da się zszyć jednej zszywką przez środek, bo składki są po jednym arkuszu).
- Sprawdź impozycję na pierwszych dwóch arkuszach (podgląd), zanim wydrukujesz całość. Narzędzie: dowolna biblioteka PDF (np. `pypdf`): dla każdej składki dwie strony arkusza, każda z dwiema stronami źródła obok siebie.
