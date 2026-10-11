# Projekt książki — szablon organizacji

Ten katalog jest szablonem do skopiowania do osobnego projektu książki. Uzupełnij go ustaleniami autora i zachowaj tylko potrzebne rejestry. Nie zawiera napisanej prozy ani uruchomionej automatyzacji.

| Folder | Punkt wejścia | Co przechowuje |
|---|---|---|
| Zasady | [Zasady projektu](01_Zasady_Projektu/README.md) | Źródła, struktura, długość i styl. |
| Postaci | [Indeks postaci](02_Bohaterowie/glowni_bohaterowie.md) | Karty, łuki rozwoju i relacje. |
| Świat i notatki | [Oś czasu](03_Lore_i_Notatki/os_czasu.md) | Chronologię, lokacje, research i rekwizyty. |
| Rękopis | [Zasady rękopisu](04_Manuskrypt/README.md) | Tomy i kolejność jednostek. |
| Eksporty | [Rejestr eksportów](05_Eksporty/README.md) | Wydania oraz wersje ich źródeł. |
| Kontrola | [Stan i raporty](06_Kontrola/README.md) | Decyzje, raporty jednostek, audyty i stan kontynuacji. |
| Seria | [Architektura serii](07_Architektura_Serii/ARCHITEKTURA_SERII.md) | Plan wszystkich tomów, łuki, zasiewy i granice ujawnień. |

## Aktualny etap

- Tytuł i autor: nieuzupełnione.
- Etap: szablon, brak rękopisu.
- Obecne zadanie: do ustalenia na podstawie polecenia autora.
- Wybrana wersja tekstu: brak.
- Następna jednostka: nieustalona; samo istnienie szablonu nie zamawia prologu.

## Początek pracy

Uzupełnij zasady. Utwórz folder odpowiedniego tomu w `04_Manuskrypt/` dopiero, gdy jest potrzebny; dodaj jego spis kolejności. Korzystając ze skilla, skopiuj jego szablon profilu do zasad, a szablony stanu i raportu do kontroli w miarę potrzeb. Po każdej jednostce wpisz fakty wykonane oraz aktualny etap. Czystą prozę zapisuj osobno od raportów.

Przy serii zacznij od architektury całości, [kart tomów](07_Architektura_Serii/KARTA_TOMU.md) i [matrycy ujawnień](07_Architektura_Serii/ZASIEWY_I_UJAWNIENIA.md). Dla pojedynczej książki nie twórz fikcyjnych dalszych tomów. [Profil stylu](01_Zasady_Projektu/PROFIL_STYLU.md) oprzyj na wskazanych fragmentach autora; po redakcji używaj [audytu stylu i immersji](06_Kontrola/AUDYT_STYLU_I_IMMERSJI.md) oraz [rejestru wpływu zmian](06_Kontrola/WALIDACJA_I_WPLYW_ZMIAN.md).

## Historia i wydania

W Git opisuj zmiany według ich znaczenia dla książki. Pliki robocze edytora są ignorowane przez dołączony `.gitignore`; gotowe eksporty można wersjonować lub przechowywać oddzielnie, zgodnie z decyzją autora. Przy eksporcie kieruj się spisem jednostek i zapisuj, z jakich źródeł powstał wynik.
