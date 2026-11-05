# Sesja uwag autora (strona po stronie)

Czytaj, gdy autor czyta złożony tom i podaje uwagi do kolejnych stron PDF, albo gdy oddaje własną poprawioną wersję tekstu do weryfikacji.

## Zbieranie uwag

1. **Adres uwagi to strona PDF, który czyta autor, i akapit na tej stronie.**
   - Akapit 1 to pierwszy akapit, który *zaczyna się* na tej stronie. Końcówkę przeniesioną z poprzedniej strony pomijasz.
   - Przy wątpliwości pokaż obu kandydatów.
   - Tekst strony wyciągniesz poleceniem `pdftotext -layout -f N -l N plik.pdf -`. W źródle szukaj po normalizacji twardych spacji.
2. **Zacytuj fragment ze źródła MD,** nie z PDF. Przenosy i twarde spacje w PDF utrudniają dopasowanie.
3. **Gdy autor prosi o ocenę:** sprawdź sens i poprawność językową, podaj 2–3 warianty z rekomendacją. **Gdy podaje gotowe brzmienie:** zapisz je 1:1, ale wskaż błąd językowy, jeśli jest, i daj wybór.
4. **Sprawdź skutki w tomie i serii:**
   - powtórzenia w sąsiedztwie;
   - kto mówi;
   - odwołania (usunięcie przedmiotu ze sceny może osierocić porównanie kilka rozdziałów dalej);
   - dosłowne echa między tomami.
5. **Nie twierdź, że coś nie jest motywem, zanim tego nie wyszukasz** we wszystkich tomach. Pomyłkę w tej sprawie przyznaj wprost.
6. **Każdą decyzję zapisz od razu** jako:
   - parę „stary → nowy” w pliku par (`ks zamien`, wpis może mieć `wystapienie`);
   - wiersz w rejestrze uwag z kolejnym numerem.

   Uruchom próbę bez zapisu i podaj numer uwagi oraz wynik.
7. **Nie nanoś zmian na tekst, dopóki autor nie zamknie sesji** (np. „koniec feedbacku”). Wtedy naniesienie hurtowe obejmuje:
   - `zamien --zapisz --kopia`;
   - `sprawdz`;
   - lekturę zmienionych akapitów w kontekście;
   - dziennik;
   - budowę wydania, jeśli autor ją zleci.
8. **Zapisuj stan co kilkanaście uwag i na prośbę autora:** liczba uwag, ostatnia strona, pliki, konwencje, plan zamknięcia. Sesja może się przerwać albo przejść do innego modelu ([przekazanie](przekazanie-miedzy-modelami.md)).

Uwagi do dalszych tomów, zgłoszone przy okazji, odłóż do osobnego pliku tego tomu. Nanieś je przy jego edycji.

## Poprawiona wersja od autora

Gdy autor oddaje plik, który sam poprawił:

1. Porównaj go z ostatnią wersją (`ks porownaj`) i sporządź listę „było → jest” do wglądu.
2. Sprawdź każdą zmianę jak opinię zewnętrzną ([weryfikacja opinii](weryfikacja-opinii.md)): poprawność językową, typografię autora, skutki w tomie i serii.
3. Zastrzeżenia podaj jako propozycje. Plik autora jest nowym źródłem, a stare źródło zachowaj jako kopię.
4. Twoja wcześniejsza poprawka, która zepsuła echo lub motyw, wraca do brzmienia autora. Odnotuj to w dzienniku tomu, którego dotyczy.
