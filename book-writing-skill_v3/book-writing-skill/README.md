# Pisz książkę v3.5 — kompletny warsztat książki i serii

Polskojęzyczna umiejętność do planowania, pisania, kontynuowania i redagowania książek. Szczególnie przydatna przy wielotomowych powieściach oraz projektach z wieloma wersjami plików.

Historia zmian: [CHANGELOG.md](CHANGELOG.md).

Wersja 3.5 dodaje wnioski z redakcji wielotomowej serii: komendy `tiki` (zdania z kontekstem i numerem wystąpienia) i `gestosc` (częstość na 10 tys. słów w kilku tomach), zamiany wskazanego wystąpienia w `zamien`, reguły przerzedzania tików bez naruszania dialogu i z kontrolą mówcy, listę pułapek kalendarzowych do skanu spójności oraz zasady strony praw autorskich z zastrzeżeniem eksploracji tekstów i danych.

Wersja 3.4 dodaje wnioski z redakcji ukończonego, wielotomowego tomu: przebiegi tematyczne na całości książki (nigdy na kawałkach), skan spójności K1–K6, weryfikację opinii innych modeli i pewności ustaleń, narzędzie `zamien` z kopią i kontrolą artefaktów, wskazówki do składu, wydania i druku domowego oraz sześć nowych scenariuszy testowych.

Wersja 3.3 dodaje tryb lekki dla opowiadań i krótkich form, krótszy `SKILL.md`, scenariusze testowe zachowania skilla oraz licencję.

Wersja 3.2 wprowadza jednowyrazowe komendy po polsku i angielsku (na czacie i w terminalu).

Wersja 3.1 dodaje zabezpieczenia typowe dla długich projektów pisanych z udziałem modeli: bezpieczniki przed cichym skracaniem rękopisu i fałszywym „final”, pracę modułową z akceptacją autora, przekazanie pracy innemu modelowi, test kolizji nazw i konfigurowalną kontrolę techniczną jednostki.

Wersja 3 łączy projektowanie całej serii przed tomem pierwszym, analizę i zachowanie stylu autora, redakcję immersji i schematycznych manier, kontrolę kanonu oraz powtarzalny stan pracy. Zawiera wszystkie elementy wcześniejszych wersji, a nie tylko dodatek. Instrukcje są niezależne od konkretnego modelu; folder `agents/` zawiera metadane interfejsu Codex.

## Główne możliwości

| Obszar | Wynik pracy |
|---|---|
| Seria od początku | Architektura wszystkich tomów, łuki, finał, lokalne domknięcia, zasiewy i zależności. |
| Styl autora | Profil oparty na fragmentach, warianty głosu i kontrola dryfu po redakcji. |
| Immersja | Analiza orientacji, sprawczości, przyczynowości, napięcia, podtekstu i następstw. |
| Schematyczna proza | Ograniczanie redundantnych myśli, wyliczeń, mechanicznych kontrastów i sztucznych puent z zachowaniem celowych zabiegów. |
| Ciągłość | Wiedza postaci i czytelnika, chronologia, dokumenty, relacje oraz wpływ zmian między tomami. |
| Warsztat | Szablon projektu, karty postaci, research, raporty, stan i eksporty. |
| Praca modułowa | Karta jednostki, cykl modułu, statusy akceptacji, pętla korekcyjna części, długość z zapasem. |
| Przekazanie | Pakiet dla innego modelu lub aplikacji: instrukcja stała, pliki według ważności, gotowe polecenia, przyjęcie tekstu z powrotem. |
| Nazwy | Katalog nazw z odmianą, test kolizji z realnymi podmiotami, zmiana nazwy w całej serii. |
| Skaner pomocniczy | Zwroty, powtarzane pięciowyrazowe frazy i lokalizacje do sprawdzenia; bez automatycznych poprawek. |
| Kontrola techniczna | Dni tygodnia, typografia, pozostałości robocze, limity projektu na jednostkę i na tom, wycofane nazwy, duplikaty i spadek objętości względem poprzedniej wersji. |
| Granice treści | Szablon rejestru przemocy, klas obrażeń, bliskości i zakazanych zestawień. |

## Zawartość repozytorium

```text
skills/pisz-ksiazke/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── zrodla-i-ciaglosc.md
│   ├── warsztat-i-kontrola.md
│   ├── repozytorium-ksiazki.md
│   ├── projektowanie-serii.md
│   ├── analiza-i-zachowanie-stylu.md
│   ├── immersja.md
│   ├── redakcja-schematycznej-prozy.md
│   ├── walidacja-serii.md
│   ├── praca-modulowa.md
│   ├── przekazanie-miedzy-modelami.md
│   ├── nazwy-i-kolizje.md
│   ├── kontrola-techniczna.md
│   ├── komendy.md
│   ├── tryb-lekki.md
│   ├── redakcja-calosci.md
│   ├── skan-spojnosci.md
│   ├── weryfikacja-opinii.md
│   ├── wydanie-i-sklad.md
│   └── skaner-stylu.md
├── scripts/
│   ├── ks.mjs                  # jedna komenda do narzędzi
│   ├── audyt-stylu.mjs
│   ├── kontrola-jednostki.mjs
│   ├── zamien.mjs              # zamiany stary → nowy z kopią
│   ├── test-zamien.mjs
│   ├── test-audyt-stylu.mjs
│   ├── test-kontrola-jednostki.mjs
│   ├── test-ks.mjs
│   └── test-skill.mjs          # spójność samego skilla
├── evals/
│   ├── scenariusze.json        # 18 scenariuszy zachowania
│   └── README.md
└── assets/
    ├── PROFIL_KSIAZKI.md
    ├── KARTA_JEDNOSTKI.md
    ├── RAPORT_JEDNOSTKI.md
    ├── STAN_KONTYNUACJI.md
    ├── DZIENNIK_PRZEBIEGU.md
    ├── ZADANIE_PRZEBIEGU.md
    ├── PAKIET_PRZEKAZANIA.md
    └── szablon-projektu/           # opcjonalny warsztat nowej książki
```

## Użycie

Folderem instalowalnej umiejętności jest `skills/pisz-ksiazke`, a nie katalog główny repozytorium. W środowisku Codex skopiuj cały ten folder do własnego katalogu umiejętności (`$CODEX_HOME/skills`, domyślnie `~/.codex/skills`). Umiejętność pozostawia standardowy tryb automatycznego doboru; można też wywołać ją jawnie jako `$pisz-ksiazke`.

Komendy (pierwsze słowo wiadomości, po polsku lub angielsku, polskie znaki opcjonalne):

| PL | EN | Działanie |
|---|---|---|
| `pomoc` | `help` | lista komend |
| `stan` | `status` | stan i następny krok |
| `źródła` | `sources` | wybór aktualnych wersji plików |
| `seria` | `series` | architektura serii |
| `plan` | `plan` | plan książki lub tomu |
| `karty` | `cards` | karty jednostek |
| `pisz` | `write` | jedna jednostka z kontrolą i raportem |
| `dalej` | `next` | następna jednostka ze stanu |
| `popraw` | `fix` | poprawki według uwag |
| `redaguj` | `edit` | redakcja bez zmiany fabuły |
| `korekta` | `proof` | pisownia i typografia |
| `przebieg` | `pass` | przebieg tematyczny na całym tomie |
| `skan` | `scan` | skan spójności całego tomu |
| `weryfikuj` | `verify` | sprawdzenie opinii zewnętrznej i pewności ustaleń |
| `styl` | `style` | profil stylu, maniery |
| `immersja` | `immersion` | analiza immersji |
| `sprawdź` | `check` | kontrola techniczna |
| `audyt` | `audit` | audyt kanonu i ciągłości |
| `porównaj` | `diff` | porównanie wersji |
| `wpływ` | `impact` | skutki zmiany faktu |
| `nazwy` | `names` | nazwy i kolizje |
| `decyzje` | `decisions` | otwarte decyzje |
| `przekaż` | `handoff` | pakiet dla innego modelu |
| `wydanie` | `export` | skład i wydanie |
| `projekt` | `setup` | szablon repozytorium |
| `lekki` | `light` | tryb lekki (opowiadania, krótkie formy) |
| `pełny` | `full` | tryb pełny (powieść modułami, seria) |

Przykłady: `$pisz-ksiazke stan`, `dalej`, `pisz R5`, `write chapter 5`, `audit część II`, `porównaj v15 v16`, `przekaż tom IV`. Pełne zdania nadal działają. Szczegóły: [komendy](skills/pisz-ksiazke/references/komendy.md).

W środowisku bez obsługi skills można przekazać `SKILL.md` oraz wskazane w nim dokumenty pomocnicze jako instrukcję pracy. Sama nazwa `$pisz-ksiazke` nie przesyła tych plików do innej aplikacji.

## Zasady

Domyślnie pisana jest jedna jednostka. Wyraźne zamówienie szerszego zakresu ma pierwszeństwo. Proza, raport i stan są osobnymi materiałami. Parametry stylu, objętości i narracji należą do projektu; skill nie narzuca wszystkim książkom zasad jednego autora.

Zmiana istniejącej jednostki jest porównywana z poprzednią wersją pod względem objętości i nagłówków; „final” bez pomiaru nie jest ukończeniem. Ukończenie rękopisu jest rozpoznawane na podstawie tekstu i aktualnego stanu, nawet jeśli starszy README nakazuje zaczynać od prologu. Plany nie są dowodem, że zdarzenie zostało napisane. Kontrola automatyczna nie zastępuje lektury.

## Szablon repozytorium książki

[Szablon projektu](skills/pisz-ksiazke/assets/szablon-projektu/README.md) zawiera siedem obszarów: zasady i styl, postaci, świat i research, rękopis, eksporty, kontrolę oraz architekturę serii. Służy do skopiowania do osobnego projektu książki; nie wymaga przenoszenia istniejącego rękopisu do nowej struktury.

Karty postaci oddzielają stan wykonany od planu rozwoju. Rejestry obejmują asymetryczne relacje, chronologię wydarzeń i ujawnień, lokacje, źródła researchu oraz drogę dokumentów i rekwizytów. Spis tomu określa kolejność łączenia jednostek. Rejestr eksportów łączy plik wydania z wersją jego źródeł.

Eksport przez GitHub Actions jest opisany jako opcjonalne rozszerzenie. Pakiet nie zawiera uruchamialnego workflow ani skonfigurowanych narzędzi konwersji.

## Kolejność pracy

W nowej serii: ustalenia autora → architektura całej serii → profil stylu i reguły kontroli → karty tomów i zasiewy → karty jednostek najbliższego tomu → jednostka z kontrolą i raportem → akceptacja autora → pętla korekcyjna części → audyt tomu, stan po tomie i aktualizacja przyszłych zależności.

W istniejącej serii: wybór aktualnego rękopisu → odtworzenie faktów wykonanych → profil stylu → praca w zamówionym zakresie → kontrola wpływu zmian. Ta kolejność nie zamienia prośby o analizę w zgodę na pisanie nowych scen.

## Narzędzia opcjonalne

Instrukcje i szablony nie wymagają instalowania bibliotek. Pomocniczy skrypt wymaga Node.js 20 lub nowszego. Z folderu `skills/pisz-ksiazke`:

```sh
node scripts/ks.mjs sprawdz rozdzial.md          # check
node scripts/ks.mjs tom tom/*.md                 # volume
node scripts/ks.mjs porownaj stara.md nowa.md    # diff
node scripts/ks.mjs styl rozdzial.md             # style
node scripts/ks.mjs zamien tom.md pary.json --zapisz --kopia przed.md   # patch
node scripts/ks.mjs pomoc                        # help
node --test scripts/
```

Wynikiem jest JSON z numerami linii. Kontrola jednostki zwraca kod 1, gdy znajdzie błędy, i nigdy nie nadpisuje pliku wejściowego ([opis](skills/pisz-ksiazke/references/kontrola-techniczna.md)). Narzędzie nie zapisuje plików, nie łączy się z siecią i nie oblicza „procentu AI”. Przeczytaj [opis metody i ograniczeń](skills/pisz-ksiazke/references/skaner-stylu.md). Powtarzane znaczenia wymagają lektury; licznik nie rozpoznaje ich wszystkich.

## Najważniejsze szablony

- [Profil stylu](skills/pisz-ksiazke/assets/szablon-projektu/01_Zasady_Projektu/PROFIL_STYLU.md).
- [Karta jednostki](skills/pisz-ksiazke/assets/KARTA_JEDNOSTKI.md).
- [Pakiet przekazania](skills/pisz-ksiazke/assets/PAKIET_PRZEKAZANIA.md).
- [Reguły kontroli — wzór](skills/pisz-ksiazke/assets/szablon-projektu/01_Zasady_Projektu/reguly_kontroli.przyklad.json).
- [Katalog nazw](skills/pisz-ksiazke/assets/szablon-projektu/03_Lore_i_Notatki/katalog_nazw.md).
- [Architektura serii](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/ARCHITEKTURA_SERII.md).
- [Karta tomu](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/KARTA_TOMU.md).
- [Zasiewy i ujawnienia](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/ZASIEWY_I_UJAWNIENIA.md).
- [Audyt stylu i immersji](skills/pisz-ksiazke/assets/szablon-projektu/06_Kontrola/AUDYT_STYLU_I_IMMERSJI.md).
- [Walidacja i wpływ zmian](skills/pisz-ksiazke/assets/szablon-projektu/06_Kontrola/WALIDACJA_I_WPLYW_ZMIAN.md).

## Zakres pakietu

Repozytorium zawiera instrukcje, puste szablony oraz skaner z testami. Rękopisy, prywatna dokumentacja, profile konkretnych książek i dane kont pozostają w projektach autora. Skill nie potrzebuje połączenia z GitHubem ani zewnętrznej aplikacji do pisania lokalnych plików.

Nie stosuje uniwersalnego zakazu refleksji, metafor czy wyliczeń. Odróżnia celowy styl od nadmiaru. Walidacja struktury skilla i testy skanera nie są dowodem doskonałości literackiej ani gwarancją pełnej ciągłości książki.

## Licencja

Skill jest udostępniony na licencji [PolyForm Noncommercial 1.0.0](LICENSE.md): bezpłatnie do użytku niekomercyjnego. **Użycie komercyjne wymaga płatnej licencji** — szczegóły w [COMMERCIAL.md](COMMERCIAL.md), kontakt: bartosz.login@gmail.com. Licencja skilla nie obejmuje książek pisanych z jego pomocą; te należą do ich autorów.
