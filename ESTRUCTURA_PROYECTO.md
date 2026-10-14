# 📱 MacCell Perú - Arquitectura y Guía de Carpetas

Este documento define la estructura oficial del proyecto para que **tanto tú como cualquier desarrollador o asistente de IA podamos ubicar cualquier archivo de forma inmediata**, sin tener que revisar cada carpeta a ciegas.

---

## 🗺️ Mapa Visual del Proyecto

```text
Js PC1/
│
├── 📄 index.html                # Página principal (Landing Page estándar)
├── 📄 Inicio.html               # Acceso alterno a la página de Inicio (sincronizado)
├── 🛡️ admin.html                # PANEL DE ADMINISTRACIÓN: agregar productos, stock, fotos y respaldos
├── ⚙️ dev-server.js             # Servidor de desarrollo local (Node.js en puerto 5500 con API de guardado)
├── 📖 ESTRUCTURA_PROYECTO.md    # Guía visual del proyecto y de cada archivo
│
├── 📂 assets/                   # Recursos estáticos (Imágenes y Multimedia)
│   └── 📂 img/
│       ├── 📂 brands/           # Fotos de teléfonos organizadas por marca:
│       │   ├── Honor/
│       │   ├── Infinix/
│       │   ├── Iphone/
│       │   ├── Motorola/
│       │   ├── Poco/
│       │   ├── Realme/
│       │   ├── Redmi/
│       │   ├── Samsung/
│       │   ├── Tecno/
│       │   ├── Xiaomi/
│       │   └── ZTEnubia/
│       ├── 📂 icons/            # Íconos y subcarpeta /animados (Lottie/SVG)
│       ├── 📂 trusted-bar/      # Logos para la barra de marcas aliadas
│       └── 📂 ui/               # Gráficos del sitio web:
│           ├── Logo.jpeg        # Logo oficial MacCell
│           ├── 📂 accesorios/   # Fotos de cargadores, audífonos, cables
│           ├── 📂 banners/      # Banners de promociones para el slider
│           └── 📂 clientes-satisfechos/ # Fotos testimoniales de clientes
│
├── 📂 css/                      # Estilos Visuales (Diseño y Componentes)
│   ├── 🎨 styles.css            # Estilos globales, paleta Dark Metallic, header, layout y footer
│   ├── 🧩 components.css        # Componentes UI (tarjetas de producto, botones, modales, drawer móvil)
│   └── 🛡️ admin.css             # Estilos exclusivos del Panel de Administrador (Dark Metallic Pro)
│
├── 📂 data/                     # Base de Datos Front-End
│   └── 📦 products.js           # FUENTE ÚNICA DE VERDAD: catálogo sincronizado con el Panel Admin
│
├── 📂 js/                       # Lógica Modular y Controladores
│   ├── 🛡️ admin.js              # Controlador del Panel Admin (CRUD, fotos, stock +/- y exportación)
│   ├── ⚡ main.js               # Eventos globales, navegación, persistencia de carrito (localStorage)
│   ├── 🖼️ products-render.js    # Motor de renderizado dinámico de tarjetas, filtros y vistas rápidas
│   ├── 🛒 checkout-modal.js     # Modal de compras y generación de pedidos automáticos a WhatsApp
│   ├── 📍 ubicanos-map.js       # Inicialización del mapa interactivo Leaflet (tienda física Plaza TEC)
│   └── ✨ animated-icons-data.js # Datos y lógica de íconos animados interactivos
│
├── 📂 pages/                    # Vistas y Páginas Secundarias
│   ├── 🛍️ catalogo.html        # Catálogo general con filtros dinámicos por marca, precio y gama
│   ├── 🏢 nosotros.html        # Quiénes somos, propuesta de valor, misión, visión y garantías
│   ├── ✉️ contacto.html        # Formulario de soporte, preguntas frecuentes y canales oficiales
│   ├── 🗺️ ubicacion.html       # Página dedicada con mapa interactivo y cómo llegar
│   ├── 🏷️ marcas.html          # Redirección rápida al catálogo filtrado por marca
│   └── 🛡️ admin.html           # Redirección amigable al Panel de Administración principal
│
├── 📂 _legacy/                  # Archivos históricos archivados (para evitar confusiones)
│   ├── app.js                   # Antiguo script monolítico (reemplazado por js/main.js)
│   ├── products_antiguo.js      # Antiguo archivo de productos (reemplazado por data/products.js)
│   └── Logo_copia_raiz.jpeg     # Copia suelta antigua de la raíz (el logo activo está en assets/img/ui/)
│
└── 📂 .agents/                  # Reglas automáticas para que Antigravity IA entienda el proyecto
    └── 📂 rules/
        └── arquitectura.md      # Regla cargada automáticamente en cada conversación
```

---

## 🧭 ¿Dónde se modifica cada cosa? (Guía Rápida)

| ¿Qué deseas hacer? | Archivo a editar o usar | ¿Por qué? |
| :--- | :--- | :--- |
| **Panel Administrativo Oculto (Usuario: `TheDino` / Clave: `Dino555.`)** | `admin.html` (o `?admin`) | Totalmente invisible para clientes. Acceso con tecla `Ctrl+Shift+A`, triple clic en logo o enlace directo. |
| **Agregar celulares, modificar stock o cambiar fotos de forma visual** | `admin.html` | Panel visual interactivo con botones +/- para stock, subida de fotos y guardado en vivo. |
| **Agregar o editar un celular o accesorio manualmente** | `data/products.js` | Base de datos modular del catálogo. |
| **Descargar código actualizado desde el Panel** | `admin.html` (botón Descargar JS) | Genera automáticamente el archivo `data/products.js` sin tener que escribir código a mano. |
| **Agregar fotos de un celular nuevo a carpetas** | `assets/img/brands/[Marca]/` | Las fotos locales se guardan en la carpeta correspondiente a su fabricante. |
| **Cambiar colores, fuentes o márgenes generales de la tienda** | `css/styles.css` | Maneja las variables CSS (`:root`), tipografías y contenedores base. |
| **Modificar cómo se ven las tarjetas o modales de la tienda** | `css/components.css` | Contiene los estilos específicos de cada bloque visual reutilizable. |
| **Personalizar el diseño del panel de administrador** | `css/admin.css` | Estilos limpios y modulares del dashboard de inventario. |
| **Cambiar cómo se dibuja el catálogo en pantalla** | `js/products-render.js` | Genera el HTML dinámico de cada tarjeta y modal de producto. |
| **Modificar el carrito de compras o WhatsApp** | `js/main.js` y `js/checkout-modal.js` | Controlan la lógica del carrito, sumas de precios y el mensaje enviado a WhatsApp. |
| **Cambiar la ubicación o marcador del mapa** | `js/ubicanos-map.js` | Configura las coordenadas GPS y el popup de Plaza TEC. |
| **Editar páginas de contenido específico** | `pages/*.html` | Cada archivo HTML en `pages/` representa una sección dedicada del sitio. |

---

## 💡 Ventajas de este Orden

1. **Cero duplicidad**: Ya no hay dos archivos de productos (`js/products.js` vs `data/products.js`), ni dos scripts de app (`js/app.js` vs `js/main.js`).
2. **Predictibilidad total**: Si tú o la IA buscan algo, se sabe exactamente la carpeta en un segundo.
3. **Seguridad**: Los archivos viejos no fueron borrados, sino organizados en `_legacy/` por si necesitas consultar código anterior.
