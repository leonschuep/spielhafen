/* Kleine Funktionen ohne Framework. Die Inhalte stehen in js/inhalte.js. */
const bewegungReduziert = window.matchMedia('(prefers-reduced-motion: reduce)');

// Gemeinsame Navigation und Fusszeile nur an einer Stelle pflegen.
document.querySelector('#seitenkopf').innerHTML = `
  <nav class="nav wrap" aria-label="Hauptnavigation">
    <a class="brand" href="index.html" aria-label="Spielhafen – Startseite">
      <img src="assets/logo.png" width="49" height="42" alt="">
      <span class="brand-name">Spielhafen</span>
    </a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menü <span class="icon icon-menu" aria-hidden="true"></span></button>
    <div class="nav-links" id="navigation">
      <a href="spiele.html">Unsere Spiele</a>
      <a href="erklaervideos.html">Erklärvideos</a><a class="nav-contact" href="kontakt.html">Kontakt <span class="icon icon-diagonal" aria-hidden="true"></span></a>
    </div>
  </nav>`;
document.querySelector('#seitenfuss').innerHTML = `
  <div class="wrap footer-top"><div><a class="footer-brand" href="index.html">Spielhafen</a></div>
    <div class="footer-links"><a href="spiele.html">Unsere Spiele</a><a href="kontakt.html">Kontakt</a><a href="mailto:ahoi@spielhafen.ch">ahoi@spielhafen.ch <span class="icon icon-diagonal" aria-hidden="true"></span></a></div>
  </div>
  <div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Spielhafen</span><div class="socials"><a href="https://www.instagram.com/spielhafen/" target="_blank" rel="noopener noreferrer">Instagram <span class="icon icon-diagonal" aria-hidden="true"></span></a><a href="https://www.youtube.com/@Spielhafen" target="_blank" rel="noopener noreferrer">YouTube <span class="icon icon-diagonal" aria-hidden="true"></span></a><a href="datenschutz.html">Datenschutz</a></div></div>`;

// Nach etwas Scrollen gleitet die Navigation wieder von oben herein.
const seitenkopf = document.querySelector('#seitenkopf');
function aktualisiereNavigation() {
  seitenkopf.classList.toggle('is-scrolled', window.scrollY > 180);
}
window.addEventListener('scroll', aktualisiereNavigation, { passive: true });
aktualisiereNavigation();

const aktuelleSeite = location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === aktuelleSeite) link.setAttribute('aria-current', 'page');
});
const menueTaste = document.querySelector('.menu-toggle');
function schliesseMenue() {
  menueTaste.setAttribute('aria-expanded', 'false');
  document.querySelector('#navigation').classList.remove('open');
}
menueTaste.addEventListener('click', () => {
  const offen = menueTaste.getAttribute('aria-expanded') === 'true';
  menueTaste.setAttribute('aria-expanded', String(!offen));
  document.querySelector('#navigation').classList.toggle('open', !offen);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menueTaste.getAttribute('aria-expanded') === 'true') {
    schliesseMenue();
    menueTaste.focus();
  }
});

// Für neue Spiele ist kein neues HTML nötig.
function spielLink(spiel) {
  return spiel.link || `spiel.html?spiel=${encodeURIComponent(spiel.id)}`;
}
function spielFakten(spiel) {
  return `<div class="game-facts"><span>Ab ${spiel.alter}</span><span>${spiel.personen} Personen</span><span>${spiel.dauer}</span></div>`;
}
document.querySelectorAll('[data-spiele]').forEach(container => {
  container.innerHTML = spiele.map(spiel => {
    // Ein Teaser sieht wie eine Karte aus, ist aber kein Link.
    const tag = spiel.teaser ? 'article' : 'a';
    const link = spiel.teaser ? '' : `href="${spielLink(spiel)}"`;
    const foto = spiel.teaser
      ? '<div class="teaser-placeholder" aria-label="Ein neues Spiel entsteht"><span aria-hidden="true">?</span></div>'
      : `<img src="${spiel.bild}" alt="${spiel.name} – die Spielschachtel" loading="lazy">`;
    return `<${tag} ${link} class="game-card reveal${spiel.teaser ? ' teaser-card' : ''}">
      <div class="game-image ${spiel.farbe}">${foto}<span class="badge">${spiel.status}</span></div>
      <div class="game-body"><div class="game-title-row"><h3>${spiel.name}</h3>${spiel.teaser ? '' : '<span class="card-arrow" aria-hidden="true"><span class="icon icon-diagonal" aria-hidden="true"></span></span>'}</div>
      <p class="game-genre">${spiel.genre}</p><p class="game-description">${spiel.kurztext}</p>${spiel.teaser ? '' : spielFakten(spiel)}</div>
    </${tag}>`;
  }).join('');
});

// STARTBILDER: Automatisch alle 6 Sekunden, manuell auch mit Pfeilen und Wischen.
const hero = document.querySelector('.hero');
if (hero && startbilder.length) {
  hero.classList.toggle('personalisiert', teaserKartenAktiv);
  seitenkopf.classList.toggle('teaser-navigation', teaserKartenAktiv);
  if (teaserKartenAktiv) {
    // Die Teaserfläche reicht hinter die transparente Navigation.
    // Auch beim aufgeklappten Handymenü bleibt genug Platz für den Inhalt.
    const kopfhoeheAnpassen = () => {
      hero.style.setProperty('--startkopfhoehe', `${seitenkopf.offsetHeight}px`);
    };
    kopfhoeheAnpassen();
    if ('ResizeObserver' in window) new ResizeObserver(kopfhoeheAnpassen).observe(seitenkopf);
  }
  let bildIndex = 0;
  const anzeigedauer = 6000; // Zeit pro Teaser in Millisekunden.
  let vergangen = 0;
  let letzteZeit = performance.now();
  let wechselLaeuft = false;
  let wechselTimer;
  const punkte = document.querySelector('#bild-punkte');
  const fortschritt = document.querySelector('#bild-fortschritt');
  const fotoLink = document.querySelector('#hero-bild-link');
  const foto = document.querySelector('#hero-bild');

  punkte.innerHTML = startbilder.map((bild, index) => `<button class="dot" aria-label="Bild ${index + 1}: ${spiele.find(spiel => spiel.id === bild.spiel)?.name || 'Spiel'}" aria-current="${index === 0}"></button>`).join('');

  function zeigeBild(index, animieren = true) {
    clearTimeout(wechselTimer);
    wechselLaeuft = true;
    bildIndex = (index + startbilder.length) % startbilder.length;
    const bild = startbilder[bildIndex];
    const spiel = spiele.find(spiel => spiel.id === bild.spiel);
    if (!spiel) return;
    const fuellen = () => {
      // Die Farbpalette steht beim jeweiligen Startbild in js/inhalte.js.
      const palette = bild.palette || {};
      const farben = {
        '--teaser-hintergrund': palette.hintergrund,
        '--teaser-schrift': palette.schrift,
        '--teaser-akzent': palette.akzent,
        '--teaser-akzent-schrift': palette.akzentSchrift,
        '--teaser-flaeche': palette.flaeche,
        '--teaser-rahmen': palette.rahmen
      };
      Object.entries(farben).forEach(([name, wert]) => {
        [hero, seitenkopf].forEach(element => {
          if (wert) element.style.setProperty(name, wert);
          else element.style.removeProperty(name);
        });
      });
      foto.hidden = Boolean(spiel.teaser);
      if (bild.bild) foto.src = bild.bild;
      foto.alt = bild.alt;
      document.querySelector('#hero-platzhalter').hidden = !spiel.teaser;
      // Ohne href gibt es beim Teaser keine Navigation, auch nicht per Tastatur.
      if (spiel.teaser) fotoLink.removeAttribute('href');
      else fotoLink.href = spielLink(spiel);
      fotoLink.classList.toggle('teaser-photo', Boolean(spiel.teaser));
      document.querySelector('#hero-zeile').textContent = bild.zeile;
      const titel = document.querySelector('#hero-titel');
      titel.replaceChildren();
      bild.titel.split('\n').forEach((zeile, i) => {
        if (i) titel.append(document.createElement('br'));
        titel.append(document.createTextNode(zeile));
      });
      document.querySelector('#hero-text').textContent = bild.text;
      const taste = document.querySelector('#hero-link');
      if (spiel.teaser) {
        taste.removeAttribute('href');
        taste.setAttribute('aria-disabled', 'true');
      } else {
        taste.href = spielLink(spiel);
        taste.removeAttribute('aria-disabled');
      }
      taste.innerHTML = `${bild.button || spiel.name + ' entdecken'}${spiel.teaser ? '' : ' <span aria-hidden="true"><span class="icon icon-diagonal" aria-hidden="true"></span></span>'}`;
      document.querySelector('#hero-bild-label').innerHTML = `${spiel.name}${spiel.teaser ? '' : ' <span aria-hidden="true"><span class="icon icon-diagonal" aria-hidden="true"></span></span>'}`;
      document.querySelector('#hero-sticker').textContent = bild.sticker || '';
      punkte.querySelectorAll('button').forEach((punkt, i) => punkt.setAttribute('aria-current', String(i === bildIndex)));
      fotoLink.classList.remove('changing');
      vergangen = 0;
      letzteZeit = performance.now();
      fortschritt.style.transform = 'scaleX(0)';
      wechselLaeuft = false;
    };
    if (animieren && !bewegungReduziert.matches) {
      fotoLink.classList.add('changing');
      wechselTimer = setTimeout(fuellen, 180);
    } else fuellen();
  }
  function manuell(index) {
    // Jede Auswahl bekommt wieder die volle Anzeigezeit.
    zeigeBild(index);
  }
  document.querySelector('#vorheriges-bild').addEventListener('click', () => manuell(bildIndex - 1));
  document.querySelector('#naechstes-bild').addEventListener('click', () => manuell(bildIndex + 1));
  punkte.querySelectorAll('button').forEach((punkt, index) => punkt.addEventListener('click', () => manuell(index)));

  // Derselbe Zeitmesser steuert Balken und Wechsel, damit beide synchron bleiben.
  // In einem unsichtbaren Browser-Tab bleibt die verbleibende Zeit erhalten.
  setInterval(() => {
    const jetzt = performance.now();
    const zeitSeitLetztemSchritt = jetzt - letzteZeit;
    letzteZeit = jetzt;
    if (document.hidden || wechselLaeuft || startbilder.length < 2) return;
    vergangen += zeitSeitLetztemSchritt;
    fortschritt.style.transform = `scaleX(${Math.min(vergangen / anzeigedauer, 1)})`;
    if (vergangen >= anzeigedauer) zeigeBild(bildIndex + 1);
  }, 50);
  document.addEventListener('visibilitychange', () => {
    letzteZeit = performance.now();
  });
  let touchX = 0;
  let touchY = 0;
  fotoLink.addEventListener('touchstart', event => {
    touchX = event.changedTouches[0].clientX;
    touchY = event.changedTouches[0].clientY;
  }, { passive: true });
  fotoLink.addEventListener('touchend', event => {
    const dx = event.changedTouches[0].clientX - touchX;
    const dy = event.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault();
      manuell(bildIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: false });
  zeigeBild(0, false);
}

// SPIELDETAILS: Die bestehenden Spieladressen bleiben erhalten.
const details = document.querySelector('#spiel-details');
if (details) {
  const id = document.body.dataset.spiel || new URLSearchParams(location.search).get('spiel');
  const spiel = [...spiele, ...archivSpiele].find(eintrag => eintrag.id === id);
  if (!spiel) {
    details.innerHTML = '<h1>Dieses Spiel ist noch nicht im Hafen.</h1><p><a class="text-link" href="spiele.html">Unsere Spiele entdecken <span class="icon icon-right" aria-hidden="true"></span></a></p>';
  } else if (spiel.teaser) {
    details.innerHTML = `<h1>${spiel.name} – Coming soon</h1><p>${spiel.kurztext}</p>`;
  } else {
    document.title = `${spiel.name} | Spielhafen`;
    details.innerHTML = `<article class="product">
      <div class="product-gallery"><img id="produkt-bild" class="product-main" src="${spiel.bild}" alt="${spiel.name} – Produktansicht 1">
        <div class="thumbnails" aria-label="Produktbilder">${spiel.bilder.map((bild, i) => `<button class="thumbnail" aria-label="${spiel.name}: Bild ${i + 1} anzeigen" aria-pressed="${i === 0}"><img src="${bild}" alt="" loading="lazy"></button>`).join('')}</div>
      </div>
      <div class="product-copy"><p class="eyebrow">${spiel.genre}</p><h1>${spiel.name}</h1><p class="product-subtitle">${spiel.untertitel}</p><p>${spiel.beschreibung}</p>${spielFakten(spiel)}<p>${spiel.inhalt}</p><p class="product-price">${spiel.preis}</p><span class="availability">${spiel.status}</span>${spiel.haendler ? `<details class="retailers"><summary class="button">Erhältlich in <span aria-hidden="true"><span class="icon icon-chevron" aria-hidden="true"></span></span></summary><ul>${spiel.haendler.map(laden => `<li>${laden.url ? `<a class="text-link" href="${laden.url}" target="_blank" rel="noopener noreferrer">${laden.name} <span class="icon icon-diagonal" aria-hidden="true"></span></a>` : `<span>${laden.name}</span>`}</li>`).join('')}</ul></details>` : '<a class="button" href="kontakt.html">Zum Spiel anfragen <span aria-hidden="true"><span class="icon icon-diagonal" aria-hidden="true"></span></span></a>'}<p class="product-note">${spiel.hinweis}</p></div>
    </article>`;
    details.querySelectorAll('.thumbnail').forEach((taste, index) => taste.addEventListener('click', () => {
      document.querySelector('#produkt-bild').src = spiel.bilder[index];
      document.querySelector('#produkt-bild').alt = `${spiel.name} – Produktansicht ${index + 1}`;
      details.querySelectorAll('.thumbnail').forEach(knopf => knopf.setAttribute('aria-pressed', String(knopf === taste)));
    }));
  }
}

const chronik = document.querySelector('#spielchronik');
if (chronik) chronik.innerHTML = spiele.filter(spiel => !spiel.teaser).sort((a, b) => a.jahr.localeCompare(b.jahr)).map(spiel => `<a class="chronicle-row" href="${spielLink(spiel)}"><span>${spiel.jahr}</span><h3>${spiel.name}</h3><p>${spiel.hinweis}</p><span aria-hidden="true"><span class="icon icon-diagonal" aria-hidden="true"></span></span></a>`).join('');

// Aufpoppen nur einmal beim Sichtbarwerden.
if ('IntersectionObserver' in window && !bewegungReduziert.matches) {
  function zeigeElemente(eintraege, observer) {
    eintraege.forEach(eintrag => {
      if (eintrag.isIntersecting) {
        eintrag.target.classList.add('visible');
        observer.unobserve(eintrag.target);
      }
    });
  }
  const observer = new IntersectionObserver(zeigeElemente, { threshold: .08 });
  // Karten starten erst, wenn sie etwas weiter in den sichtbaren Bereich rücken.
  const kartenObserver = new IntersectionObserver(zeigeElemente, {
    threshold: .18,
    rootMargin: '0px 0px -50px 0px'
  });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    const istKarte = element.classList.contains('game-card');
    const position = [...element.parentElement.children].indexOf(element);
    const verzoegerung = istKarte ? 120 + (position % 2) * 220 : (index % 2) * 100;
    element.style.setProperty('--verzoegerung', `${verzoegerung}ms`);
    element.classList.add('reveal-ready');
    (istKarte ? kartenObserver : observer).observe(element);
  });
}

// Video wird erst nach einem bewussten Klick von YouTube geladen.
const videoTaste = document.querySelector('#video-laden');
if (videoTaste) videoTaste.addEventListener('click', () => {
  document.querySelector('#video-bereich').outerHTML = '<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/k90kf-fFyQY?autoplay=1" title="Richi – Spielregeln erklärt" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
});

// Kontaktformular: nur auf der Kontaktseite vorhanden.
const formular = document.querySelector('#contact-form');
if (formular) formular.addEventListener('submit', async event => {
  event.preventDefault();
  const taste = formular.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  taste.disabled = true;
  status.textContent = 'Deine Nachricht ist unterwegs …';
  try {
    const antwort = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(formular))),
      signal: AbortSignal.timeout(20000)
    });
    if (!antwort.ok) throw new Error('Senden fehlgeschlagen');
    status.textContent = 'Danke! Deine Nachricht ist bei uns angekommen.';
    formular.reset();
  } catch (fehler) {
    status.textContent = 'Das Senden hat leider nicht geklappt. Deine Eingaben bleiben erhalten. Schreib uns alternativ an ahoi@spielhafen.ch.';
  } finally {
    taste.disabled = false;
  }
});
