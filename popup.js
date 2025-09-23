const defaults = {
  limit: 8,
  openMode: "tab",
  country: "es",
  noHistory: false,
  history: [],
  domainsByCountry: {}, // Objeto para guardar dominios por país
  deselectedOrderByCountry: {}, // Objeto para guardar orden de deselección por país
  customMediaByCountry: {}, // Objeto para guardar medios personalizados por país
  
  // Nuevas configuraciones avanzadas
  sortBy: "relevance",
  timeRange: "any",
  contentType: "any",
  searchMode: "balanced",
  diversifySources: true,
  trustedOnly: false
};

// Lista de medios por país
const mediaByCountry = {
  "es": [
    "elmundo.es",
    "elpais.com",
    "20minutos.es",
    "okdiario.com",
    "lavanguardia.com",
    "elconfidencial.com",
    "abc.es",
    "elespanol.com",
    "larazon.es",
    "europapress.es",
    "elperiodico.com",
    "marca.com",
    "sport.es",
    "as.com",
    "mundodeportivo.com",
    "huffingtonpost.es",
    "publico.es",
    "sur.es",
    "eldiario.es",
    "rtve.es",
    "antena3.com",
    "lasexta.com",
    "cadenaser.com",
    "cope.es",
    "cincodias.elpais.com",
    "expansion.com",
    "vozpopuli.com",
    "niusdiario.es",
    "cuatro.com/noticias",
    "telecinco.es/informativos",
    "eldiariomontanes.es",
    "canarias7.es",
    "levante-emv.com",
    "ultimahora.es",
    "diariodesevilla.es",
    "heraldo.es",
    "lavozdegalicia.es",
    "diariovasco.com",
    "elcorreoweb.es",
    "grupojoly.com",
    "informacion.es",
    "diariodeburgos.es",
    "diariopalentino.es",
    "menorca.info",
    "diariodeleon.es",
    "noticiasdealava.eus",
    "noticiasdegipuzkoa.eus",
    "aragondigital.es",
    "navarraconfidencial.com"
  ],
  "fr": [
    "lemonde.fr",
    "lefigaro.fr",
    "leparisien.fr",
    "20minutes.fr",
    "bfmtv.com",
    "francetvinfo.fr",
    "france24.com",
    "lesechos.fr",
    "nouvelobs.com",
    "liberation.fr",
    "rfi.fr",
    "rtl.fr",
    "europe1.fr",
    "franceinter.fr",
    "lequipe.fr",
    "parismatch.com",
    "ouest-france.fr",
    "sudouest.fr",
    "ladepeche.fr",
    "ledauphine.com",
    "lavoixdunord.fr",
    "midilibre.fr",
    "laprovence.com",
    "nice-matin.com",
    "letelegramme.fr",
    "estrepublicain.fr",
    "dna.fr",
    "lamontagne.fr",
    "charentelibre.fr",
    "courrier-picard.fr",
    "republicain-lorrain.fr",
    "lindependant.fr",
    "lanouvellerepublique.fr",
    "humanite.fr",
    "lepoint.fr",
    "latribune.fr",
    "telerama.fr",
    "gala.fr",
    "closermag.fr",
    "tele7jours.fr",
    "sofoot.com",
    "footmercato.net",
    "lejournaldugeek.com",
    "01net.com",
    "numerama.com",
    "jeuneafrique.com",
    "courrierinternational.com",
    "francemusique.fr",
    "radiofrance.fr"
  ],
  "de": [
    "bild.de",
    "spiegel.de",
    "welt.de",
    "faz.net",
    "sueddeutsche.de",
    "zeit.de",
    "n-tv.de",
    "tagesschau.de",
    "focus.de",
    "stern.de",
    "handelsblatt.com",
    "taz.de",
    "rundschau-online.de",
    "merkur.de",
    "express.de",
    "morgenpost.de",
    "augsburger-allgemeine.de",
    "rheinische-post.de",
    "stuttgarter-zeitung.de",
    "stuttgarter-nachrichten.de",
    "tagesspiegel.de",
    "heute.de",
    "br.de",
    "zdf.de",
    "dw.com",
    "fr.de",
    "ndr.de",
    "mdr.de",
    "wdr.de",
    "swr.de",
    "haz.de",
    "abendblatt.de",
    "nordbayern.de",
    "weser-kurier.de",
    "sz-online.de",
    "mainpost.de",
    "volksstimme.de",
    "ln-online.de",
    "maz-online.de",
    "pnn.de",
    "moz.de",
    "kreiszeitung.de",
    "giessener-allgemeine.de",
    "hna.de",
    "mittelbayerische.de",
    "donaukurier.de",
    "allgemeine-zeitung.de",
    "handelsjournal.de",
    "chip.de",
    "golem.de",
    "heise.de"
  ],
  "uk": [
    "bbc.com",
    "theguardian.com",
    "dailymail.co.uk",
    "telegraph.co.uk",
    "independent.co.uk",
    "mirror.co.uk",
    "thesun.co.uk",
    "standard.co.uk",
    "metro.co.uk",
    "sky.com",
    "itv.com/news",
    "channel4.com/news",
    "express.co.uk",
    "timesonline.co.uk",
    "ft.com",
    "economist.com",
    "spectator.co.uk",
    "newstatesman.com",
    "cityam.com",
    "politicshome.com",
    "politico.eu/uk",
    "inews.co.uk",
    "morningstar.co.uk",
    "theweek.co.uk",
    "prospectmagazine.co.uk",
    "lse.ac.uk/News",
    "newscientist.com",
    "nature.com/uk",
    "theconversation.com/uk",
    "wired.co.uk",
    "techradar.com/uk",
    "gamesradar.com/uk",
    "eurosport.co.uk",
    "goal.com/en-gb",
    "skysports.com",
    "bbc.co.uk/sport",
    "thetimes.co.uk/sport",
    "independent.co.uk/sport",
    "eveningexpress.co.uk",
    "heraldscotland.com",
    "scotsman.com",
    "yorkshirepost.co.uk",
    "manchestereveningnews.co.uk",
    "liverpoolecho.co.uk",
    "birminghammail.co.uk",
    "chroniclelive.co.uk",
    "walesonline.co.uk",
    "irishnews.com",
    "theirishpost.com",
    "thetablet.co.uk"
  ],
  "us": [
    "nytimes.com",
    "washingtonpost.com",
    "wsj.com",
    "usatoday.com",
    "cnn.com",
    "foxnews.com",
    "nbcnews.com",
    "abcnews.go.com",
    "cbsnews.com",
    "npr.org",
    "pbs.org",
    "politico.com",
    "thehill.com",
    "bloomberg.com",
    "reuters.com",
    "apnews.com",
    "latimes.com",
    "chicagotribune.com",
    "sfgate.com",
    "miamiherald.com",
    "bostonglobe.com",
    "dallasnews.com",
    "startribune.com",
    "philly.com",
    "houstonchronicle.com",
    "seattletimes.com",
    "denverpost.com",
    "ajc.com",
    "tampabay.com",
    "slate.com",
    "vox.com",
    "huffpost.com",
    "buzzfeednews.com",
    "axios.com",
    "propublica.org",
    "motherjones.com",
    "theatlantic.com",
    "newyorker.com",
    "time.com",
    "newsweek.com",
    "forbes.com",
    "fortune.com",
    "businessinsider.com",
    "techcrunch.com",
    "wired.com",
    "cnet.com",
    "engadget.com",
    "espn.com",
    "si.com",
    "bleacherreport.com"
  ]
};

// Función para obtener los medios según el país seleccionado (incluyendo personalizados)
async function getMediaForCountry(countryCode) {
  const st = await getSettings();
  
  // Para un país específico
  const defaultMedia = mediaByCountry[countryCode] || mediaByCountry["es"];
  const customMedia = st.customMediaByCountry[countryCode] || [];
  
  // Combinar medios por defecto con personalizados
  return [...defaultMedia, ...customMedia];
}

function getSelText(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId },
    func: () => window.getSelection().toString().trim()
  }).then(res => (res[0]?.result || "").slice(0, 500));
}

async function getSettings() {
  const st = await chrome.storage.sync.get(defaults);
  
  // Migrar datos antiguos si existen
  const { domains = [] } = await chrome.storage.sync.get({ domains: [] });
  if (domains.length > 0 && st.country && !st.domainsByCountry[st.country]) {
    st.domainsByCountry[st.country] = domains;
    // Limpiar el array antiguo
    await chrome.storage.sync.remove('domains');
    await chrome.storage.sync.set({ domainsByCountry: st.domainsByCountry });
  }
  
  // Obtener dominios del país actual
  st.domains = st.domainsByCountry[st.country] || [];
  
  return st;
}

async function saveSettings(partial) {
  await chrome.storage.sync.set(partial);
}

// Función para obtener el nombre limpio del medio
function getCleanMediaName(domain) {
  let name = domain.replace(/\.(com|es|eus|fr|de|net|co\.uk|ac\.uk|org|go\.com).*/, '');
  if (name.includes('.')) {
    const parts = name.split('.');
    name = parts[parts.length - 1];
  }
  
  // Casos especiales para nombres más legibles
  const specialNames = {
    // Medios franceses
    'bfmtv': 'BFM TV',
    'francetvinfo': 'France TV Info',
    'france24': 'France 24',
    'nouvelobs': 'L\'Obs',
    'lequipe': 'L\'Équipe',
    'parismatch': 'Paris Match',
    'ouest-france': 'Ouest-France',
    'sudouest': 'Sud Ouest',
    'ladepeche': 'La Dépêche',
    'ledauphine': 'Le Dauphiné',
    'lavoixdunord': 'La Voix du Nord',
    'midilibre': 'Midi Libre',
    'laprovence': 'La Provence',
    'nice-matin': 'Nice-Matin',
    'letelegramme': 'Le Télégramme',
    'estrepublicain': 'L\'Est Républicain',
    'lamontagne': 'La Montagne',
    'charentelibre': 'Charente Libre',
    'courrier-picard': 'Courrier Picard',
    'republicain-lorrain': 'Républicain Lorrain',
    'lindependant': 'L\'Indépendant',
    'lanouvellerepublique': 'La Nouvelle République',
    'humanite': 'L\'Humanité',
    'lepoint': 'Le Point',
    'latribune': 'La Tribune',
    'telerama': 'Télérama',
    'tele7jours': 'Télé 7 Jours',
    'sofoot': 'So Foot',
    'footmercato': 'Foot Mercato',
    'lejournaldugeek': 'Journal du Geek',
    '01net': '01net',
    'numerama': 'Numerama',
    'jeuneafrique': 'Jeune Afrique',
    'courrierinternational': 'Courrier International',
    'francemusique': 'France Musique',
    'radiofrance': 'Radio France',
    
    // Medios alemanes
    'bild': 'Bild',
    'spiegel': 'Der Spiegel',
    'welt': 'Die Welt',
    'faz': 'FAZ',
    'sueddeutsche': 'Süddeutsche',
    'zeit': 'Die Zeit',
    'n-tv': 'n-tv',
    'tagesschau': 'Tagesschau',
    'focus': 'Focus',
    'stern': 'Stern',
    'handelsblatt': 'Handelsblatt',
    'taz': 'taz',
    'rundschau-online': 'Rundschau Online',
    'merkur': 'Merkur',
    'express': 'Express',
    'morgenpost': 'Morgenpost',
    'augsburger-allgemeine': 'Augsburger Allgemeine',
    'rheinische-post': 'Rheinische Post',
    'stuttgarter-zeitung': 'Stuttgarter Zeitung',
    'stuttgarter-nachrichten': 'Stuttgarter Nachrichten',
    'tagesspiegel': 'Tagesspiegel',
    'heute': 'heute',
    'br': 'BR',
    'zdf': 'ZDF',
    'dw': 'Deutsche Welle',
    'fr': 'FR',
    'ndr': 'NDR',
    'mdr': 'MDR',
    'wdr': 'WDR',
    'swr': 'SWR',
    'haz': 'HAZ',
    'abendblatt': 'Abendblatt',
    'nordbayern': 'Nordbayern',
    'weser-kurier': 'Weser-Kurier',
    'sz-online': 'Sächsische Zeitung',
    'mainpost': 'Main-Post',
    'volksstimme': 'Volksstimme',
    'ln-online': 'LN-Online',
    'maz-online': 'MAZ',
    'pnn': 'PNN',
    'moz': 'MOZ',
    'kreiszeitung': 'Kreiszeitung',
    'giessener-allgemeine': 'Gießener Allgemeine',
    'hna': 'HNA',
    'mittelbayerische': 'Mittelbayerische',
    'donaukurier': 'Donaukurier',
    'allgemeine-zeitung': 'Allgemeine Zeitung',
    'handelsjournal': 'Handelsjournal',
    'chip': 'CHIP',
    'golem': 'Golem',
    'heise': 'Heise',
    
    // Medios británicos
    'bbc': 'BBC',
    'theguardian': 'The Guardian',
    'dailymail': 'Daily Mail',
    'telegraph': 'The Telegraph',
    'independent': 'The Independent',
    'mirror': 'The Mirror',
    'thesun': 'The Sun',
    'standard': 'Evening Standard',
    'metro': 'Metro',
    'sky': 'Sky News',
    'itv': 'ITV News',
    'channel4': 'Channel 4 News',
    'express': 'Daily Express',
    'timesonline': 'The Times',
    'ft': 'Financial Times',
    'economist': 'The Economist',
    'spectator': 'The Spectator',
    'newstatesman': 'New Statesman',
    'cityam': 'City A.M.',
    'politicshome': 'PoliticsHome',
    'politico': 'Politico',
    'inews': 'i News',
    'morningstar': 'Morningstar',
    'theweek': 'The Week',
    'prospectmagazine': 'Prospect',
    'lse': 'LSE',
    'newscientist': 'New Scientist',
    'nature': 'Nature',
    'theconversation': 'The Conversation',
    'wired': 'Wired UK',
    'techradar': 'TechRadar',
    'gamesradar': 'GamesRadar',
    'eurosport': 'Eurosport',
    'goal': 'Goal',
    'skysports': 'Sky Sports',
    'thetimes': 'The Times',
    'eveningexpress': 'Evening Express',
    'heraldscotland': 'The Herald',
    'scotsman': 'The Scotsman',
    'yorkshirepost': 'Yorkshire Post',
    'manchestereveningnews': 'Manchester Evening News',
    'liverpoolecho': 'Liverpool Echo',
    'birminghammail': 'Birmingham Mail',
    'chroniclelive': 'Chronicle Live',
    'walesonline': 'Wales Online',
    'irishnews': 'Irish News',
    'theirishpost': 'The Irish Post',
    'thetablet': 'The Tablet',
    
    // Medios estadounidenses
    'nytimes': 'The New York Times',
    'washingtonpost': 'The Washington Post',
    'wsj': 'The Wall Street Journal',
    'usatoday': 'USA Today',
    'cnn': 'CNN',
    'foxnews': 'Fox News',
    'nbcnews': 'NBC News',
    'abcnews': 'ABC News',
    'cbsnews': 'CBS News',
    'npr': 'NPR',
    'pbs': 'PBS',
    'politico': 'Politico',
    'thehill': 'The Hill',
    'bloomberg': 'Bloomberg',
    'reuters': 'Reuters',
    'apnews': 'AP News',
    'latimes': 'Los Angeles Times',
    'chicagotribune': 'Chicago Tribune',
    'sfgate': 'San Francisco Chronicle',
    'miamiherald': 'Miami Herald',
    'bostonglobe': 'The Boston Globe',
    'dallasnews': 'The Dallas Morning News',
    'startribune': 'Star Tribune',
    'philly': 'Philadelphia Inquirer',
    'houstonchronicle': 'Houston Chronicle',
    'seattletimes': 'The Seattle Times',
    'denverpost': 'The Denver Post',
    'ajc': 'Atlanta Journal-Constitution',
    'tampabay': 'Tampa Bay Times',
    'slate': 'Slate',
    'vox': 'Vox',
    'huffpost': 'HuffPost',
    'buzzfeednews': 'BuzzFeed News',
    'axios': 'Axios',
    'propublica': 'ProPublica',
    'motherjones': 'Mother Jones',
    'theatlantic': 'The Atlantic',
    'newyorker': 'The New Yorker',
    'time': 'Time',
    'newsweek': 'Newsweek',
    'forbes': 'Forbes',
    'fortune': 'Fortune',
    'businessinsider': 'Business Insider',
    'techcrunch': 'TechCrunch',
    'wired': 'Wired',
    'cnet': 'CNET',
    'engadget': 'Engadget',
    'espn': 'ESPN',
    'si': 'Sports Illustrated',
    'bleacherreport': 'Bleacher Report'
  };
  
  return specialNames[name] || name.charAt(0).toUpperCase() + name.slice(1);
}

// Función para renderizar los medios en el grid
async function renderMediaGrid(mediaList, selectedDomains) {
  const grid = document.getElementById("sourcesGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  // Obtener el orden de deselección del país actual
  const st = await getSettings();
  const currentCountry = st.country || "es";
  const deselectedOrderByCountry = st.deselectedOrderByCountry || {};
  const deselectedOrder = deselectedOrderByCountry[currentCountry] || [];
  
  // Separar medios seleccionados y no seleccionados
  const selected = [];
  const unselected = [];
  
  mediaList.forEach(domain => {
    if (selectedDomains.includes(domain)) {
      selected.push(domain);
    } else {
      unselected.push(domain);
    }
  });
  
  // Ordenar los seleccionados por orden de selección (primeros seleccionados primero)
  selected.sort((a, b) => {
    const indexA = selectedDomains.indexOf(a);
    const indexB = selectedDomains.indexOf(b);
    return indexA - indexB; // Orden normal: último en seleccionar, último en la lista
  });
  
  // Ordenar los no seleccionados: último deseleccionado primero, luego alfabético
  unselected.sort((a, b) => {
    const indexA = deselectedOrder.indexOf(a);
    const indexB = deselectedOrder.indexOf(b);
    
    // Si ambos están en el historial de deselección
    if (indexA !== -1 && indexB !== -1) {
      return indexB - indexA; // Último deseleccionado primero
    }
    // Si solo A está en el historial
    if (indexA !== -1) return -1;
    // Si solo B está en el historial
    if (indexB !== -1) return 1;
    // Si ninguno está en el historial, orden alfabético
    return a.localeCompare(b);
  });
  
  // Combinar: seleccionados primero, luego no seleccionados
  const orderedList = [...selected, ...unselected];
  
  orderedList.forEach(domain => {
    const item = document.createElement("div");
    const isCustom = isCustomMedia(domain, currentCountry, st.customMediaByCountry);
    const baseClass = `source-item ${selectedDomains.includes(domain) ? 'selected' : ''}`;
    item.className = isCustom ? `${baseClass} custom-media-item` : baseClass;
    item.dataset.domain = domain;
    
    const icon = document.createElement("img");
    icon.className = "source-icon";
    icon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    icon.alt = domain;
    icon.onerror = () => {
      icon.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23666'><rect width='24' height='24' rx='4' fill='%23f3f4f6'/><text x='12' y='16' text-anchor='middle' font-size='12' fill='%23666'>📰</text></svg>";
    };
    
    const name = document.createElement("div");
    name.className = "source-name";
    name.textContent = getCleanMediaName(domain);
    
    item.appendChild(icon);
    item.appendChild(name);
    
    // Event listeners
    item.onclick = (e) => {
      if (e.button === 0) { // Click izquierdo
        toggleMediaSelection(domain);
      }
    };
    
    // Solo añadir menú contextual para medios personalizados
    if (isCustom) {
      item.oncontextmenu = (e) => showContextMenu(e, domain);
      item.style.cursor = 'context-menu';
    }
    
    grid.appendChild(item);
  });
}

// Función para alternar la selección de un medio
async function toggleMediaSelection(domain) {
  const st = await getSettings();
  const currentCountry = st.country || "es";
  
  const currentDomains = st.domainsByCountry[currentCountry] || [];
  const deselectedOrderByCountry = st.deselectedOrderByCountry || {};
  const deselectedOrder = deselectedOrderByCountry[currentCountry] || [];

  const wasSelected = currentDomains.includes(domain);
  let newDomains;
  let newDeselectedOrder = [...deselectedOrder];

  if (wasSelected) {
    // Deseleccionar: remover del array de seleccionados
    newDomains = currentDomains.filter(d => d !== domain);

    // Añadir al final del historial de deselección (será el más reciente)
    newDeselectedOrder = newDeselectedOrder.filter(d => d !== domain); // Remover si ya estaba
    newDeselectedOrder.push(domain); // Añadir al final

    // Mantener solo los últimos 20 deseleccionados para no crecer indefinidamente
    if (newDeselectedOrder.length > 20) {
      newDeselectedOrder = newDeselectedOrder.slice(-20);
    }
  } else {
    // Seleccionar: añadir al final del array de seleccionados
    newDomains = [...currentDomains, domain];

    // Remover del historial de deselección ya que ahora está seleccionado
    newDeselectedOrder = newDeselectedOrder.filter(d => d !== domain);
  }

  // Actualizar los datos por país
  const newDomainsByCountry = { ...st.domainsByCountry };
  newDomainsByCountry[currentCountry] = newDomains;

  const newDeselectedOrderByCountry = { ...deselectedOrderByCountry };
  newDeselectedOrderByCountry[currentCountry] = newDeselectedOrder;

  await saveSettings({
    domainsByCountry: newDomainsByCountry,
    deselectedOrderByCountry: newDeselectedOrderByCountry
  });

  // Solo actualizar el contador sin re-renderizar todo el grid
  const sourceCountEl = document.getElementById("sourceCount");
  if (sourceCountEl) {
    sourceCountEl.textContent = String(newDomains.length);
  }

  // Actualizar solo el estado visual del elemento clickeado
  const clickedItem = document.querySelector(`[data-domain="${domain}"]`);
  if (clickedItem) {
    if (wasSelected) {
      clickedItem.classList.remove('selected');
    } else {
      clickedItem.classList.add('selected');
    }
  }

  // Solo re-ordenar si es necesario (cuando se deselecciona algo)
  if (wasSelected) {
    // Esperar un poco para que la transición visual se vea suave
    setTimeout(async () => {
      const filteredMedia = await getFilteredMedia();
      await renderMediaGrid(filteredMedia, newDomains);
    }, 150);
  }
}

// Función para filtrar medios según el texto de búsqueda
async function getFilteredMedia() {
  const st = await getSettings();
  const currentCountry = st.country || "es";
  const mediaList = await getMediaForCountry(currentCountry);
  
  const searchInput = document.getElementById("sourceSearch");
  if (!searchInput) return mediaList;
  
  const searchTerm = searchInput.value.toLowerCase();
  if (!searchTerm) return mediaList;
  
  return mediaList.filter(domain => 
    domain.toLowerCase().includes(searchTerm) ||
    getCleanMediaName(domain).toLowerCase().includes(searchTerm)
  );
}

// Función para limpiar y validar una URL
function cleanUrl(url) {
  // Remover protocolo si existe
  url = url.replace(/^https?:\/\//, '');
  // Remover www si existe
  url = url.replace(/^www\./, '');
  // Remover path y parámetros
  url = url.split('/')[0].split('?')[0].split('#')[0];
  // Convertir a minúsculas
  url = url.toLowerCase().trim();
  
  return url;
}

// Función para validar si una URL es válida
function isValidDomain(domain) {
  const domainRegex = /^[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?)*$/;
  return domainRegex.test(domain) && domain.includes('.');
}

// Función para verificar si un medio es personalizado
function isCustomMedia(domain, countryCode, customMediaByCountry) {
  const customMedia = customMediaByCountry[countryCode] || [];
  return customMedia.includes(domain);
}

// Variables para el menú contextual
let contextMenuTarget = null;

// Función para mostrar el menú contextual
function showContextMenu(event, domain) {
  event.preventDefault();
  event.stopPropagation();
  
  const contextMenu = document.getElementById("contextMenu");
  if (!contextMenu) return;
  
  contextMenuTarget = domain;
  
  // Posicionar el menú
  const rect = event.target.closest('.source-item').getBoundingClientRect();
  const dropdownRect = document.getElementById("sourcesDropdown").getBoundingClientRect();
  
  contextMenu.style.display = "block";
  contextMenu.style.left = `${event.clientX - dropdownRect.left}px`;
  contextMenu.style.top = `${event.clientY - dropdownRect.top}px`;
  
  // Ajustar si se sale del contenedor
  setTimeout(() => {
    const menuRect = contextMenu.getBoundingClientRect();
    const containerRect = dropdownRect;
    
    if (menuRect.right > containerRect.right) {
      contextMenu.style.left = `${containerRect.right - dropdownRect.left - menuRect.width - 5}px`;
    }
    
    if (menuRect.bottom > containerRect.bottom) {
      contextMenu.style.top = `${containerRect.bottom - dropdownRect.top - menuRect.height - 5}px`;
    }
  }, 0);
}

// Función para ocultar el menú contextual
function hideContextMenu() {
  const contextMenu = document.getElementById("contextMenu");
  if (contextMenu) {
    contextMenu.style.display = "none";
  }
  contextMenuTarget = null;
}

// Función para eliminar un medio personalizado
async function deleteCustomMedia(domain) {
  const st = await getSettings();
  const currentCountry = st.country || "es";
  
  const currentCustomMedia = st.customMediaByCountry[currentCountry] || [];
  
  // Verificar que es un medio personalizado
  if (!currentCustomMedia.includes(domain)) {
    return;
  }
  
  // Remover el medio personalizado
  const newCustomMedia = currentCustomMedia.filter(d => d !== domain);
  const newCustomMediaByCountry = { ...st.customMediaByCountry };
  newCustomMediaByCountry[currentCountry] = newCustomMedia;
  
  // También removerlo de los dominios seleccionados si está seleccionado
  const currentDomains = st.domainsByCountry[currentCountry] || [];
  const newDomains = currentDomains.filter(d => d !== domain);
  const newDomainsByCountry = { ...st.domainsByCountry };
  newDomainsByCountry[currentCountry] = newDomains;
  
  // También removerlo del historial de deselección
  const deselectedOrderByCountry = st.deselectedOrderByCountry || {};
  const currentDeselectedOrder = deselectedOrderByCountry[currentCountry] || [];
  const newDeselectedOrder = currentDeselectedOrder.filter(d => d !== domain);
  const newDeselectedOrderByCountry = { ...deselectedOrderByCountry };
  newDeselectedOrderByCountry[currentCountry] = newDeselectedOrder;
  
  await saveSettings({ 
    customMediaByCountry: newCustomMediaByCountry,
    domainsByCountry: newDomainsByCountry,
    deselectedOrderByCountry: newDeselectedOrderByCountry
  });
  
  // Actualizar la vista
  const updatedSettings = await getSettings();
  const filteredMedia = await getFilteredMedia();
  await renderMediaGrid(filteredMedia, updatedSettings.domains);
  
  // Actualizar contador
  const sourceCountEl = document.getElementById("sourceCount");
  if (sourceCountEl) {
    sourceCountEl.textContent = String(updatedSettings.domains.length);
  }
  
  // Ocultar el menú contextual
  hideContextMenu();
}

// Función para añadir un medio personalizado
async function addCustomMedia() {
  const input = document.getElementById("customMediaUrl");
  const button = document.getElementById("addCustomMedia");
  
  if (!input || !button) return;
  
  const st = await getSettings();
  const currentCountry = st.country || "es";
  
  const rawUrl = input.value.trim();
  if (!rawUrl) return;
  
  const cleanedUrl = cleanUrl(rawUrl);
  
  if (!isValidDomain(cleanedUrl)) {
    input.style.borderColor = '#ef4444';
    input.placeholder = 'Invalid domain format';
    setTimeout(() => {
      input.style.borderColor = '#d1d5db';
      input.placeholder = 'Add custom media URL (e.g. example.com)';
    }, 2000);
    return;
  }
  
  const currentCustomMedia = st.customMediaByCountry[currentCountry] || [];
  const allCurrentMedia = await getMediaForCountry(currentCountry);
  
  // Verificar si ya existe
  if (allCurrentMedia.includes(cleanedUrl)) {
    input.style.borderColor = '#f59e0b';
    input.value = '';
    input.placeholder = 'Media already exists';
    setTimeout(() => {
      input.style.borderColor = '#d1d5db';
      input.placeholder = 'Add custom media URL (e.g. example.com)';
    }, 2000);
    return;
  }
  
  // Añadir el nuevo medio personalizado
  const newCustomMedia = [...currentCustomMedia, cleanedUrl];
  const newCustomMediaByCountry = { ...st.customMediaByCountry };
  newCustomMediaByCountry[currentCountry] = newCustomMedia;
  
  // También seleccionar automáticamente el nuevo medio
  const currentDomains = st.domainsByCountry[currentCountry] || [];
  const newDomains = currentDomains.includes(cleanedUrl) 
    ? currentDomains 
    : [...currentDomains, cleanedUrl];
  const newDomainsByCountry = { ...st.domainsByCountry };
  newDomainsByCountry[currentCountry] = newDomains;
  
  await saveSettings({ 
    customMediaByCountry: newCustomMediaByCountry,
    domainsByCountry: newDomainsByCountry
  });
  
  // Limpiar el input
  input.value = '';
  input.style.borderColor = '#10b981';
  input.placeholder = 'Added successfully!';
  setTimeout(() => {
    input.style.borderColor = '#d1d5db';
    input.placeholder = 'Add custom media URL (e.g. example.com)';
  }, 2000);
  
  // Actualizar la vista con los nuevos datos
  // Obtener la lista actualizada de medios directamente
  const updatedMediaList = await getMediaForCountry(currentCountry);
  
  // Aplicar filtro si existe
  const searchInput = document.getElementById("sourceSearch");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const filteredMedia = searchTerm 
    ? updatedMediaList.filter(domain => 
        domain.toLowerCase().includes(searchTerm) ||
        getCleanMediaName(domain).toLowerCase().includes(searchTerm)
      )
    : updatedMediaList;
  
  await renderMediaGrid(filteredMedia, newDomains);
  
  // Actualizar contador con el nuevo número
  const sourceCountEl = document.getElementById("sourceCount");
  if (sourceCountEl) {
    sourceCountEl.textContent = String(newDomains.length);
  }
}

// Función para mostrar/ocultar el desplegable de medios
function toggleSourcesDropdown() {
  const dropdown = document.getElementById("sourcesDropdown");
  if (!dropdown) return;
  
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
    // Renderizar los medios cuando se abre
    getSettings().then(async st => {
      const filteredMedia = await getFilteredMedia();
      await renderMediaGrid(filteredMedia, st.domains);
    });
  } else {
    dropdown.style.display = "none";
  }
}

function renderSettings(st) {
  const limitEl = document.getElementById("limit");
  const openModeEl = document.getElementById("openMode");
  const countryEl = document.getElementById("country");
  const privacyEl = document.getElementById("privacyNoHistory");
  const sourceCountEl = document.getElementById("sourceCount");
  const historyEl = document.getElementById("history");

  if (limitEl) limitEl.value = String(st.limit);
  if (openModeEl) openModeEl.value = st.openMode;
  if (countryEl) countryEl.value = st.country || "es";
  if (privacyEl) privacyEl.checked = !!st.noHistory;
  if (sourceCountEl) sourceCountEl.textContent = String(st.domains.length);

  // Renderizar configuraciones avanzadas
  const sortByEl = document.getElementById("sortBy");
  const timeRangeEl = document.getElementById("timeRange");
  const contentTypeEl = document.getElementById("contentType");
  const searchModeEl = document.getElementById("searchMode");
  const diversifyEl = document.getElementById("diversifySources");
  const trustedOnlyEl = document.getElementById("trustedOnly");

  if (sortByEl) sortByEl.value = st.sortBy || "relevance";
  if (timeRangeEl) timeRangeEl.value = st.timeRange || "any";
  if (contentTypeEl) contentTypeEl.value = st.contentType || "any";
  if (searchModeEl) searchModeEl.value = st.searchMode || "balanced";
  if (diversifyEl) diversifyEl.checked = st.diversifySources !== false;
  if (trustedOnlyEl) trustedOnlyEl.checked = !!st.trustedOnly;

  if (historyEl) {
    historyEl.innerHTML = "";
    (st.history || []).slice(0,3).forEach(q => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = q.length > 60 ? q.slice(0,57)+"…" : q;
      a.onclick = async (e) => {
        e.preventDefault();
        runSearch(q);
      };
      li.appendChild(a);
      historyEl.appendChild(li);
    });
  }
}

async function runSearch(query) {
  const status = document.getElementById("status");
  const searchBtn = document.getElementById("searchBtn");
  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const st = await getSettings();
  
  if (status) {
    status.textContent = "Searching…";
    status.className = "muted status-loading";
  }
  if (searchBtn) {
    searchBtn.disabled = true;
  }

  if (!st.domains.length) {
    if (status) {
      status.textContent = "Add sources first";
      status.className = "muted status-error";
    }
    if (searchBtn) {
      searchBtn.disabled = false;
    }
    return;
  }
  
  if (!query) {
    // reintenta obtener selección si no vino prefijada
    try {
      query = await getSelText(tab.id);
      if (!query) {
        // si no hay selección, intenta obtener el <title> de la página
        const [{ result: title }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.title || ""
        });
        query = title.trim();
      }
    } catch (error) {
      console.error("Error getting text:", error);
    }
    
    if (!query) {
      if (status) {
        status.textContent = "No selection";
        status.className = "muted status-error";
      }
      if (searchBtn) {
        searchBtn.disabled = false;
      }
      return;
    }
  }

  // Envía mensaje al background para usar el backend
  chrome.runtime.sendMessage({
    type: "POPUP_SEARCH",
    payload: {
      q: query,
      domains: st.domains,
      num: Number(st.limit),
      openMode: st.openMode,
      country: st.country || "es"
    }
  }, (resp) => {
    if (chrome.runtime.lastError) {
      if (status) {
        status.textContent = "Connection error";
        status.className = "muted status-error";
      }
    } else {
      if (status) {
        status.textContent = resp?.ok ? "Ready" : (resp?.error || "Error");
        status.className = resp?.ok ? "muted status-success" : "muted status-error";
      }
    }
    if (searchBtn) {
      searchBtn.disabled = false;
    }
  });

  // Historial
  if (!st.noHistory) {
    const hist = [query, ...(st.history || [])].filter(Boolean).slice(0, 20);
    await saveSettings({ history: hist });
    renderSettings({ ...st, history: hist });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const st = await getSettings();
  renderSettings(st);

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.onclick = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      let query = await getSelText(tab.id);
      if (!query) {
        // si no hay selección, intenta obtener el <title> de la página
        const [{ result: title }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.title || ""
        });
        query = title.trim();
      }
      runSearch(query);
    };
  }

  const toggleSourcesBtn = document.getElementById("toggleSources");
  if (toggleSourcesBtn) {
    toggleSourcesBtn.onclick = (e) => {
      e.preventDefault();
      toggleSourcesDropdown();
    };
  }

  const limitSelect = document.getElementById("limit");
  if (limitSelect) {
    limitSelect.onchange = e => saveSettings({ limit: Number(e.target.value) });
  }

  const openModeSelect = document.getElementById("openMode");
  if (openModeSelect) {
    openModeSelect.onchange = e => saveSettings({ openMode: e.target.value });
  }

  const countrySelect = document.getElementById("country");
  if (countrySelect) {
    countrySelect.onchange = async e => {
      const newCountry = e.target.value;
      
      // Simplemente cambiar el país
      await saveSettings({ country: newCountry });
      
      // Obtener los nuevos settings con los dominios del nuevo país
      const st = await getSettings();
      
      // Actualizar el contador inmediatamente
      const sourceCountEl = document.getElementById("sourceCount");
      if (sourceCountEl) {
        sourceCountEl.textContent = String(st.domains.length);
      }
      
      // Si el desplegable de medios está abierto, actualizarlo con los nuevos medios
      const dropdown = document.getElementById("sourcesDropdown");
      if (dropdown && dropdown.style.display === "block") {
        const filteredMedia = await getFilteredMedia();
        await renderMediaGrid(filteredMedia, st.domains);
        
        // Limpiar el campo de búsqueda
        const searchInput = document.getElementById("sourceSearch");
        if (searchInput) {
          searchInput.value = "";
        }
      }
    };
  }

  const privacyCheckbox = document.getElementById("privacyNoHistory");
  if (privacyCheckbox) {
    privacyCheckbox.onchange = e => saveSettings({ noHistory: e.target.checked });
  }

  const clearHistoryBtn = document.getElementById("clearHistory");
  if (clearHistoryBtn) {
    clearHistoryBtn.onclick = async (e) => {
      e.preventDefault();
      await saveSettings({ history: [] });
      const s2 = await getSettings();
      renderSettings({ ...s2, history: [] });
    };
  }

  const helpBtn = document.getElementById("help");
  if (helpBtn) {
    helpBtn.onclick = (e) => {
      e.preventDefault();
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'How to use',
        message: 'Select text on any page and right-click → "Search in my media" or use the button above.'
      });
    };
  }

    // Event listener para el campo de búsqueda de medios
  const sourceSearch = document.getElementById("sourceSearch");
  if (sourceSearch) {
    let searchTimeout;
    sourceSearch.oninput = () => {
      // Debounce la búsqueda para evitar re-renders excesivos
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        getSettings().then(async st => {
          const filteredMedia = await getFilteredMedia();
          await renderMediaGrid(filteredMedia, st.domains);
        });
      }, 200);
    };
  }

  // Event listeners para el formulario de medios personalizados
  const addCustomMediaBtn = document.getElementById("addCustomMedia");
  if (addCustomMediaBtn) {
    addCustomMediaBtn.onclick = addCustomMedia;
  }

  const customMediaInput = document.getElementById("customMediaUrl");
  if (customMediaInput) {
    customMediaInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        addCustomMedia();
      }
    };
  }

  // Event listeners para el menú contextual
  const deleteCustomMediaBtn = document.getElementById("deleteCustomMedia");
  if (deleteCustomMediaBtn) {
    deleteCustomMediaBtn.onclick = () => {
      if (contextMenuTarget) {
        deleteCustomMedia(contextMenuTarget);
      }
    };
  }

  // Ocultar menú contextual al hacer click fuera
  document.addEventListener('click', (e) => {
    const contextMenu = document.getElementById("contextMenu");
    if (contextMenu && !contextMenu.contains(e.target)) {
      hideContextMenu();
    }
  });

  // Ocultar menú contextual al hacer scroll
  const sourcesDropdown = document.getElementById("sourcesDropdown");
  if (sourcesDropdown) {
    sourcesDropdown.addEventListener('scroll', hideContextMenu);
  }

  // Event listeners para configuración avanzada
  const toggleAdvanced = document.getElementById("toggleAdvanced");
  if (toggleAdvanced) {
    toggleAdvanced.onclick = () => {
      const dropdown = document.getElementById("advancedDropdown");
      if (dropdown) {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      }
    };
  }

  // Guardar configuraciones avanzadas
  const sortByEl = document.getElementById("sortBy");
  const timeRangeEl = document.getElementById("timeRange");
  const contentTypeEl = document.getElementById("contentType");
  const searchModeEl = document.getElementById("searchMode");
  const diversifyEl = document.getElementById("diversifySources");
  const trustedOnlyEl = document.getElementById("trustedOnly");

  if (sortByEl) sortByEl.onchange = e => saveSettings({ sortBy: e.target.value });
  if (timeRangeEl) timeRangeEl.onchange = e => saveSettings({ timeRange: e.target.value });
  if (contentTypeEl) contentTypeEl.onchange = e => saveSettings({ contentType: e.target.value });
  if (searchModeEl) searchModeEl.onchange = e => saveSettings({ searchMode: e.target.value });
  if (diversifyEl) diversifyEl.onchange = e => saveSettings({ diversifySources: e.target.checked });
  if (trustedOnlyEl) trustedOnlyEl.onchange = e => saveSettings({ trustedOnly: e.target.checked });

  // Event listeners para presets
  const presetBreaking = document.getElementById("presetBreaking");
  const presetAnalysis = document.getElementById("presetAnalysis");
  const presetResearch = document.getElementById("presetResearch");
  const presetReset = document.getElementById("presetReset");

  if (presetBreaking) {
    presetBreaking.onclick = async () => {
      await saveSettings({
        sortBy: "date",
        timeRange: "d1",
        contentType: "news",
        searchMode: "balanced"
      });
      const st = await getSettings();
      renderSettings(st);
    };
  }

  if (presetAnalysis) {
    presetAnalysis.onclick = async () => {
      await saveSettings({
        sortBy: "relevance",
        timeRange: "m3",
        contentType: "analysis",
        searchMode: "semantic",
        trustedOnly: true
      });
      const st = await getSettings();
      renderSettings(st);
    };
  }

  if (presetResearch) {
    presetResearch.onclick = async () => {
      await saveSettings({
        sortBy: "relevance",
        timeRange: "any",
        contentType: "any",
        searchMode: "semantic",
        diversifySources: true
      });
      const st = await getSettings();
      renderSettings(st);
    };
  }

  if (presetReset) {
    presetReset.onclick = async () => {
      await saveSettings({
        sortBy: "relevance",
        timeRange: "any",
        contentType: "any",
        searchMode: "balanced",
        diversifySources: true,
        trustedOnly: false
      });
      const st = await getSettings();
      renderSettings(st);
    };
  }

});
