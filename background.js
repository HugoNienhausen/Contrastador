// ID del menú contextual
const CONTEXT_MENU_ID = "searchInMyMedia";

// Configuración de Google API (valores predeterminados seguros)
const GOOGLE_API_CONFIG = {
  apiKey: "AIzaSyA4jkOe4vbhj_mIz4fBI8whoSvXtHmTZ8U",
  searchEngineId: "d13630a720a12460b"
};

// Crear menú contextual al instalar la extensión
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensión instalada, creando menú contextual");
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Buscar en mis medios",
    contexts: ["selection"]
  });
});

// Escuchar clic en el menú contextual
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("Menú contextual clickeado:", info);
  if (info.menuItemId === CONTEXT_MENU_ID) {
    const selectedText = info.selectionText;
    console.log("Texto seleccionado:", selectedText);
    
    if (!selectedText || selectedText.trim() === "") {
      console.log("No hay texto seleccionado");
      showNotification("Error", "No se ha seleccionado texto");
      return;
    }
    

    
    // Leer configuración de medios
    const result = await chrome.storage.sync.get(['domainsByCountry', 'limit', 'openMode', 'country']);
    const currentCountry = result.country || "es";
    const domains = result.domainsByCountry?.[currentCountry] || [];
    const limit = result.limit || 8;
    const openMode = result.openMode || "tab";
    
    if (domains.length === 0) {
      showNotification(
        "Sin medios configurados", 
        "Ve a la extensión para seleccionar tus medios favoritos"
      );
      return;
    }
    
    // Realizar búsqueda
    performSearch(selectedText, domains, limit, openMode);
  }
});

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Mensaje recibido:", request);
  
  if (request.type === "POPUP_SEARCH") {
    handlePopupSearch(request.payload, sendResponse);
    return true; // Mantener el canal abierto para respuesta asíncrona
  }
  

});

// Manejar búsqueda desde popup
async function handlePopupSearch(payload, sendResponse) {
  try {
    const { q, domains, num, openMode } = payload;
    
    await performSearch(q, domains, num, openMode);
    sendResponse({ ok: true });
  } catch (error) {
    console.error("Error en búsqueda desde popup:", error);
    sendResponse({ ok: false, error: error.message });
  }
}

// Función principal para realizar búsqueda
async function performSearch(query, domains, num, openMode) {
  console.log("Realizando búsqueda:", { query, domains, num, openMode });
  
  try {
    // Realizar búsqueda en Google Custom Search API
    const searchResults = await searchInGoogleAPI(query, domains, num);
    console.log("Resultados obtenidos:", searchResults.length);
    
    // Siempre mostrar resultados en popup
    openResultsInTab(query, searchResults);
    
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    showNotification("Error", `Error en la búsqueda: ${error.message}`);
    throw error;
  }
}

// Función para construir query avanzada basada en configuraciones
function buildAdvancedQuery(query, siteQuery, settings) {
  const cleanQuery = query.trim();
  
  // Limpiar y preparar términos de búsqueda
  const words = cleanQuery.split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['que', 'con', 'por', 'para', 'una', 'del', 'las', 'los', 'esto', 'esta'].includes(word.toLowerCase()));
  
  let searchQuery;
  
  // Aplicar modo de búsqueda
  switch (settings.searchMode) {
    case 'exact':
      searchQuery = `"${cleanQuery}"`;
      break;
      
    case 'broad':
      searchQuery = words.join(' OR ');
      break;
      
    case 'semantic':
      if (words.length === 1) {
        searchQuery = `${cleanQuery} OR related:${cleanQuery}`;
      } else {
        searchQuery = `"${cleanQuery}" OR (${words.join(' OR ')})`;
      }
      break;
      
    case 'balanced':
    default:
      // Lógica balanceada actual
      if (words.length === 1) {
        searchQuery = cleanQuery;
      } else if (words.length === 2) {
        searchQuery = `"${cleanQuery}" OR (${words.join(' AND ')})`;
      } else {
        const mainTerms = words.slice(0, 3);
        searchQuery = `"${cleanQuery}" OR (${mainTerms.join(' AND ')})`;
      }
      break;
  }
  
  // Añadir filtros de tipo de contenido
  if (settings.contentType === 'news') {
    searchQuery += ' (noticia OR breaking OR último OR actualidad)';
  } else if (settings.contentType === 'analysis') {
    searchQuery += ' (análisis OR opinión OR editorial OR columna)';
  } else if (settings.contentType === 'reports') {
    searchQuery += ' (reportaje OR investigación OR especial OR informe)';
  }
  
  return `(${searchQuery}) (${siteQuery})`;
}

// Función para buscar en Google Custom Search API
async function searchInGoogleAPI(query, domains, num) {
  console.log("Enviando petición a Google API:", { query, domains, num });
  
  // Leer configuraciones avanzadas
  const advancedSettings = await chrome.storage.sync.get([
    'sortBy', 'timeRange', 'contentType', 'searchMode', 
    'diversifySources', 'trustedOnly'
  ]);
  
  console.log("Configuraciones avanzadas:", advancedSettings);
  
  const { apiKey: googleApiKey, searchEngineId: googleSearchEngineId } = GOOGLE_API_CONFIG;
  
  // Construir la query usando las configuraciones avanzadas
  const siteQuery = domains.map(domain => `site:${domain}`).join(' OR ');
  const fullQuery = buildAdvancedQuery(query, siteQuery, advancedSettings);
  
  console.log(`Búsqueda con configuración: "${query}" → "${fullQuery}"`);
  console.log(`Modo: ${advancedSettings.searchMode || 'balanced'}, Tipo: ${advancedSettings.contentType || 'any'}`);
  
  // Construir URL de la API
  const params = new URLSearchParams({
    key: googleApiKey,
    cx: googleSearchEngineId,
    q: fullQuery,
    num: Math.min(num, 10), // Google API límite de 10
    safe: 'active',
    hl: 'es'
  });

  // Añadir parámetros condicionales basados en configuración
  if (advancedSettings.sortBy === 'date') {
    params.append('sort', 'date');
  }

  if (advancedSettings.timeRange && advancedSettings.timeRange !== 'any') {
    params.append('dateRestrict', advancedSettings.timeRange);
  }
  
  const url = `https://www.googleapis.com/customsearch/v1?${params}`;
  
  try {
    const response = await fetch(url);
    console.log("Respuesta de Google API:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Datos recibidos de Google:", data);
    
    // Procesar resultados
      const results = (data.items || []).map(item => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
    source: extractDomain(item.link),
    favicon: `https://www.google.com/s2/favicons?domain=${extractDomain(item.link)}&sz=64`,
    published_at: extractPublishedDate(item)
  }));
  
  // Ordenamiento inteligente: relevancia → fecha disponible → fecha reciente
  const sortedResults = results.sort((a, b) => {
    // 1. PRIORIDAD: Relevancia del título (más coincidencias primero)
    const queryWords = query.toLowerCase().split(/\s+/);
    const aMatches = queryWords.filter(word => a.title.toLowerCase().includes(word)).length;
    const bMatches = queryWords.filter(word => b.title.toLowerCase().includes(word)).length;
    
    if (bMatches !== aMatches) return bMatches - aMatches;
    
    // 2. SECUNDARIO: Artículos con fecha conocida
    const aHasDate = a.published_at !== null;
    const bHasDate = b.published_at !== null;
    
    if (aHasDate && !bHasDate) return -1;
    if (!aHasDate && bHasDate) return 1;
    
    // 3. TERCIARIO: Si ambos tienen fecha, más reciente primero
    if (aHasDate && bHasDate) {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);
      return dateB - dateA;
    }
    
    return 0; // Si son iguales en todo
  });
  
  return sortedResults;
    
  } catch (error) {
    console.error("Error en la petición a Google API:", error);
    throw error;
  }
}

// Extraer dominio de una URL
function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// Extraer fecha de publicación si está disponible
function extractPublishedDate(item) {
  try {
    // Intentar obtener fecha de los metadatos
    const metatags = item.pagemap?.metatags?.[0];
    if (metatags) {
      return metatags['article:published_time'] || 
             metatags['datePublished'] || 
             metatags['date'] ||
             null;
    }
    return null;
  } catch {
    return null;
  }
}

// Abrir resultados en popup
async function openResultsInTab(query, results) {
  try {
    // Obtener la ventana actual para posicionar el popup
    const currentWindow = await chrome.windows.getCurrent();
    
    // Calcular posición para que aparezca flotando sobre la ventana actual
    const popupLeft = currentWindow.left + Math.max(0, (currentWindow.width - 520) / 2);
    const popupTop = currentWindow.top + 80; // Un poco más abajo del top
    
    // Crear nueva ventana popup con la página de resultados
    const popup = await chrome.windows.create({
      url: chrome.runtime.getURL('results.html'),
      type: 'popup',
      width: 520,
      height: 650,
      left: Math.round(popupLeft),
      top: Math.round(popupTop),
      focused: false,
      state: 'normal',
      setSelfAsOpener: false  // Evitar que se asocie con la ventana principal
    });
    
    console.log('Popup created:', popup);
    
    // Enfocar la ventana después de crearla, pero sin maximizar
    setTimeout(() => {
      chrome.windows.update(popup.id, { focused: true });
    }, 100);
    
    // Esperar un poco para que la página se cargue
    setTimeout(() => {
      // Enviar los resultados a la página
      if (popup.tabs && popup.tabs[0]) {
        chrome.tabs.sendMessage(popup.tabs[0].id, {
          action: 'displayResults',
          query: query,
          results: results
        }).catch(error => {
          console.error('Error sending message to results page:', error);
        });
      }
    }, 500);
    
  } catch (error) {
    console.error('Error opening results popup:', error);
    // Fallback: usar notificación si falla el popup
    showResultsNotification(query, results);
  }
}

// Mostrar resultados en notificación (solo como fallback)
function showResultsNotification(query, results) {
  const count = results.length;
  const message = count > 0 
    ? `Encontrados ${count} resultados para "${query}".`
    : `No se encontraron resultados para "${query}".`;
    
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Búsqueda completada',
    message: message
  });
  
  // No abrir automáticamente ninguna pestaña
}



// Formatear fecha
function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Función para mostrar notificaciones
function showNotification(title, message) {
  console.log("Mostrando notificación:", title, message);
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: title,
    message: message
  });
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
