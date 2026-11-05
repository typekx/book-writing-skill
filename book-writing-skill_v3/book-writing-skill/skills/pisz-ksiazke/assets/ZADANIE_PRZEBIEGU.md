# Zadanie przebiegu (wzór instrukcji dla agenta)

Skopiuj do `przebieg/INSTRUKCJA.md` i uzupełnij pola w nawiasach. Agent dostaje tę instrukcję i temat przebiegu.

**Plik tomu (jedyny, edytowany):** [ścieżka]. **Katalog przebiegu:** `przebieg/<id>/`.

## Zasada naczelna

Tekstu NIE wolno dzielić na części ani zakresy linii. Czytasz CAŁĄ książkę, od pierwszej do ostatniej linii, i analizujesz ją wyłącznie pod kątem SWOJEGO TEMATU: [temat]. Przebiegi wykonywane są jeden po drugim, więc widzisz tekst poprawiony przez poprzednie i nie cofasz ich poprawek bez przyczyny.

## Procedura

1. Przeczytaj cały tom w kolejności (po ~300–700 linii: to technika czytania). Zbieraj wystąpienia tematu, poprawiaj w trakcie lektury.
2. Dla każdego defektu: (a) zaproponuj poprawkę; (b) zastosuj ją: `node scripts/ks.mjs zamien <plik> <pary.json> --zapisz --kopia <migawka>` (stary fragment dokładnie raz); (c) przeczytaj zmieniony akapit z sąsiednimi: rytm, zaimki, kolejność informacji, nowe powtórzenia, czy kwestia nadal odpowiada na poprzednią, zapis dialogu po scaleniach; (d) jeśli gorzej, popraw drugi raz. Dopiero potem następny defekt.
3. Przed usunięciem lub mocną zmianą wyrazistego zdania sprawdź, czy rdzeń (≥4 słowa) nie jest cytowany w innych tomach: [lista fraz chronionych].
4. Pary zapisuj partiami (10–20) do `pNN.json`; w `postep.md` zapisuj „doszedłem do …”. Wznowienie: czytaj `postep.md` i dziennik, nie powtarzaj poprawek.
5. Dziennik ([szablon](DZIENNIK_PRZEBIEGU.md)) po każdej partii.

## Twarde ograniczenia

- Nie zmieniaj nagłówków, kolejności scen, faktów, dat, kwot, nazw i tego, kto co wie, chyba że naprawiasz błąd. Nie dopisuj nowych wątków (najwyżej 1–2 zdania łatające dziurę).
- Stan wejścia do następnego tomu: [lista].
- Konwencje autora: [dwukropek przed cytatem, półpauza w dialogu, cudzysłowy, twarde spacje, znak zmiany sceny, zapis notatek i SMS].
- Najlepsze partie (prolog, interludia, epilog): poprawiaj tylko błędy faktów, języka i szwów, nie styl.
- Bilans słów: neutralny lub ujemny, chyba że zadanie mówi inaczej.

## Kontrole końcowe

1. `node scripts/ks.mjs sprawdz <plik>`: 0 błędów.
2. Przeszukanie artefaktów: podwójne spacje, przecinek przed kropką, prosty cudzysłów, strzałki, pozostałości robocze.
3. Ponowne przeczytanie ~15 losowo wybranych zmian w kontekście.
4. Wskaźniki przed/po właściwe dla tematu.
5. Raport w `przebieg/<id>/raport.md`: zmiany per kategoria, wskaźniki, odrzucone zarzuty z powodem, sprawy do decyzji autora i dla innych przebiegów.

Odpowiedz krótko: liczba zmian, bilans słów, wskaźniki, sprawy dla kolejnych przebiegów.
