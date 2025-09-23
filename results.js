// Escuchar mensajes del background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'displayResults') {
    displayResults(request.query, request.results);
  }
});

// Mostrar resultados en la página
function displayResults(query, results) {
  // Ocultar loading
  const loadingState = document.getElementById('loadingState');
  if (loadingState) {
    loadingState.style.display = 'none';
  }
  
  // Mostrar query en el header
  const searchQuery = document.getElementById('searchQuery');
  if (searchQuery) {
    searchQuery.textContent = `"${query}"`;
  }
  
  // Mostrar contador de resultados
  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    resultsCount.textContent = `${results.length} resultados encontrados`;
    resultsCount.style.display = 'block';
  }
  
  // Renderizar resultados
  const container = document.getElementById('resultsContainer');
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>No se encontraron resultados</h3>
        <p>Intenta con otros términos de búsqueda o verifica tus medios seleccionados.</p>
      </div>
    `;
    return;
  }
  
  // Generar HTML de resultados
  container.innerHTML = results.map((result, index) => `
    <div class="result-item" data-url="${escapeHtml(result.url)}" data-index="${index}">
      <div class="result-header">
        <img src="${result.favicon}" alt="" class="result-favicon" data-index="${index}">
        <h3 class="result-title">${escapeHtml(result.title)}</h3>
      </div>
      <div class="result-source">${escapeHtml(result.source)}</div>
      <div class="result-snippet">${escapeHtml(result.snippet)}</div>
      ${result.published_at ? `<div class="result-date">${formatDate(result.published_at)}</div>` : ''}
    </div>
  `).join('');
  
  // Añadir event listeners después de crear el HTML
  addEventListeners();
}

// Añadir event listeners a los elementos
function addEventListeners() {
  // Event listeners para clicks en resultados
  const resultItems = document.querySelectorAll('.result-item');
  resultItems.forEach(item => {
    item.addEventListener('click', () => {
      const url = item.getAttribute('data-url');
      if (url) {
        openResult(url);
      }
    });
  });
  
  // Event listeners para errores de imágenes
  const favicons = document.querySelectorAll('.result-favicon');
  favicons.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });
}

// Abrir resultado en nueva pestaña
function openResult(url) {
  // Método simple: usar window.open y cerrar popup
  window.open(url, '_blank');
  window.close();
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

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  // La página está lista, esperando resultados del background script
  console.log('Results page loaded, waiting for data...');
}); 