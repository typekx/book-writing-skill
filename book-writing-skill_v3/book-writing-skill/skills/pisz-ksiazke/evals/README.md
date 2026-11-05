# Testy zachowania skilla

Dwa rodzaje sprawdzeń:

1. **Spójność skilla** — automatycznie, bez modelu: `node --test scripts/` uruchamia także `test-skill.mjs`. Sprawdza, że `SKILL.md` ma nagłówek z nazwą, opisem i wersją, mieści się w limicie słów, że wszystkie odnośniki w plikach Markdown prowadzą do istniejących plików, że każda komenda z tabeli w `references/komendy.md` jest wymieniona w `SKILL.md`, a scenariusze w `evals/scenariusze.json` mają poprawny format.
2. **Zachowanie modelu** — [scenariusze.json](scenariusze.json): dwadzieścia dwie sytuacje z poleceniem, stanem wyjściowym oraz listą zachowań wymaganych i zakazanych (ciche skracanie, „final” bez pomiaru, `dalej` po ukończonej książce, sprawdzanie faktów w kanonie, przeciek wiedzy, otwarta decyzja, jedna jednostka, komenda w środku zdania, audyt bez poprawek, tryb lekki, „procent AI”, tekst z innego modelu, redakcja na całości zamiast kawałków, pętla poprawki, weryfikacja opinii innego modelu, hipoteza jako fakt, ocena bez obietnic, budowa wydania, strona praw autorskich, publikacja KDP, sesja uwag autora).

## Jak uruchomić scenariusze

Ręcznie: w nowej sesji z zainstalowanym skillem opisz sytuację, wyślij polecenie i porównaj odpowiedź z listami. Scenariusz jest zaliczony, gdy spełnia wszystkie wymagania i nie narusza żadnego zakazu.

Półautomatycznie: przekaż scenariusze narzędziu do ewaluacji skilli (np. skill-creator w Claude Code) albo drugiemu modelowi jako oceniającemu, z poleceniem oceny każdej pozycji osobno (spełnione / niespełnione / nie dotyczy, z cytatem z odpowiedzi).

Zapisuj wynik z datą, wersją skilla i modelem. Po zmianie `SKILL.md` powtórz przynajmniej scenariusze B01–B07 i B13–B15.
