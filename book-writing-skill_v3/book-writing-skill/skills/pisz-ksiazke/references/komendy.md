# Komendy

Jednowyrazowe komendy przyspieszają typowe zlecenia. Autor może pisać po polsku albo po angielsku, z polskimi znakami lub bez („sprawdź” = „sprawdz” = „check”). Pełne zdanie nadal działa; komenda jest skrótem, nie jedyną formą.

## Jak rozpoznać komendę

- Komendą jest pierwsze słowo wiadomości z tabeli, samo albo z argumentem: `pisz`, `pisz R5`, `audit część II`, `$pisz-ksiazke dalej`.
- To samo słowo w środku zwykłego zdania nie jest komendą („mam plan na weekend”).
- Argument wskazuje zakres: jednostkę (`R5`, `rozdz. 5`, `Int. II`, `epilog`), część, tom albo plik. Bez argumentu obowiązuje zakres ze stanu kontynuacji.
- Komenda nie poszerza zakresu: `pisz` to jedna jednostka, `redaguj` nie zmienia fabuły, `audyt` nie poprawia tekstu bez zgody.
- Gdy komenda wymaga danych, których brak (np. `porownaj` bez drugiej wersji), zapytaj krótko albo wskaż, co trzeba podać.

## Tabela

| PL | EN | Działanie | Zatrzymanie |
|---|---|---|---|
| `pomoc` | `help` | lista komend z jednym zdaniem opisu | — |
| `stan` | `status` | aktualny stan: wersja, ostatnia jednostka, następny krok, decyzje otwarte | bez zmian w plikach |
| `źródła` | `sources` | mapa plików, wybór wersji, wycofane kopie ([źródła](zrodla-i-ciaglosc.md)) | bez prozy |
| `seria` | `series` | architektura serii, karty tomów, zasiewy ([seria](projektowanie-serii.md)) | bez prozy |
| `plan` | `plan` | plan książki lub tomu: konflikt, struktura, spis jednostek | bez prozy |
| `karty` | `cards` | karty jednostek wskazanego zakresu ([karta](../assets/KARTA_JEDNOSTKI.md)) | bez prozy |
| `pisz` | `write` | napisz wskazaną jednostkę: tekst, kontrola, raport, stan ([moduły](praca-modulowa.md)) | po jednej jednostce |
| `dalej` | `next` | jak `pisz`, dla następnej jednostki ze stanu; po ukończonej książce pyta o cel | po jednej jednostce |
| `popraw` | `fix` | poprawki wskazanej jednostki według uwag autora lub raportu | zakres uwag |
| `redaguj` | `edit` | redakcja językowa i manier, bez zmiany fabuły; porównanie objętości | wskazany zakres |
| `korekta` | `proof` | korekta pisowni, interpunkcji i typografii | wskazany zakres |
| `styl` | `style` | profil stylu albo analiza manier i tików ([styl](analiza-i-zachowanie-stylu.md)) | raport |
| `immersja` | `immersion` | analiza immersji ([immersja](immersja.md)) | raport |
| `sprawdź` | `check` | kontrola techniczna narzędziem i lekturą ([kontrola](kontrola-techniczna.md)) | raport |
| `audyt` | `audit` | audyt kanonu i ciągłości zakresu ([walidacja](walidacja-serii.md)) | raport, bez poprawek |
| `porównaj` | `diff` | porównanie dwóch wersji: objętość, nagłówki, zmienione fakty | raport |
| `wpływ` | `impact` | skutki zmiany faktu w scenach i tomach | raport i lista zmian |
| `nazwy` | `names` | katalog nazw, test kolizji, zmiana nazwy ([nazwy](nazwy-i-kolizje.md)) | raport; zamiana po zgodzie |
| `decyzje` | `decisions` | lista otwartych decyzji z wariantami i rekomendacjami | bez zmian w tekście |
| `przekaż` | `handoff` | pakiet przekazania dla innego modelu ([przekazanie](przekazanie-miedzy-modelami.md)) | pakiet |
| `wydanie` | `export` | skład i pliki wydania ([wydanie](wydanie-i-sklad.md)) | pliki i raport |
| `projekt` | `setup` | szablon repozytorium książki ([repozytorium](repozytorium-ksiazki.md)) | struktura folderów |
| `przebieg` | `pass` | przebieg tematyczny na całym ukończonym tomie, jeden temat, po kolei na jednym pliku ([redakcja całości](redakcja-calosci.md)) | po jednym przebiegu: dziennik i raport |
| `skan` | `scan` | skan spójności całego tomu: rejestry K1–K6, weryfikator, poprawki, runda kontrolna ([skan](skan-spojnosci.md)) | raport; poprawki po zgodzie |
| `weryfikuj` | `verify` | sprawdzenie opinii zewnętrznej i pewności ustaleń w tekście ([weryfikacja](weryfikacja-opinii.md)) | lista: przyjęte, odrzucone, do autora, do specjalisty |
| `lekki` | `light` | przejście na tryb lekki: skrócona karta, raport trzypunktowy, bez rejestrów serii ([tryb lekki](tryb-lekki.md)) | zapis trybu w profilu |
| `pełny` | `full` | przejście na tryb pełny z całym procesem modułowym | zapis trybu w profilu |

## Przykłady

```text
stan
dalej
pisz R5
write chapter 5
karty część I
audit część II
sprawdź rozdz. 12
porównaj v15 v16
redaguj R3
nazwy Zielony Młyn
przekaż tom IV
przebieg dialogi
skan tom I
weryfikuj opinię.md
```

## Narzędzia w terminalu

Te same słowa działają w skrypcie `scripts/ks.mjs` (Node.js 20+):

```sh
node scripts/ks.mjs sprawdz rozdzial.md
node scripts/ks.mjs tom tom/*.md
node scripts/ks.mjs porownaj stara.md nowa.md
node scripts/ks.mjs styl rozdzial.md
node scripts/ks.mjs spacje rozdzial.md wynik.md
node scripts/ks.mjs zamien rozdzial.md pary.json --zapisz --kopia przed.md
node scripts/ks.mjs pomoc
```

Angielskie odpowiedniki: `check`, `volume`, `diff`, `style`, `nbsp`, `patch`, `help`. Plik reguł podaje się przez `-r`, a gdy go brak, skrypt szuka `reguly_kontroli.json` w folderze pliku i do czterech poziomów wyżej (także w `01_Zasady_Projektu/`). Raport zawsze podaje, z jakich reguł skorzystano.
