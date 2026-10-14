# Reglas y Mapa de Arquitectura - MacCell Web

Esta regla se carga automáticamente en Antigravity para que **NUNCA** tengas que inspeccionar los archivos uno por uno para entender el proyecto.

## 1. Mapa Rápido de Archivos y Responsabilidades

### 📁 Raíz (`/`)
- `index.html` (y `Inicio.html` sincronizado): Página principal de la tienda (Landing, Hero, Categorías, Destacados, Mapa, FAQ, Footer).
- `dev-server.js`: Servidor local Node.js ligero (puerto 5500) con tipos MIME y soporte UTF-8.
- `ESTRUCTURA_PROYECTO.md`: Documento maestro de arquitectura para el desarrollador.
- `_legacy/`: Archivos históricos en desuso (`app.js`, `products_antiguo.js`, copia suelta de Logo).

### 📁 `/data/` (Datos y Catálogo)
- `products.js`: **ÚNICA FUENTE DE VERDAD** para los productos y accesorios. Contiene el array `productos` con marcas, modelos, precios, especificaciones (`specsObj`), galería de imágenes, stock y valoraciones.

### 📁 `/js/` (Lógica Modular del Cliente)
- `main.js`: Controlador principal de eventos, navegación, carrito en `localStorage`, sliders, contadores y enlaces de WhatsApp.
- `products-render.js`: Renderizado dinámico del DOM (tarjetas de productos, filtros por categoría/gama, vista rápida y accesorios).
- `checkout-modal.js`: Modal interactivo de checkout para compras directas y pedidos vía WhatsApp con validación de datos.
- `ubicanos-map.js`: Inicialización y configuración del mapa interactivo Leaflet para la tienda física en C.C. Plaza TEC.
- `animated-icons-data.js`: Definiciones de íconos interactivos y animaciones SVG/Lottie.

### 📁 `/css/` (Estilos y Sistema de Diseño)
- `styles.css`: Estilos globales, paleta Dark Metallic de la marca, tipografía, cabecera, layout, footer y responsive media queries.
- `components.css`: Estilos específicos para componentes UI independientes (tarjetas, botones, badges, modales, drawer móvil).

### 📁 `/pages/` (Subpáginas de Navegación)
- `catalogo.html`: Catálogo completo con buscador, filtros avanzados por marca, rango de precio y ordenamiento.
- `nosotros.html`: Información sobre MacCell, propuesta de valor, misión, visión, garantías y equipo.
- `contacto.html`: Formulario de contacto, canales de atención al cliente y soporte.
- `ubicacion.html`: Guía de cómo llegar a la tienda física, horarios de atención y mapa interactivo.
- `marcas.html`: Redirección y acceso rápido por marcas.

### 📁 `/assets/img/` (Recursos Gráficos Organizados)
- `brands/`: Imágenes de smartphones ordenadas por fabricante (`Iphone/`, `Samsung/`, `Xiaomi/`, `Honor/`, `Motorola/`, `Poco/`, `Realme/`, `Redmi/`, `Tecno/`, `ZTEnubia/`, `Infinix/`).
- `ui/`: Elementos de interfaz (`Logo.jpeg`, subcarpetas `accesorios/`, `banners/`, `clientes-satisfechos/`).
- `icons/`: Íconos de interfaz y carpeta `animados/`.
- `trusted-bar/`: Logos de marcas aliadas para la barra de confianza.

---

## 2. Reglas de Trabajo para el Asistente AI
1. **No buscar a ciegas**: Si el usuario pide agregar o editar un producto, ve directo a `data/products.js`.
2. **No buscar estilos a ciegas**: Si pide estilos generales, ve a `css/styles.css`; si pide componentes, ve a `css/components.css`.
3. **No buscar lógica a ciegas**: Para renderizado usa `js/products-render.js`; para el carrito y WhatsApp usa `js/main.js` y `js/checkout-modal.js`.
4. **Respetar la convención de rutas**: Las páginas en `pages/` acceden con `../` (ej: `../assets/...`, `../css/...`, `../data/...`, `../js/...`), mientras que `index.html` accede directamente (ej: `assets/...`).
