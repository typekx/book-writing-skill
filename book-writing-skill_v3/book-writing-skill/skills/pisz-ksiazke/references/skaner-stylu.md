# Skaner pomocniczy stylu

Opcjonalny skrypt wymaga Node.js 20 lub nowszego, bez dodatkowych bibliotek. Instrukcje literackie i szablony działają także bez Node.js. Narzędzie czyta wskazane pliki UTF-8 i wypisuje JSON; nigdy nie poprawia rękopisu i nie wykonuje połączeń sieciowych.

Uruchom z katalogu skilla, podając rzeczywiste ścieżki do prozy:

```sh
node scripts/audyt-stylu.mjs /sciezka/rozdzial.md
node scripts/audyt-stylu.mjs /sciezka/rozdzial_1.md /sciezka/rozdzial_2.md
node --test scripts/test-audyt-stylu.mjs
```

Raport można zapisać dostępnym narzędziem do pliku w katalogu kontroli. Nie przekierowuj wyjścia do pliku wejściowego. Nie podawaj jednocześnie całości tomu i jej osobnych jednostek; sztucznie zwielokrotni to powtórzenia. Ten sam fizyczny adres pliku podany dwa razy jest odrzucany.

## Co rzeczywiście mierzy

- Liczba słów: tokeny z liter i cyfr Unicode, z możliwością apostrofu lub łącznika wewnątrz. Nie jest to licznik wydawniczy projektu.
- Akapity: niepuste bloki oddzielone pustą lub pominiętą linią; podana mediana liczby tokenów.
- Jawne zwroty: sześć kategorii, z linią i krótkim kontekstem; odmiany wykrywane wyłącznie tam, gdzie wymieniono je w regule.
- Powtarzane frazy: dosłowne okna pięciu słów w obrębie akapitu, łącznie w podanym korpusie, co najmniej trzy wystąpienia. Wielkość liter pomijana, Unicode normalizowany. Nakładające się okna liczone osobno.

Pomijane są początkowy blok YAML, nagłówki z `#`, tabele rozpoczynające się `|`, separatory i ogrodzone bloki kodu. Daty, dialogi, cytaty i listy zostają w analizie. Nie jest to pełny parser Markdown. Tekst z przypisami, frontem książki lub spisem może zniekształcać wynik; wybierz odpowiedni zakres wejścia.

Raport pokazuje najwyżej 40 fraz i po sześć ich lokalizacji, ale liczy wszystkie wystąpienia i liczbę fraz spełniających próg. Zwroty rozbite końcem linii mogą pozostać niewykryte w kategoriach; pięciowyrazowe frazy przechodzą przez zwykłe złamanie linii, nie przez pusty akapit.

## Jak wykorzystać wynik

Porównuj podobne zakresy tekstu i typy scen. Otwórz wskazane miejsca, ustal funkcję zabiegu i sprawdź kumulację. Osobno przeczytaj semantyczne powtórzenia myśli: parafraza nie musi powtarzać ani jednego pięciowyrazowego ciągu.

Brak trafień nie potwierdza dobrego stylu. Wiele trafień może wynikać z celowej retoryki, cytatu lub motywu. Narzędzie nie mierzy immersji, nie ocenia autorstwa i nie wykrywa „AI”. Nie uruchamiaj go na biblii lub planie jako substytutu lektury prozy.
