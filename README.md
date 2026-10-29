# Ahoi, Spielhafen!

Die Website verwendet einfaches HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt und keine zusätzlichen Frontend-Pakete. Die ITC-Kristen-Schrift und eure vorhandenen Fotos bleiben erhalten.

## Welche Datei ist wofür da?

| Datei / Ordner | Inhalt |
| --- | --- |
| `index.html` | Aufbau der Startseite |
| `spiele.html` | Übersicht aller Spiele |
| `spiel.html` | Gemeinsame Detailvorlage für neue Spiele |
| `speed-up.html`, `richi.html` | Bestehende Spieladressen, verwenden dieselbe Detailvorlage |
| `kontakt.html` | Kontaktformular |
| `erklaervideos.html` | Erklärvideo (lädt erst nach Klick) |
| `datenschutz.html` | Eure bisherige Datenschutzerklärung |
| **`js/inhalte.js`** | **Spiele, Produktbilder und wechselnde Startbilder bearbeiten** |
| `styles.css` | Farben, Schriftgrössen, Layout und Animationen; in nummerierte Abschnitte aufgeteilt |
| `script.js` | Navigation, Fusszeile und Interaktionen; deutsche Kommentare |
| `assets/` | Vorhandene Bilder und Schriften |
| `api/contact.js` | Bisheriger E-Mail-Versand über Vercel / SMTP |

Die vorhandenen Bilddateien wurden nicht gelöscht oder verschoben. Für neue Bilder empfiehlt sich ein Unterordner wie `assets/neues-spiel/` mit einfachen Namen ohne Leerzeichen.

## Ein neues Spiel hinzufügen

1. Bilder ablegen, zum Beispiel `assets/mein-spiel/schachtel.jpg`.
2. `js/inhalte.js` öffnen.
3. In der Liste `spiele` einen vollständigen Block von `{` bis `}` kopieren. Zwischen den Blöcken steht jeweils ein Komma.
4. Namen, Bilder, Texte und Angaben ändern. Die `id` muss eindeutig sein, möglichst Kleinbuchstaben mit Bindestrichen.
5. Beim neuen Spiel die Zeile `link` weglassen. Die passende Unterseite entsteht automatisch über `spiel.html?spiel=mein-spiel`.

Beispiel für einen vollständigen Eintrag (in die Liste `spiele` einfügen):

```js
{
  id: 'mein-spiel',
  name: 'Mein Spiel',
  untertitel: 'Ein neues Abenteuer',
  genre: 'Familienspiel',
  bild: 'assets/mein-spiel/schachtel.jpg',
  bilder: ['assets/mein-spiel/schachtel.jpg', 'assets/mein-spiel/karten.jpg'],
  beschreibung: 'Hier kommt eure ausführliche Spielbeschreibung hin.',
  kurztext: 'Ein kurzer Satz für die Übersicht.',
  alter: '8+',
  personen: '2–4',
  dauer: '20 Min.',
  inhalt: '60 Spielkarten mit Anleitung',
  preis: 'CHF 19.90',
  status: 'Erhältlich',
  jahr: '2027',
  hinweis: 'Das nächste Abenteuer aus unserem Verlag.',
  farbe: 'rosa'
}
```

Das Spiel erscheint automatisch auf der Startseite, unter «Unsere Spiele» und mit eigener Detailansicht. Die Reihenfolge in der Liste bestimmt die Reihenfolge der Karten. `farbe` kann `blau`, `gelb` oder `rosa` sein und färbt das Statusschild.

Texte stehen zwischen einfachen Anführungszeichen. Ein einzelnes Anführungszeichen im Text muss mit einem Backslash geschrieben werden, z. B. `'Los geht\'s!'`. Für Textumbrüche in einem Startbildtitel `\n` verwenden.

## Ein Startbild hinzufügen oder ändern

In derselben Datei steht darunter die Liste `startbilder`. Auch dort einen Block kopieren:

```js
{
  spiel: 'mein-spiel',
  bild: 'assets/mein-spiel/startbild.jpg',
  alt: 'Beschreibe hier kurz, was auf dem Foto zu sehen ist',
  zeile: 'Neu im Spielhafen',
  titel: 'Ein neues Spiel.\nEin neues Abenteuer.',
  text: 'Hier steht euer kurzer Startseitentext.',
  sticker: 'NEU'
}
```

`spiel` entspricht exakt der `id` aus der Spieleliste. Foto und Schaltfläche verlinken auf das passende Spiel. Bei einem Eintrag mit `teaser: true` bleibt die Vorschau ohne Verlinkung. Ohne Bild wird ein Fragezeichen angezeigt. Richi ist in `archivSpiele` aufbewahrt und wird nicht im Verlagsprogramm gelistet. Mehrere Fotos zum selben Spiel sind möglich. Die Navigationspunkte und der Zähler passen sich automatisch an.

Der automatische Wechsel läuft alle sechs Sekunden fortlaufend durch alle Teaser. In `script.js` lässt sich dafür `anzeigedauer = 6000` ändern (Millisekunden). Der Balken rechts neben Pfeilen und Punkten zeigt die ablaufende Anzeigezeit. Nach manueller Auswahl über Pfeile, Punkte oder Wischen beginnt die volle Anzeigezeit erneut; danach läuft der automatische Wechsel weiter. In einem unsichtbaren Browserfenster bleibt die Zeit stehen. Bei reduzierter Bewegung entfallen die Überblendeffekte; der automatische Wechsel bleibt aktiv.

## Farben, Texte und Navigation ändern

- Hauptfarben: ganz oben in `styles.css` unter `:root`.
- Startseitenabschnitte: direkt in `index.html`.
- Navigation und Fusszeile für alle Seiten: am Anfang von `script.js`.
- Spieltexte und Verfügbarkeit: ausschliesslich in `js/inhalte.js`.
- Status und Preise sind aus eurer bisherigen Website übernommen: Speed Up «Coming soon», Richi «Ausverkauft». Vor Veröffentlichung bitte auf den aktuellen Stand bringen. Für Speed Up steht die Altersangabe wie in eurer bisherigen separaten Angaben-Grafik auf 10+ (das Schachtelfoto zeigt noch 8+).

## Lokal anschauen

`index.html` lässt sich direkt im Browser öffnen. Für die übliche lokale Vorschau im Website-Ordner:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Danach `http://127.0.0.1:8080` im Browser öffnen. Nach Änderungen die Seite neu laden. Beenden mit `Ctrl+C`.

## Kontaktformular und Veröffentlichung

Der bisherige Versand an `ahoi@spielhafen.ch` über `/api/contact` bleibt erhalten. Der lokale Python-Server verschickt keine E-Mails. Für den echten Versand muss die Website weiter mit der vorhandenen Vercel-Funktion betrieben werden; dort müssen `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` und `SMTP_PASSWORD` gesetzt sein. Ein reines statisches Hosting führt diese Funktion nicht aus.

Das Formular zeigt Erfolg erst nach erfolgreicher Serverantwort. Bei einem Fehler bleiben die Eingaben erhalten; die E-Mail-Adresse wird als Alternative angezeigt. Der echte SMTP-Versand wurde bei der Überarbeitung nicht ausgelöst.

Die Datenschutzerklärung ist inhaltlich aus eurer bisherigen Website übernommen. Das Erklärvideo baut erst nach Klick eine Verbindung zu YouTube auf. Es wurden keine Analyse-, Cookie- oder Trackingdienste ergänzt.

Es wurde keine neue Hosting-Plattform eingerichtet und nichts veröffentlicht. Alle Änderungen liegen in diesem Ordner.

## Prüfung der Überarbeitung

Im Browser geprüft: Desktop- und Handyansicht, Bildwechsel und passende Spielverlinkung, Produktgalerie und mobiles Menü. Zusätzlich wurden die JavaScript-Syntax und lokale Datei-/Bildpfade kontrolliert.

## Händlerlinks für Speed Up ergänzen

In `js/inhalte.js` stehen beim Eintrag für Speed Up die Händler:

```js
haendler: [
  { name: 'Orell Füssli', url: '' },
  { name: 'Bider&Tanner', url: '' }
]
```

Die Produktadresse des jeweiligen Händlers bei `url` zwischen die Anführungszeichen einfügen. Solange das Feld leer ist, erscheint nur der Ladenname. Sobald eine Adresse eingetragen ist, wird daraus automatisch ein externer Link. Die Liste öffnet sich auf der Spielunterseite über «Erhältlich in».

## SumSum-Teaser und Über uns

SumSum ist mit `teaser: true` eingetragen: ohne Produktangaben und ohne anklickbare Detailseite. Die Vorschau zeigt ein Fragezeichen. Vor der Veröffentlichung des Spiels `teaser` entfernen, die vollständigen Spieldaten und Bilder ergänzen und die Startbildtexte anpassen. Die Stickertexte für die Startbilder stehen im jeweiligen Feld `sticker`.

Die Über-uns-Sektion und die entsprechende Unterseite sind vorerst entfernt.
