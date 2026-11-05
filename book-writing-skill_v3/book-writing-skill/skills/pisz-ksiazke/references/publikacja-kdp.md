# Publikacja w Amazon KDP (druk na żądanie)

Czytaj, gdy autor publikuje książkę w KDP albo prosi o prowadzenie krok po kroku. Kliknięcia wykonuje autor. Ty podajesz kolejne pola, sprawdzasz jego zrzuty ekranu i przygotowujesz pliki. Przycisk publikacji to decyzja autora. Interfejs KDP się zmienia, więc każdy krok weryfikuj na zrzucie, a nie z pamięci.

## Przed rozpoczęciem

- **Polski w KDP:** tylko książka drukowana (paperback lub hardcover). E-booków po polsku KDP nie przyjmuje.
- **Seria:** funkcja serii nie działa dla języka polskiego, więc nazwę serii i numer tomu wpisz w podtytule. Na stronie produktu wyjdzie wtedy np. „Pierwsze światło: Port. Tom I”.
- **ISBN:**
  - Własny ISBN (w Polsce z Biblioteki Narodowej, system e-ISBN) ma pierwszeństwo przed darmowym numerem KDP. Każdy format dostaje osobny numer.
  - Nazwa wydawcy w KDP musi się zgadzać z wydawcą, na którego zarejestrowano numer (imprint w e-ISBN).
  - W e-ISBN publikację oznacz jako książkę, nie kolekcję, i zgłoś zapowiedź wydawniczą.
- **Klasyfikacja i słowa kluczowe** to decyzja autora. Zaproponuj warianty.

## Pliki: zgodność z ustawieniami

| Pole KDP | Pułapka | Co zrobić |
|---|---|---|
| Ink and paper | kremowy i biały mają inny grzbiet | Kremowy jest standardem w beletrystyce (ciepły, mniej męczy wzrok), biały w książkach z ilustracjami. Koszt druku jest ten sam. Po zmianie papieru przebuduj okładkę. |
| Trim size | domyślne bywa 6 × 9″ | Wybierz format zgodny z PDF środka; inny rozmiar oznacza odrzucenie obu plików. |
| Bleed | spad tylko w środku z grafiką do krawędzi | Przy samym tekście: No Bleed. Okładka ma spad zawsze. |
| Cover finish | brak | Matowe wykończenie pasuje do ciemnych, nastrojowych okładek, błyszczące do jaskrawych. |

**Okładka (jeden PDF: tył, grzbiet, przód):**
- Szerokość = 2 × szerokość strony + grzbiet + 2 × 0,125″, wysokość = wysokość strony + 0,25″.
- Grzbiet = liczba stron × przelicznik (biały 0,002252″, kremowy 0,0025″). Tekst na grzbiecie dopiero od 79 stron.
- **Kod kreskowy zostaw Amazonowi.** Własny kod kreskowy (nawet poprawny wektor z PDF z e-ISBN) podgląd KDP odrzucił błędem „unable to detect a valid barcode”. Na tylnej okładce zostaw pustą strefę 2 × 1,2″ w prawym dolnym rogu, 0,25″ od linii cięcia, i nie stawiaj tam tekstu. W KDP odznacz pole „my cover has a barcode”, a Amazon wstawi kod z numerem ISBN.
- Przednia grafika powinna mieć 300 DPI przy wymiarze ze spadem (dla 5,5 × 8,5″ ok. 1690 × 2700 px). Obrazy wklejone do czatu bywają zmniejszane. Oryginał poproś jako plik albo archiwum ZIP.

## Podgląd (Print Previewer)

- **Error** blokuje publikację i trzeba go poprawić.
- **Review** jest informacją. „We've removed non-printable markup” na stronach spisu treści oznacza usunięte odnośniki PDF. Obejrzyj te strony i jeśli tekst jest cały, uznaj sprawę za zamkniętą.
- Dymek „All text must be completely inside the guides” to podpowiedź po najechaniu myszą, nie błąd.
- Obejrzyj okładkę z liniami pomocniczymi, stronę tytułową, redakcyjną, spis treści, początek rozdziału i ostatnią stronę. Potem zatwierdź (Approve).
- Po każdej podmianie pliku KDP wymaga ponownego potwierdzenia odpowiedzi o AI i ponownego zatwierdzenia podglądu.
- Gdy podgląd po poprawce pokazuje ten sam błąd, sprawdź na zrzucie, czy wgrano nowy plik (np. czy kod kreskowy zniknął).

## Ujawnienie AI

KDP pyta, czy treść jest generowana przez AI. Pytanie dotyczy osobno tekstu, obrazów i tłumaczenia, z zakresem i stopniem edycji. Treść wspomagana przez AI (redakcja, korekta, skład tekstu napisanego przez autora) nie wymaga zgłoszenia. Wyjaśnij autorowi różnicę i opcje, ale wyboru nie dokonuj za niego, bo tylko on wie, jak powstał tekst i okładka. Odpowiedzi nie są publiczne. Zatajenie grozi problemem z kontem.

## Ceny i tantiemy

- Na rynkach UE i w Polsce wpisujesz cenę **bez VAT**. KDP dolicza VAT (w Polsce na książki 5%). Dla ceny końcowej 49,99 zł wpisz 47,61 zł.
- Tantiemy wynoszą 60% ceny netto minus koszt druku, gdy cena przekracza próg rynku, a 50% poniżej progu. Koszt druku KDP podaje po wgraniu środka. Dla około 300 stron na kremowym papierze to kilkanaście–dwadzieścia kilka złotych za egzemplarz.
- Ceny na innych rynkach wpisz ręcznie jako zaokrąglone kwoty lokalne. Przelicznik kursowy daje nieokrągłe ceny. Strefa euro to kilka osobnych pól.
- **Expanded Distribution** daje 40% tantiem i trafia do zagranicznych księgarń, a polskiej powieści raczej nie pomaga, więc domyślnie zostaw je wyłączone.
- Territories: przy pełnych prawach autora zaznacz cały świat.

## Egzemplarz próbny i publikacja

- Proof drukuje się z bieżącego szkicu. Ma pasek „Not for Resale” i nie ma numeru ISBN. Płatność obejmuje druk i wysyłkę. Link do zamówienia przychodzi e-mailem w ciągu 4 godzin i trzeba go opłacić w ciągu 24 godzin.
- **Sprawdź na zrzucie liczbę sztuk i sumę** przed potwierdzeniem. Pole ilości łatwo zostawić na 5.
- Poleć Save as Draft do czasu obejrzenia wydruku, ale nie naciskaj. Po publikacji książka przechodzi weryfikację (do 72 godzin) i w tym czasie nie da się jej zmieniać.
- Po wysłaniu do publikacji zapisz w stanie projektu wszystkie ustawienia (format, papier, wykończenie, ceny, plik okładki, rozwiązane błędy), żeby kolejne tomy przejść bez powtarzania pomyłek.

## Problemy poza plikami

Błąd otwierania PDF w przeglądarce autora (np. komunikat o brakującej bibliotece systemowej) najpierw sprawdź po swojej stronie (`pdfinfo`, `qpdf --check`). Jeśli plik jest poprawny, wskaż przyczynę u autora (np. naprawa pakietów Visual C++ w Windows). Nie przebudowuj plików bez potrzeby.
