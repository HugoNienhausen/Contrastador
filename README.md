# 🔍 Buscar en Mis Medios - Chrome Extension

Una extensión de Chrome que permite buscar texto seleccionado en tus medios favoritos usando Google Custom Search API.

## 📋 Configuración Inicial

### 1. Configurar Google API

Antes de usar la extensión, debes reemplazar los placeholders en `background.js`:

```javascript
// En background.js, líneas 4-7, reemplaza:
const GOOGLE_API_CONFIG = {
  apiKey: "TU_GOOGLE_API_KEY_AQUI",
  searchEngineId: "TU_CUSTOM_SEARCH_ENGINE_ID_AQUI"
};
```

### 2. Obtener Credenciales de Google

#### Google API Key:
1. Ve a [Google Cloud Console](https://console.developers.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Habilita la "Custom Search API"
4. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
5. Copia la clave generada (empieza con `AIza...`)

#### Custom Search Engine ID:
1. Ve a [Google Custom Search](https://cse.google.com/cse/)
2. Crea un nuevo motor de búsqueda personalizado
3. En "Sitios para buscar" puedes poner `*` para buscar en toda la web
4. Una vez creado, ve a "Panel de control" → "Configuración básica"
5. Copia el "ID del motor de búsqueda" (formato: `017576662512468239146:omuauf_lfve`)

### 3. Instalar la Extensión

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa el "Modo de desarrollador" (esquina superior derecha)
3. Click en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `extension/`
5. ¡La extensión estará lista para usar!

## 🚀 Uso

### Seleccionar Medios
1. Click en el icono de la extensión
2. Selecciona el país (España, Francia, Alemania, Reino Unido, Estados Unidos)
3. Marca los medios de tu interés
4. Añade medios personalizados si quieres

### Buscar
1. Selecciona texto en cualquier página web
2. Click derecho → "Buscar en mis medios"
3. Se abrirá una nueva pestaña con los resultados

## 📁 Estructura del Proyecto

```
extension/
├── manifest.json       # Configuración de la extensión
├── background.js       # Lógica principal (⚠️ CONFIGURAR AQUÍ LAS API KEYS)
├── popup.html         # Interfaz del popup
├── popup.js           # Lógica del popup
├── icons/             # Iconos de la extensión
└── README.md          # Este archivo
```

## 🔒 Seguridad

- Las API keys están hardcodeadas en el código (como estaban en el `.env` del backend)
- Los datos de medios seleccionados se guardan en `chrome.storage.sync` (encriptado)
- No se envían datos a servidores externos excepto Google Custom Search API

## 🌍 Medios Incluidos

### España
El País, ABC, La Vanguardia, El Confidencial, 20 Minutos, etc.

### Francia  
Le Monde, Le Figaro, Le Parisien, 20 Minutes, BFM TV, etc.

### Alemania
Bild, Der Spiegel, Die Welt, FAZ, Süddeutsche Zeitung, etc.

### Reino Unido
BBC, The Guardian, Daily Mail, The Telegraph, The Independent, etc.

### Estados Unidos
NY Times, Washington Post, CNN, Fox News, NBC News, etc.

## ⚠️ Importante

**Antes de usar la extensión, asegúrate de:**
1. Reemplazar los placeholders en `background.js` con tus credenciales reales
2. Tener habilitada la Custom Search API en Google Cloud
3. Haber creado un motor de búsqueda personalizado

## 🆘 Problemas Comunes

- **"Error en la búsqueda"**: Verifica que las API keys sean correctas
- **"Sin medios configurados"**: Selecciona al menos un medio en el popup
- **No aparecen resultados**: Verifica que el motor de búsqueda esté configurado correctamente 