/* HIER PFLEGT IHR EURE SPIELE.
   Einen ganzen { ... }-Block kopieren und anpassen. Komma zwischen den Blöcken!
   Neue Spiele öffnen sich automatisch in spiel.html?spiel=DEINE-ID.
   Alle Pfade sind relativ zum Hauptordner der Website. */
const spiele = [
  {
    id: 'speed-up',
    name: 'Speed Up',
    untertitel: 'Hauptsache Kilometer!',
    genre: 'Familienspiel',
    bild: 'speedup1-optimiert.jpg',
    bilder: ['speedup1-optimiert.jpg', 'speedup2-optimiert.jpg', 'speedup3-optimiert.jpg', 'speedup4-optimiert.jpg', 'speedup5-optimiert.jpg'],
    beschreibung: 'Du steckst im permanenten Dilemma zwischen Geldbörse und grünem Gewissen. Taktik, Glück und gute Entscheidungen zählen: Versuche am weitesten zu reisen, die anderen zu sabotieren und dem Chaos aus dem Weg zu gehen. Die Person mit den meisten Kilometern gewinnt das Spiel.',
    kurztext: 'Versuche am weitesten zu reisen, die anderen zu sabotieren und dem Chaos aus dem Weg zu gehen.',
    alter: '10+', personen: '2–4', dauer: '25 Min.',
    inhalt: '140 Spielkarten mit Anleitung',
    preis: 'CHF 19.90',
    status: 'Coming soon', // Verfügbarkeit hier ändern, sobald das Spiel erhältlich ist.
    jahr: '2026',
    hinweis: 'Unser erstes Spiel unter dem Namen Spielhafen.',
    farbe: 'blau', // blau, gelb oder rosa
    link: 'speed-up.html',
    // Sobald die Produktseiten online sind: die jeweilige URL zwischen die Anführungszeichen setzen.
    haendler: [
      { name: 'Orell Füssli', url: '' },
      { name: 'Bider&Tanner', url: '' }
    ]
  },
  {
    id: 'sumsum',
    name: 'SumSum',
    teaser: true, // Noch keine Detailseite oder Verlinkung.
    genre: 'Unser nächstes Kartenspiel',
    kurztext: 'Ein Spiel über Bienen',
    status: 'Coming soon',
    farbe: 'gelb'
  }
];

/* STARTBILDER: Für ein weiteres Bild einen Block kopieren.
   spiel: muss der id eines Spiels oben entsprechen. Teaser ohne Bild und Verlinkung sind ebenfalls möglich.
   Produktfotos und Stimmungsbilder sind beide möglich. */
// Test der persönlichen Teaser-Karten. Auf false setzen = bisherige Darstellung.
const teaserKartenAktiv = true;
const sumsumBienenAktiv = true; // Auf false setzen, um die Bienen auszublenden.

const startbilder = [
  {
    spiel: 'speed-up',
    bild: 'speedup1-optimiert.jpg',
    alt: 'Die hellblaue Spielschachtel von Speed Up',
    zeile: 'Familienspiel mit 140 Karten',
    titel: 'Speed Up',
    text: 'Versuche am weitesten zu reisen, die anderen zu sabotieren und dem Chaos aus dem Weg zu gehen.',
    sticker: 'Bald erhältlich',
    // Farben passend zur hellblauen Speed-Up-Schachtel.
    palette: {
      hintergrund: '#e7f3f8',
      schrift: '#24516a',
      akzent: '#8acbe0',
      akzentSchrift: '#173e50',
      flaeche: '#f8fcfe',
      rahmen: '#bddde9'
    }
  },
  {
    spiel: 'sumsum',
    bild: '', // Für den Teaser zeigen wir ein Fragezeichen.
    alt: '',
    zeile: 'Unser nächstes Kartenspiel',
    titel: 'SumSum',
    text: 'Ein Spiel über Bienen',
    button: 'SumSum bald entdecken',
    sticker: 'Ende 2027',
    // Vorläufige SumSum-Palette: Honiggelb, Creme und Orangegelb.
    palette: {
      hintergrund: '#fff0ce',
      schrift: '#624222',
      akzent: '#f2b43e',
      akzentSchrift: '#54320f',
      flaeche: '#fffaf0',
      rahmen: '#e9cb85'
    }
  }
];

// Nicht im Spieleprogramm gelistet. Für die bisherige Richi-Adresse aufbewahrt.
const archivSpiele = [
  {
    id: 'richi',
    name: 'Richi',
    untertitel: 'Das Kartenspiel',
    genre: 'Familien- / Partyspiel',
    bild: 'assets/spiel1.jpg',
    bilder: ['assets/spiel1.jpg', 'assets/spiel2.jpg', 'assets/spiel3.jpg'],
    beschreibung: 'Rette Richi, denn er fällt jeden Moment vom Bagger auf den Boden! Verhindere dies, indem du geschickt spielst und gleichzeitig den anderen das Leben schwer machst. Wer als Erstes keine Leben mehr hat, verliert – die Person mit den meisten gewinnt.',
    kurztext: 'Rette Richi vom Bagger – und mach deinen Mitspielenden das Leben ein bisschen schwer.',
    alter: '8+', personen: '2–6', dauer: '25 Min.',
    inhalt: '50 Spielkarten mit Anleitung',
    preis: 'CHF 14.90',
    status: 'Ausverkauft',
    jahr: '2025',
    hinweis: 'Hier hat alles angefangen. Noch vor der Gründung von Spielhafen.',
    farbe: 'gelb',
    link: 'richi.html'
  }
];
