# Pisz książkę v3 — kompletny warsztat książki i serii

Polskojęzyczna umiejętność do planowania, pisania, kontynuowania i redagowania książek. Szczególnie przydatna przy wielotomowych powieściach oraz projektach z wieloma wersjami plików.

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
| Skaner pomocniczy | Zwroty, powtarzane pięciowyrazowe frazy i lokalizacje do sprawdzenia; bez automatycznych poprawek. |

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
│   └── skaner-stylu.md
├── scripts/
│   ├── audyt-stylu.mjs
│   └── test-audyt-stylu.mjs
└── assets/
    ├── PROFIL_KSIAZKI.md
    ├── RAPORT_JEDNOSTKI.md
    ├── STAN_KONTYNUACJI.md
    └── szablon-projektu/           # opcjonalny warsztat nowej książki
```

## Użycie

Folderem instalowalnej umiejętności jest `skills/pisz-ksiazke`, a nie katalog główny repozytorium. W środowisku Codex skopiuj cały ten folder do własnego katalogu umiejętności (`$CODEX_HOME/skills`, domyślnie `~/.codex/skills`). Umiejętność pozostawia standardowy tryb automatycznego doboru; można też wywołać ją jawnie jako `$pisz-ksiazke`.

Przykłady poleceń:

- „Użyj $pisz-ksiazke. Na podstawie tych materiałów wybierz aktualny rękopis i przygotuj profil książki.”
- „Użyj $pisz-ksiazke. Zaplanuj powieść obyczajową dla dorosłych, z narracją pierwszoosobową. Na razie tylko plan.”
- „Użyj $pisz-ksiazke. Napisz następną jednostkę zgodnie ze stanem projektu i zatrzymaj się po raporcie.”
- „Użyj $pisz-ksiazke. Zredaguj ten rozdział językowo, zachowując fabułę i głos narratora.”
- „Użyj $pisz-ksiazke. Sprawdź chronologię i wiedzę postaci w całym module, podając sceny i proponowane poprawki.”
- „Użyj $pisz-ksiazke. Przygotuj repozytorium nowej powieści z kartami postaci, osią czasu i rejestrem researchu.”
- „Użyj $pisz-ksiazke. Od początku planujemy serię pięciu tomów. Przygotuj architekturę całości, łuki i matrycę ujawnień, zanim zaczniemy pisać.”
- „Użyj $pisz-ksiazke. Z tych fragmentów opracuj profil mojego stylu. Następnie zredaguj wskazany rozdział, zachowując głos i sprawdzając immersję.”
- „Użyj $pisz-ksiazke. Usuń zbędne po pierwsze/po drugie i powtarzane tłumaczenia myśli. Zachowaj istotny monolog i uzasadnione wyliczenia w dialogach.”
- „Użyj $pisz-ksiazke. Sprawdź, na które wcześniejsze zasiewy i przyszłe rozwiązania wpłynie ta zmiana faktu.”

W środowisku bez obsługi skills można przekazać `SKILL.md` oraz wskazane w nim dokumenty pomocnicze jako instrukcję pracy. Sama nazwa `$pisz-ksiazke` nie przesyła tych plików do innej aplikacji.

## Zasady

Domyślnie pisana jest jedna jednostka. Wyraźne zamówienie szerszego zakresu ma pierwszeństwo. Proza, raport i stan są osobnymi materiałami. Parametry stylu, objętości i narracji należą do projektu; skill nie narzuca wszystkim książkom zasad jednego autora.

Ukończenie rękopisu jest rozpoznawane na podstawie tekstu i aktualnego stanu, nawet jeśli starszy README nakazuje zaczynać od prologu. Plany nie są dowodem, że zdarzenie zostało napisane. Kontrola automatyczna nie zastępuje lektury.

## Szablon repozytorium książki

[Szablon projektu](skills/pisz-ksiazke/assets/szablon-projektu/README.md) zawiera siedem obszarów: zasady i styl, postaci, świat i research, rękopis, eksporty, kontrolę oraz architekturę serii. Służy do skopiowania do osobnego projektu książki; nie wymaga przenoszenia istniejącego rękopisu do nowej struktury.

Karty postaci oddzielają stan wykonany od planu rozwoju. Rejestry obejmują asymetryczne relacje, chronologię wydarzeń i ujawnień, lokacje, źródła researchu oraz drogę dokumentów i rekwizytów. Spis tomu określa kolejność łączenia jednostek. Rejestr eksportów łączy plik wydania z wersją jego źródeł.

Eksport przez GitHub Actions jest opisany jako opcjonalne rozszerzenie. Pakiet nie zawiera uruchamialnego workflow ani skonfigurowanych narzędzi konwersji.

## Kolejność pracy

W nowej serii: ustalenia autora → architektura całej serii → profil stylu → karty tomów i zasiewy → szczegółowy plan najbliższego tomu → jednostka z raportem → audyt modułu → audyt tomu i aktualizacja przyszłych zależności.

W istniejącej serii: wybór aktualnego rękopisu → odtworzenie faktów wykonanych → profil stylu → praca w zamówionym zakresie → kontrola wpływu zmian. Ta kolejność nie zamienia prośby o analizę w zgodę na pisanie nowych scen.

## Skaner opcjonalny

Instrukcje i szablony nie wymagają instalowania bibliotek. Pomocniczy skrypt wymaga Node.js 20 lub nowszego. Z folderu `skills/pisz-ksiazke`:

```sh
node scripts/audyt-stylu.mjs /sciezka/rozdzial.md
node --test scripts/test-audyt-stylu.mjs
```

Wynikiem jest JSON z numerami linii. Narzędzie nie zapisuje plików, nie łączy się z siecią i nie oblicza „procentu AI”. Przeczytaj [opis metody i ograniczeń](skills/pisz-ksiazke/references/skaner-stylu.md). Powtarzane znaczenia wymagają lektury; licznik nie rozpoznaje ich wszystkich.

## Najważniejsze szablony

- [Profil stylu](skills/pisz-ksiazke/assets/szablon-projektu/01_Zasady_Projektu/PROFIL_STYLU.md).
- [Architektura serii](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/ARCHITEKTURA_SERII.md).
- [Karta tomu](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/KARTA_TOMU.md).
- [Zasiewy i ujawnienia](skills/pisz-ksiazke/assets/szablon-projektu/07_Architektura_Serii/ZASIEWY_I_UJAWNIENIA.md).
- [Audyt stylu i immersji](skills/pisz-ksiazke/assets/szablon-projektu/06_Kontrola/AUDYT_STYLU_I_IMMERSJI.md).
- [Walidacja i wpływ zmian](skills/pisz-ksiazke/assets/szablon-projektu/06_Kontrola/WALIDACJA_I_WPLYW_ZMIAN.md).

## Zakres pakietu

Repozytorium zawiera instrukcje, puste szablony oraz skaner z testami. Rękopisy, prywatna dokumentacja, profile konkretnych książek i dane kont pozostają w projektach autora. Skill nie potrzebuje połączenia z GitHubem ani zewnętrznej aplikacji do pisania lokalnych plików.

Nie stosuje uniwersalnego zakazu refleksji, metafor czy wyliczeń. Odróżnia celowy styl od nadmiaru. Walidacja struktury skilla i testy skanera nie są dowodem doskonałości literackiej ani gwarancją pełnej ciągłości książki.

Umieszczenie tego pakietu w repozytorium nie obejmuje udzielenia licencji do książek autora. Pakiet nie dołącza deklaracji licencyjnej; wybór licencji repozytorium pozostaje po stronie jego właściciela.
