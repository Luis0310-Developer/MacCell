const fs = require('fs');
const path = require('path');

const xiaomiRedmiProducts = [
  // 1. REDMI A5 64GB/3+3RAM S/360®️
  {
    id: "redmi-a5-64gb",
    nombre: "Xiaomi Redmi A5 64GB (3+3GB RAM)",
    name: "Xiaomi Redmi A5 64GB (3+3GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 360,
    price: 360,
    originalPrice: 410,
    imagen: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    image: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    badge: "PRECIO ESPECIAL",
    badgeType: "offer",
    registro: "R",
    stock: 18,
    rating: 4.7,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["64 GB Expandible", "3GB + 3GB RAM", "Pantalla 90Hz", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.71\" HD+ 90Hz Confort Visual",
      processor: "MediaTek Helio G36 Octa-Core",
      ram: "3 GB (+3GB Virtual = 6GB)",
      storage: "64 GB (MicroSD hasta 1TB)",
      cameras: "8 MP AI Dual + Frontal 5 MP",
      battery: "5,000 mAh | Conector Tipo-C"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Verde Menta"],
    description: "Smartphone de entrada sumamente confiable y económico con pantalla fluida a 90Hz, memoria expandible y batería de 5,000 mAh para todo el día. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 2. REDMI A7 PRO 64GB/4+4RAM S/380®
  {
    id: "redmi-a7-pro-64gb",
    nombre: "Xiaomi Redmi A7 Pro 64GB (4+4GB RAM)",
    name: "Xiaomi Redmi A7 Pro 64GB (4+4GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 380,
    price: 380,
    originalPrice: 440,
    imagen: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    image: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    badge: "NUEVO INGRESO",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 4.7,
    reviewsCount: 22,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["64 GB", "4GB + 4GB RAM", "Pantalla 90Hz Fluida", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.74\" HD+ 90Hz Fluida",
      processor: "Helio / Unisoc Octa-Core 2.0GHz",
      ram: "4 GB (+4GB Virtual = 8GB)",
      storage: "64 GB (MicroSD hasta 1TB)",
      cameras: "13 MP AI + Frontal 5 MP",
      battery: "5,000 mAh | Carga rápida 15W"
    },
    colors: ["Negro Medianoche", "Azul Lago", "Verde Suave"],
    description: "Versión mejorada Pro de la línea A con 4GB de RAM física más 4GB dinámica, pantalla amplia y gran autonomía. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 3. REDMI A7 PRO 128GB/4+4RAM S/400®️
  {
    id: "redmi-a7-pro-128gb",
    nombre: "Xiaomi Redmi A7 Pro 128GB (4+4GB RAM)",
    name: "Xiaomi Redmi A7 Pro 128GB (4+4GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 400,
    price: 400,
    originalPrice: 460,
    imagen: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    image: "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
    badge: "MÁS VENDIDO",
    badgeType: "offer",
    registro: "R",
    stock: 20,
    rating: 4.8,
    reviewsCount: 35,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-a5-a7.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["128 GB Almacenamiento", "4GB + 4GB RAM", "Pantalla 90Hz", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.74\" HD+ 90Hz Fluida",
      processor: "Helio / Unisoc Octa-Core 2.0GHz",
      ram: "4 GB (+4GB Virtual = 8GB)",
      storage: "128 GB (MicroSD hasta 1TB)",
      cameras: "13 MP AI + Frontal 5 MP",
      battery: "5,000 mAh | Carga rápida 15W"
    },
    colors: ["Negro Medianoche", "Azul Lago", "Verde Suave"],
    description: "El modelo más vendido de la serie A7 Pro con el doble de memoria interna (128GB) para almacenar miles de fotos y aplicaciones sin límites. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 4. REDMI 15C 128GB/4+4RAM S/470®️
  {
    id: "redmi-15c-128gb",
    nombre: "Xiaomi Redmi 15C 128GB (4+4GB RAM)",
    name: "Xiaomi Redmi 15C 128GB (4+4GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 470,
    price: 470,
    originalPrice: 530,
    imagen: "assets/img/brands/Xiaomi/redmi-15c.webp",
    image: "assets/img/brands/Xiaomi/redmi-15c.webp",
    badge: "PANTALLA 120HZ",
    badgeType: "new",
    registro: "R",
    stock: 16,
    rating: 4.8,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-15c.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["128 GB", "4GB + 4GB RAM", "Cámara 50MP AI", "Batería 5,160 mAh"],
    specsObj: {
      screen: "6.88\" HD+ 120Hz Ultra Amplia",
      processor: "MediaTek Helio G81-Ultra (12nm)",
      ram: "4 GB (+4GB Virtual = 8GB)",
      storage: "128 GB",
      cameras: "50 MP AI Ultra Nítida + Frontal 13 MP",
      battery: "5,160 mAh | Carga rápida 18W USB-C"
    },
    colors: ["Verde Menta", "Negro Medianoche", "Azul Estelar"],
    description: "Enorme pantalla cinematográfica de 6.88\" con tasa de refresco ultra suave de 120Hz, cámara de 50 MP y batería de larga duración de 5,160 mAh. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 5. REDMI 15C 256GB/4+4RAM S/490®️
  {
    id: "redmi-15c-256gb-4ram",
    nombre: "Xiaomi Redmi 15C 256GB (4+4GB RAM)",
    name: "Xiaomi Redmi 15C 256GB (4+4GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 490,
    price: 490,
    originalPrice: 560,
    imagen: "assets/img/brands/Xiaomi/redmi-15c.webp",
    image: "assets/img/brands/Xiaomi/redmi-15c.webp",
    badge: "GRAN ESPACIO",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.8,
    reviewsCount: 28,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-15c.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB Almacenamiento", "4GB + 4GB RAM", "Pantalla 120Hz", "Batería 5,160 mAh"],
    specsObj: {
      screen: "6.88\" HD+ 120Hz Ultra Amplia",
      processor: "MediaTek Helio G81-Ultra (12nm)",
      ram: "4 GB (+4GB Virtual = 8GB)",
      storage: "256 GB",
      cameras: "50 MP AI Ultra Nítida + Frontal 13 MP",
      battery: "5,160 mAh | Carga rápida 18W USB-C"
    },
    colors: ["Verde Menta", "Negro Medianoche", "Azul Estelar"],
    description: "Versión de 256GB de almacenamiento para el Redmi 15C. Excelente relación calidad-precio con pantalla de 120Hz y cámara AI de 50 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 6. REDMI 15C 256GB/8+8RAM S/600®️
  {
    id: "redmi-15c-256gb-8ram",
    nombre: "Xiaomi Redmi 15C 256GB (8+8GB RAM)",
    name: "Xiaomi Redmi 15C 256GB (8+8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "economica",
    precio: 600,
    price: 600,
    originalPrice: 690,
    imagen: "assets/img/brands/Xiaomi/redmi-15c.webp",
    image: "assets/img/brands/Xiaomi/redmi-15c.webp",
    badge: "16GB RAM TOTAL",
    badgeType: "offer",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-15c.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "8GB + 8GB RAM (16GB)", "Pantalla 120Hz", "Batería 5,160 mAh"],
    specsObj: {
      screen: "6.88\" HD+ 120Hz Ultra Amplia",
      processor: "MediaTek Helio G81-Ultra (12nm)",
      ram: "8 GB (+8GB Virtual = 16GB)",
      storage: "256 GB",
      cameras: "50 MP AI Ultra Nítida + Frontal 13 MP",
      battery: "5,160 mAh | Carga rápida 18W USB-C"
    },
    colors: ["Verde Menta", "Negro Medianoche", "Azul Estelar"],
    description: "La edición tope de gama del Redmi 15C con 16GB de RAM dinámica total y 256GB de almacenamiento. Rendimiento multitarea superior. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 7. REDMI 13 128GB/6RAM S/620®️ 
  {
    id: "redmi-13-128gb-6ram",
    nombre: "Xiaomi Redmi 13 128GB (6GB RAM)",
    name: "Xiaomi Redmi 13 128GB (6GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 620,
    price: 620,
    originalPrice: 710,
    imagen: "assets/img/brands/Xiaomi/redmi-entry-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-entry-series.webp",
    badge: "CÁMARA 108MP",
    badgeType: "offer",
    registro: "R",
    stock: 12,
    rating: 4.8,
    reviewsCount: 26,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Cámara 108 MP", "128 GB", "6 GB RAM", "Carga Rápida 33W"],
    specsObj: {
      screen: "6.79\" FHD+ 90Hz con acabado en cristal",
      processor: "MediaTek Helio G91-Ultra (12nm)",
      ram: "6 GB LPDDR4X",
      storage: "128 GB",
      cameras: "108 MP Sensor 1/1.67\" + 2 MP Macro + 13 MP Frontal",
      battery: "5,030 mAh | Carga rápida 33W"
    },
    colors: ["Negro Medianoche", "Azul Océano", "Rosa Claro"],
    description: "Diseño elegante con trasera de cristal prémium, impresionante cámara de 108 MP para capturar detalles microscópicos y carga rápida de 33W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 8. REDMI 15 256GB/8RAM S/700®️
  {
    id: "redmi-15-256gb-8ram",
    nombre: "Xiaomi Redmi 15 256GB (8GB RAM)",
    name: "Xiaomi Redmi 15 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 700,
    price: 700,
    originalPrice: 800,
    imagen: "assets/img/brands/Xiaomi/redmi-entry-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-entry-series.webp",
    badge: "NUEVA GENERACIÓN",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 4.8,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Pantalla FHD+ 120Hz", "Cámara 108 MP"],
    specsObj: {
      screen: "6.79\" FHD+ 120Hz Ultra Suave",
      processor: "MediaTek Helio G99 / G100 Octa-Core",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "108 MP AI Pro + Frontal 16 MP",
      battery: "5,000 mAh | Carga rápida 33W"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Titanio Plata"],
    description: "Evolución de la serie estándar de Redmi con pantalla FHD+ de 120Hz, cámara de 108 MP y 256GB de memoria para máximo rendimiento diario. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 9. REDMI 17 128GB/4RAM S/670®️
  {
    id: "redmi-17-128gb-4ram",
    nombre: "Xiaomi Redmi 17 128GB (4GB RAM)",
    name: "Xiaomi Redmi 17 128GB (4GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 670,
    price: 670,
    originalPrice: 770,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "SERIE 17",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 20,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Serie 17", "128 GB", "4 GB RAM", "Pantalla 120Hz FHD+"],
    specsObj: {
      screen: "6.78\" FHD+ 120Hz AdaptiveSync",
      processor: "Snapdragon / Helio Octa-Core 6nm",
      ram: "4 GB (+4GB RAM Virtual)",
      storage: "128 GB",
      cameras: "108 MP Ultra Clara + Frontal 16 MP",
      battery: "5,000 mAh | Carga 33W"
    },
    colors: ["Negro Ébano", "Azul Estelar", "Verde Esmeralda"],
    description: "Nueva serie 17 de Redmi con diseño refinado, panel a 120Hz y cámara principal de 108 MP de alta definición. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 10. REDMI 17 256GB/8RAM S/860®️
  {
    id: "redmi-17-256gb-8ram",
    nombre: "Xiaomi Redmi 17 256GB (8GB RAM)",
    name: "Xiaomi Redmi 17 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 860,
    price: 860,
    originalPrice: 990,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "GRAN POTENCIA",
    badgeType: "new",
    registro: "R",
    stock: 16,
    rating: 4.9,
    reviewsCount: 37,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/redmi-entry-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Cámara 108 MP", "Pantalla 120Hz"],
    specsObj: {
      screen: "6.78\" FHD+ 120Hz AdaptiveSync",
      processor: "Snapdragon / Helio Octa-Core 6nm",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "108 MP Pro + Frontal 16 MP",
      battery: "5,000 mAh | Carga 33W"
    },
    colors: ["Negro Ébano", "Azul Estelar", "Dorado Titanio"],
    description: "Versión tope de gama del Redmi 17 con 8GB de memoria RAM física y 256GB de almacenamiento interno. Gran fluidez y autonomía. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 11. NOTE 15 128GB/6RAM S/710®️
  {
    id: "redmi-note-15-128gb-6ram",
    nombre: "Xiaomi Redmi Note 15 128GB (6GB RAM)",
    name: "Xiaomi Redmi Note 15 128GB (6GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 710,
    price: 710,
    originalPrice: 820,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "AMOLED 120HZ",
    badgeType: "offer",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Pantalla AMOLED 120Hz", "128 GB", "6 GB RAM", "Cámara 108 MP"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 1800 nits",
      processor: "Qualcomm Snapdragon 685 Octa-Core (6nm)",
      ram: "6 GB LPDDR4X",
      storage: "128 GB",
      cameras: "108 MP Triple Cámara AI + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga rápida 33W"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Verde Menta"],
    description: "Panel AMOLED brillante de 1800 nits con 120Hz de refresco, procesador Snapdragon eficiente y cámara de 108 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 12. NOTE 15 256GB/8RAM S/800®️
  {
    id: "redmi-note-15-256gb-8ram",
    nombre: "Xiaomi Redmi Note 15 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 15 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 800,
    price: 800,
    originalPrice: 920,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "MÁS VENDIDO",
    badgeType: "offer",
    registro: "R",
    stock: 22,
    rating: 4.9,
    reviewsCount: 65,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Pantalla AMOLED 120Hz", "Cámara 108 MP"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 1800 nits",
      processor: "Qualcomm Snapdragon 685 Octa-Core (6nm)",
      ram: "8 GB LPDDR4X",
      storage: "256 GB",
      cameras: "108 MP Triple Cámara AI + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga rápida 33W"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Verde Menta"],
    description: "Uno de los smartphones más exitosos del mercado peruano. 256GB de memoria, 8GB de RAM física, pantalla AMOLED de colores intensos y cámara de 108 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 13. NOTE 15 5G 256GB/8RAM S/990®️
  {
    id: "redmi-note-15-5g-256gb-8ram",
    nombre: "Xiaomi Redmi Note 15 5G 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 15 5G 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 990,
    price: 990,
    originalPrice: 1140,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "CONEXIÓN 5G",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Red 5G", "256 GB", "8 GB RAM", "AMOLED 120Hz"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz",
      processor: "MediaTek Dimensity 6080 5G (6nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "108 MP con IA + Ultra Gran Angular + 16 MP Frontal",
      battery: "5,000 mAh | Carga rápida 33W"
    },
    colors: ["Negro Grafito", "Azul Océano 5G", "Blanco Ártico"],
    description: "Navegación y descargas en red 5G ultrarrápida combinada con pantalla AMOLED de 120Hz y generosa memoria de 256GB con 8GB de RAM. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 14. NOTE 17 128GB/6RAM S/900®️
  {
    id: "redmi-note-17-128gb-6ram",
    nombre: "Xiaomi Redmi Note 17 128GB (6GB RAM)",
    name: "Xiaomi Redmi Note 17 128GB (6GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 900,
    price: 900,
    originalPrice: 1040,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "NUEVA SERIE 17",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 4.9,
    reviewsCount: 24,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Nueva Serie 17", "128 GB", "6 GB RAM", "AMOLED 120Hz"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 2000 nits",
      processor: "Snapdragon 6 Gen 1 / Dimensity 5G",
      ram: "6 GB RAM",
      storage: "128 GB",
      cameras: "108 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,100 mAh | Carga rápida 45W"
    },
    colors: ["Azul Titanio", "Negro Profundo", "Verde Jade"],
    description: "Estreno de la nueva línea Note 17 con cámara estabilizada OIS de 108 MP, pantalla AMOLED a 2000 nits de brillo y carga rápida de 45W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 15. NOTE 17 256GB/6RAM S/970®️
  {
    id: "redmi-note-17-256gb-6ram",
    nombre: "Xiaomi Redmi Note 17 256GB (6GB RAM)",
    name: "Xiaomi Redmi Note 17 256GB (6GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 970,
    price: 970,
    originalPrice: 1120,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "SERIE 17",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "6 GB RAM", "Cámara 108 MP OIS", "AMOLED 120Hz"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 2000 nits",
      processor: "Snapdragon 6 Gen 1 / Dimensity 5G",
      ram: "6 GB RAM",
      storage: "256 GB",
      cameras: "108 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,100 mAh | Carga rápida 45W"
    },
    colors: ["Azul Titanio", "Negro Profundo", "Verde Jade"],
    description: "Versión de 256GB del Note 17 para que nunca te falte espacio. Pantalla AMOLED ultrabrillante y cámara estabilizada OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 16. NOTE 17 256GB/8RAM S/1060®️
  {
    id: "redmi-note-17-256gb-8ram",
    nombre: "Xiaomi Redmi Note 17 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 17 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1060,
    price: 1060,
    originalPrice: 1220,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "TOP RENDIMIENTO",
    badgeType: "offer",
    registro: "R",
    stock: 18,
    rating: 4.9,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Pantalla AMOLED 120Hz", "Cámara 108 MP OIS"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 2000 nits",
      processor: "Snapdragon 6 Gen 1 / Dimensity 5G",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "108 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,100 mAh | Carga rápida 45W"
    },
    colors: ["Azul Titanio", "Negro Profundo", "Dorado Arena"],
    description: "Configuración superior de 8GB de RAM y 256GB de almacenamiento para el Note 17. Rendimiento de alta gama a precio accesible. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 17. NOTE 17 PRO 5G 256GB/6+6RAM S/1390®️
  {
    id: "redmi-note-17-pro-5g-256gb-6ram",
    nombre: "Xiaomi Redmi Note 17 Pro 5G 256GB (6+6GB RAM)",
    name: "Xiaomi Redmi Note 17 Pro 5G 256GB (6+6GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1390,
    price: 1390,
    originalPrice: 1590,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "CÁMARA 200MP OIS",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 52,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Cámara 200 MP OIS", "256 GB", "6GB + 6GB RAM (12GB)", "Carga 67W Turbo"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Dolby Vision",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "6 GB (+6GB RAM Virtual = 12GB)",
      storage: "256 GB UFS 2.2",
      cameras: "200 MP con OIS estabilizado + 8 MP Ultra Gran Angular + 16 MP Selfie",
      battery: "5,000 mAh | Carga 67W Turbo Charge"
    },
    colors: ["Púrpura Aurora", "Azul Glaciar", "Negro Medianoche"],
    description: "Revolución fotográfica con sensor de 200 MP y estabilización óptica OIS, pantalla 1.5K CrystalRes y carga rápida de 67W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 18. NOTE 17 PRO 5G 512GB/8+8RAM S/1640®️
  {
    id: "redmi-note-17-pro-5g-512gb-8ram",
    nombre: "Xiaomi Redmi Note 17 Pro 5G 512GB (8+8GB RAM)",
    name: "Xiaomi Redmi Note 17 Pro 5G 512GB (8+8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1640,
    price: 1640,
    originalPrice: 1890,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "512GB + 200MP",
    badgeType: "offer",
    registro: "R",
    stock: 12,
    rating: 5.0,
    reviewsCount: 58,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["512 GB Capacidad", "8GB + 8GB RAM (16GB)", "Cámara 200 MP OIS", "Carga 67W"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Dolby Vision",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB (+8GB RAM Virtual = 16GB)",
      storage: "512 GB UFS 2.2",
      cameras: "200 MP con OIS estabilizado + 8 MP Ultra Gran Angular + 16 MP Selfie",
      battery: "5,000 mAh | Carga 67W Turbo Charge"
    },
    colors: ["Púrpura Aurora", "Azul Glaciar", "Negro Medianoche"],
    description: "Capacidad masiva de 512GB para guardar miles de fotos en ultra alta resolución de 200 MP. 16GB de RAM dinámica y pantalla 1.5K. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 19. NOTE 17 PRO MAX 256GB/8RAM S/1740®️
  {
    id: "redmi-note-17-pro-max-256gb-8ram",
    nombre: "Xiaomi Redmi Note 17 Pro Max 5G 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 17 Pro Max 5G 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 1740,
    price: 1740,
    originalPrice: 1990,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "CARGA 120W HYPER",
    badgeType: "new",
    registro: "R",
    stock: 10,
    rating: 5.0,
    reviewsCount: 64,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["120W HyperCharge", "200 MP OIS Pro", "Pantalla 1.5K Curva", "IP68 Agua"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz Curvo Gorilla Glass Victus",
      processor: "MediaTek Dimensity 7300 / 8020 5G (4nm)",
      ram: "8 GB LPDDR5",
      storage: "256 GB UFS 3.1",
      cameras: "200 MP Sensor 1/1.4\" OIS + 8 MP UGA + 2 MP Macro + 32 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge (0 a 100% en 19 min)"
    },
    colors: ["Titanio Plateado", "Negro Medianoche", "Verde Esmeralda Curvo"],
    description: "El buque insignia de la familia Redmi Note con certificación IP68 contra agua y polvo, carga ultrarrápida de 120W y sensor 200 MP de nivel pro. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 20. NOTE 17 PRO MAX 512GB/8RAM S/1810®️
  {
    id: "redmi-note-17-pro-max-512gb-8ram",
    nombre: "Xiaomi Redmi Note 17 Pro Max 5G 512GB (8GB RAM)",
    name: "Xiaomi Redmi Note 17 Pro Max 5G 512GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 1810,
    price: 1810,
    originalPrice: 2090,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "MÁXIMA CAPACIDAD",
    badgeType: "offer",
    registro: "R",
    stock: 9,
    rating: 5.0,
    reviewsCount: 70,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["512 GB", "8 GB RAM", "Cámara 200 MP OIS", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz Curvo Gorilla Glass Victus",
      processor: "MediaTek Dimensity 7300 / 8020 5G (4nm)",
      ram: "8 GB LPDDR5",
      storage: "512 GB UFS 3.1",
      cameras: "200 MP Sensor 1/1.4\" OIS + 8 MP UGA + 2 MP Macro + 32 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge (0 a 100% en 19 min)"
    },
    colors: ["Titanio Plateado", "Negro Medianoche", "Verde Esmeralda Curvo"],
    description: "Versión de 512GB del Redmi Note 17 Pro Max. Espacio gigante, carga de 120W, resistencia al agua IP68 y cámara de 200 MP con estabilización óptica. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 21. NOTE 15 PRO 4G 256GB/8RAM S/990 (Libre)
  {
    id: "redmi-note-15-pro-4g-256gb-libre",
    nombre: "Xiaomi Redmi Note 15 Pro 4G 256GB (8GB RAM) Libre",
    name: "Xiaomi Redmi Note 15 Pro 4G 256GB (8GB RAM) Libre",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 990,
    price: 990,
    originalPrice: 1150,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "VERSIÓN LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 15,
    rating: 4.8,
    reviewsCount: 41,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 1300 nits",
      processor: "MediaTek Helio G99-Ultra (6nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Verde Bosque", "Púrpura Aurora"],
    description: "Versión Libre del Redmi Note 15 Pro 4G. Equipado con cámara de 200 MP con OIS, panel AMOLED a 120Hz y carga de 67W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 22. NOTE 15 PRO 4G 256GB/8RAM S/1100®️ (Registrado R)
  {
    id: "redmi-note-15-pro-4g-256gb-reg",
    nombre: "Xiaomi Redmi Note 15 Pro 4G 256GB (8GB RAM) Registrado",
    name: "Xiaomi Redmi Note 15 Pro 4G 256GB (8GB RAM) Registrado",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1100,
    price: 1100,
    originalPrice: 1260,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" FHD+ AMOLED 120Hz 1300 nits",
      processor: "MediaTek Helio G99-Ultra (6nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Verde Bosque", "Púrpura Aurora"],
    description: "Versión Registrada (R) en lista blanca MTC del Redmi Note 15 Pro 4G. Cámara de 200 MP OIS y carga turbo de 67W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 23. NOTE 15 PRO 5G 256GB/8RAM (CONSULTAR 👀)
  {
    id: "redmi-note-15-pro-5g-256gb-libre",
    nombre: "Xiaomi Redmi Note 15 Pro 5G 256GB (8GB RAM) Libre",
    name: "Xiaomi Redmi Note 15 Pro 5G 256GB (8GB RAM) Libre",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1150,
    price: 1150,
    originalPrice: 1300,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "CONSULTAR STOCK",
    badgeType: "offer",
    registro: "Libre",
    stock: 10,
    rating: 4.8,
    reviewsCount: 36,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre 5G", "256 GB", "8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz 1800 nits",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Azul Océano", "Blanco Luz de Luna"],
    description: "Versión Libre de 256GB con conectividad 5G. Consultar stock y disponibilidad en tiempo real por WhatsApp. Cámara de 200 MP con OIS y pantalla AMOLED de 120Hz. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 24. NOTE 15 PRO 5G 256GB/8RAM S/1260®️ (Registrado R)
  {
    id: "redmi-note-15-pro-5g-256gb-reg",
    nombre: "Xiaomi Redmi Note 15 Pro 5G 256GB (8GB RAM) Registrado",
    name: "Xiaomi Redmi Note 15 Pro 5G 256GB (8GB RAM) Registrado",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1260,
    price: 1260,
    originalPrice: 1440,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 48,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado Lista Blanca", "Red 5G", "256 GB / 8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz 1800 nits",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Azul Océano", "Blanco Luz de Luna"],
    description: "Versión Registrada (R) con homologación oficial MTC. Conectividad 5G, cámara de 200 MP OIS y carga turbo de 67W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 25. NOTE 15 PRO 5G 512GB/8RAM S/1260 (Libre)
  {
    id: "redmi-note-15-pro-5g-512gb-libre",
    nombre: "Xiaomi Redmi Note 15 Pro 5G 512GB (8GB RAM) Libre",
    name: "Xiaomi Redmi Note 15 Pro 5G 512GB (8GB RAM) Libre",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1260,
    price: 1260,
    originalPrice: 1450,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "512GB LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 4.9,
    reviewsCount: 34,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz 1800 nits",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "512 GB",
      cameras: "200 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Azul Océano", "Blanco Luz de Luna"],
    description: "Enorme almacenamiento de 512GB en versión Libre. Red 5G veloz, cámara de 200 MP OIS y pantalla CrystalRes. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 26. NOTE 15 PRO 5G 512GB/8RAM S/1310®️ (Registrado R)
  {
    id: "redmi-note-15-pro-5g-512gb-reg",
    nombre: "Xiaomi Redmi Note 15 Pro 5G 512GB (8GB RAM) Registrado",
    name: "Xiaomi Redmi Note 15 Pro 5G 512GB (8GB RAM) Registrado",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1310,
    price: 1310,
    originalPrice: 1520,
    imagen: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
    badge: "512GB REGISTRADO",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 50,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-15-pro.webp",
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "8 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 120Hz 1800 nits",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "512 GB",
      cameras: "200 MP OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga 67W Turbo"
    },
    colors: ["Negro Medianoche", "Azul Océano", "Blanco Luz de Luna"],
    description: "Versión Registrada (R) con 512GB de almacenamiento y soporte oficial en lista blanca MTC. Cámara de 200 MP con estabilización óptica. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 27. NOTE 12 PRO PLUS 5G 256GB/8RAM S/1090®️
  {
    id: "redmi-note-12-pro-plus-256gb",
    nombre: "Xiaomi Redmi Note 12 Pro+ 5G 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 12 Pro+ 5G 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1090,
    price: 1090,
    originalPrice: 1250,
    imagen: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-series.webp",
    badge: "CARGA 120W",
    badgeType: "offer",
    registro: "R",
    stock: 11,
    rating: 4.8,
    reviewsCount: 54,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-series.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["120W HyperCharge", "Cámara 200 MP OIS", "256 GB", "8 GB RAM"],
    specsObj: {
      screen: "6.67\" FHD+ Flow AMOLED 120Hz Dolby Vision",
      processor: "MediaTek Dimensity 1080 5G (6nm)",
      ram: "8 GB LPDDR4X",
      storage: "256 GB UFS 2.2",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge (0 a 100% en 19 min)"
    },
    colors: ["Negro Medianoche", "Azul Cielo", "Blanco Polar"],
    description: "El mítico modelo que popularizó los 200 MP con OIS y la carga hiperrápida de 120W. Pantalla Flow AMOLED de bordes delgados. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 28. NOTE 14 PRO PLUS 5G 256GB/8RAM S/1140®️
  {
    id: "redmi-note-14-pro-plus-256gb",
    nombre: "Xiaomi Redmi Note 14 Pro+ 5G 256GB (8GB RAM)",
    name: "Xiaomi Redmi Note 14 Pro+ 5G 256GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1140,
    price: 1140,
    originalPrice: 1320,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "PANTALLA CURVA",
    badgeType: "offer",
    registro: "R",
    stock: 13,
    rating: 4.9,
    reviewsCount: 47,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Pantalla Curva 1.5K", "Snapdragon 7s Gen 3", "Cámara OIS 200MP", "Batería 6,200 mAh"],
    specsObj: {
      screen: "6.67\" 1.5K Curvo AMOLED 120Hz 3000 nits",
      processor: "Snapdragon 7s Gen 3 (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP Light Hunter 800 OIS + 50 MP Teleobjetivo + 8 MP UGA",
      battery: "6,200 mAh Silicio | Carga 90W HyperCharge"
    },
    colors: ["Verde Esmeralda", "Negro Titanio", "Azul Espejo"],
    description: "Increíble batería de silicio de 6,200 mAh con carga de 90W, pantalla curva 1.5K y procesador Snapdragon 7s Gen 3. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 29. NOTE 15 PRO PLUS 256GB/8RAM S/1330 (Libre)
  {
    id: "redmi-note-15-pro-plus-256gb-libre",
    nombre: "Xiaomi Redmi Note 15 Pro+ 5G 256GB (8GB RAM) Libre",
    name: "Xiaomi Redmi Note 15 Pro+ 5G 256GB (8GB RAM) Libre",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1330,
    price: 1330,
    originalPrice: 1530,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "VERSIÓN LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 4.9,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "8 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Curvo",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge"
    },
    colors: ["Púrpura Aurora", "Negro Medianoche", "Blanco Luz de Luna"],
    description: "Versión Libre del Note 15 Pro+. Cámara de 200 MP con OIS, diseño curvo y carga ultra rápida de 120W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 30. NOTE 15 PRO PLUS 256GB/8RAM S/1460®️ (Registrado R)
  {
    id: "redmi-note-15-pro-plus-256gb-reg",
    nombre: "Xiaomi Redmi Note 15 Pro+ 5G 256GB (8GB RAM) Registrado",
    name: "Xiaomi Redmi Note 15 Pro+ 5G 256GB (8GB RAM) Registrado",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1460,
    price: 1460,
    originalPrice: 1680,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.9,
    reviewsCount: 55,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Curvo",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge"
    },
    colors: ["Púrpura Aurora", "Negro Medianoche", "Blanco Luz de Luna"],
    description: "Versión Registrada en lista blanca MTC del Note 15 Pro+. Resistencia al agua IP68, 120W HyperCharge y 200 MP con OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 31. NOTE 15 PRO PLUS 512GB/12RAM S/1470 (Libre)
  {
    id: "redmi-note-15-pro-plus-512gb-libre",
    nombre: "Xiaomi Redmi Note 15 Pro+ 5G 512GB (12GB RAM) Libre",
    name: "Xiaomi Redmi Note 15 Pro+ 5G 512GB (12GB RAM) Libre",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 1470,
    price: 1470,
    originalPrice: 1690,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "512GB / 12GB RAM",
    badgeType: "offer",
    registro: "Libre",
    stock: 10,
    rating: 5.0,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "12 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Curvo",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "12 GB RAM",
      storage: "512 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge"
    },
    colors: ["Púrpura Aurora", "Negro Medianoche", "Blanco Luz de Luna"],
    description: "Configuración máxima de 512GB y 12GB de RAM en versión Libre. Pantalla curva 1.5K y 120W de carga ultrarrápida. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 32. NOTE 15 PRO PLUS 512GB/12RAM S/1590®️ (Registrado R)
  {
    id: "redmi-note-15-pro-plus-512gb-reg",
    nombre: "Xiaomi Redmi Note 15 Pro+ 5G 512GB (12GB RAM) Registrado",
    name: "Xiaomi Redmi Note 15 Pro+ 5G 512GB (12GB RAM) Registrado",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 1590,
    price: 1590,
    originalPrice: 1820,
    imagen: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    image: "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
    badge: "MÁXIMO PODER R",
    badgeType: "offer",
    registro: "R",
    stock: 14,
    rating: 5.0,
    reviewsCount: 60,
    gallery: [
      "assets/img/brands/Xiaomi/redmi-note-17-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "12 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 120Hz Curvo",
      processor: "MediaTek Dimensity 7200 Ultra 5G (4nm)",
      ram: "12 GB RAM",
      storage: "512 GB",
      cameras: "200 MP con OIS + 8 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | 120W HyperCharge"
    },
    colors: ["Púrpura Aurora", "Negro Medianoche", "Blanco Luz de Luna"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC. 512GB de memoria, 12GB de RAM, certificación IP68 y 120W de carga. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 33. MI 12 LITE 128GB/8RAM S/820®️
  {
    id: "xiaomi-mi-12-lite-128gb",
    nombre: "Xiaomi 12 Lite 5G 128GB (8GB RAM)",
    name: "Xiaomi 12 Lite 5G 128GB (8GB RAM)",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media",
    precio: 820,
    price: 820,
    originalPrice: 950,
    imagen: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    badge: "DISEÑO SLIM",
    badgeType: "offer",
    registro: "R",
    stock: 11,
    rating: 4.8,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Ultraligero 173g", "128 GB", "8 GB RAM", "Cámara 108 MP Studio"],
    specsObj: {
      screen: "6.55\" FHD+ AMOLED 120Hz Dolby Vision HDR10+",
      processor: "Snapdragon 778G 5G (6nm)",
      ram: "8 GB LPDDR4X",
      storage: "128 GB UFS 2.2",
      cameras: "108 MP Sensor Samsung + 8 MP UGA + 32 MP Selfie con AF",
      battery: "4,300 mAh | Carga rápida 67W Turbo Charge"
    },
    colors: ["Verde Menta", "Rosa Claro", "Negro Medianoche"],
    description: "Diseño ultradelgado de 7.29mm y peso pluma de 173g. Pantalla AMOLED de 120Hz con 68 mil millones de colores y selfie de 32 MP con autoenfoque. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 34. MI 12 5G 256GB/8RAM S/1000®️
  {
    id: "xiaomi-mi-12-5g-256gb",
    nombre: "Xiaomi 12 5G 256GB (8GB RAM) Flagship Compacto",
    name: "Xiaomi 12 5G 256GB (8GB RAM) Flagship Compacto",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "media-alta",
    precio: 1000,
    price: 1000,
    originalPrice: 1190,
    imagen: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    badge: "FLAGSHIP COMPACTO",
    badgeType: "offer",
    registro: "R",
    stock: 9,
    rating: 4.9,
    reviewsCount: 44,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Snapdragon 8 Gen 1", "256 GB", "8 GB RAM", "Cámara Sony IMX766 OIS"],
    specsObj: {
      screen: "6.28\" FHD+ AMOLED 120Hz 1100 nits Compacto",
      processor: "Qualcomm Snapdragon 8 Gen 1 (4nm)",
      ram: "8 GB LPDDR5",
      storage: "256 GB UFS 3.1",
      cameras: "50 MP Sony IMX766 OIS + 13 MP UGA + 32 MP Frontal",
      battery: "4,500 mAh | Carga 67W Alámbrica + 50W Inalámbrica"
    },
    colors: ["Gris Espacial", "Azul Océano", "Púrpura"],
    description: "Auténtico gama alta compacto con procesador Snapdragon 8 Gen 1, sensor Sony IMX766 de 50 MP con OIS y carga inalámbrica de 50W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 35. MI 15T 5G 512GB/12RAM S/1870®️
  {
    id: "xiaomi-mi-15t-5g-512gb",
    nombre: "Xiaomi 15T 5G 512GB (12GB RAM) Leica Edition",
    name: "Xiaomi 15T 5G 512GB (12GB RAM) Leica Edition",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 1870,
    price: 1870,
    originalPrice: 2150,
    imagen: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
    badge: "ÓPTICA LEICA",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 4.9,
    reviewsCount: 51,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-mi-15t.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Óptica Profesional Leica", "512 GB", "12 GB RAM", "Pantalla 144Hz AI"],
    specsObj: {
      screen: "6.67\" 1.5K CrystalRes AMOLED 144Hz 4000 nits",
      processor: "MediaTek Dimensity 8300 Ultra 5G (4nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Summilux OIS + 50 MP Leica Teleobjetivo + 12 MP UGA",
      battery: "5,000 mAh | Carga rápida 67W HyperCharge"
    },
    colors: ["Negro Titanio", "Gris Titanio", "Azul Titanio"],
    description: "Diseño prémium en acabado titanio con triple lente Leica Summilux, pantalla AMOLED fluida a 144Hz con 4000 nits de brillo pico y 512GB de almacenamiento. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 36. MI 15T PRO 5G 512GB/12RAM S/2660®️
  {
    id: "xiaomi-mi-15t-pro-5g-512gb",
    nombre: "Xiaomi 15T Pro 5G 512GB (12GB RAM) Leica Edition",
    name: "Xiaomi 15T Pro 5G 512GB (12GB RAM) Leica Edition",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 2660,
    price: 2660,
    originalPrice: 2990,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "LEICA PRO 144HZ",
    badgeType: "new",
    registro: "R",
    stock: 10,
    rating: 5.0,
    reviewsCount: 62,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Dimensity 9300+", "Óptica Leica Summilux", "512 GB / 12 GB RAM", "Carga 120W Hyper"],
    specsObj: {
      screen: "6.67\" 1.5K AMOLED 144Hz 4000 nits HDR10+",
      processor: "MediaTek Dimensity 9300+ Flagship (4nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Light Fusion 900 OIS + 50 MP Telefoto 2.6x + 12 MP UGA",
      battery: "5,000 mAh | 120W HyperCharge + 50W Inalámbrica"
    },
    colors: ["Negro Titanio", "Gris Titanio", "Azul Titanio"],
    description: "Potencia insignia con procesador Dimensity 9300+, sensor Leica Light Fusion 900, carga de 120W por cable y 50W inalámbrica. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 37. XIAOMI 17T 512GB/12RAM S/2200 (Libre)
  {
    id: "xiaomi-17t-512gb-libre",
    nombre: "Xiaomi 17T 5G 512GB (12GB RAM) Libre Leica",
    name: "Xiaomi 17T 5G 512GB (12GB RAM) Libre Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 2200,
    price: 2200,
    originalPrice: 2490,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "SERIE 17T LIBRE",
    badgeType: "new",
    registro: "Libre",
    stock: 10,
    rating: 4.9,
    reviewsCount: 40,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "12 GB RAM", "Óptica Leica 144Hz"],
    specsObj: {
      screen: "6.67\" 1.5K OLED 144Hz Pro 4500 nits",
      processor: "MediaTek Dimensity 8400 / 9300 5G",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Summilux OIS + 50 MP Telefoto + 12 MP UGA",
      battery: "5,500 mAh | Carga rápida 90W HyperCharge"
    },
    colors: ["Negro Carbono", "Titanio Plata", "Azul Glaciar"],
    description: "Versión Libre del flamante Xiaomi 17T con óptica profesional Leica, pantalla de 144Hz y 512GB de almacenamiento. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 38. XIAOMI 17T 512GB/12RAM S/2290®️ (Registrado R)
  {
    id: "xiaomi-17t-512gb-reg",
    nombre: "Xiaomi 17T 5G 512GB (12GB RAM) Registrado Leica",
    name: "Xiaomi 17T 5G 512GB (12GB RAM) Registrado Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 2290,
    price: 2290,
    originalPrice: 2590,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 5.0,
    reviewsCount: 53,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "12 GB RAM", "Óptica Leica 144Hz"],
    specsObj: {
      screen: "6.67\" 1.5K OLED 144Hz Pro 4500 nits",
      processor: "MediaTek Dimensity 8400 / 9300 5G",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Summilux OIS + 50 MP Telefoto + 12 MP UGA",
      battery: "5,500 mAh | Carga rápida 90W HyperCharge"
    },
    colors: ["Negro Carbono", "Titanio Plata", "Azul Glaciar"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del Xiaomi 17T. Óptica Leica de última generación y carga ultra rápida de 90W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 39. XIAOMI 17T PRO 512GB/12RAM S/2680 (Libre)
  {
    id: "xiaomi-17t-pro-512gb-libre",
    nombre: "Xiaomi 17T Pro 5G 512GB (12GB RAM) Libre Leica",
    name: "Xiaomi 17T Pro 5G 512GB (12GB RAM) Libre Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 2680,
    price: 2680,
    originalPrice: 2990,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "LEICA PRO LIBRE",
    badgeType: "new",
    registro: "Libre",
    stock: 8,
    rating: 5.0,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "12 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K OLED 144Hz 4500 nits HDR10+",
      processor: "MediaTek Dimensity 9400 Flagship (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Light Fusion OIS + 50 MP Periscopio + 12 MP UGA",
      battery: "5,500 mAh | 120W HyperCharge + 50W Inalámbrica"
    },
    colors: ["Titanio Negro", "Titanio Plata", "Azul Océano"],
    description: "Versión Libre del Xiaomi 17T Pro con chip flagship de 3nm, lente periscópica Leica y carga de 120W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 40. XIAOMI 17T PRO 512GB/12RAM S/2870®️ (Registrado R)
  {
    id: "xiaomi-17t-pro-512gb-reg",
    nombre: "Xiaomi 17T Pro 5G 512GB (12GB RAM) Registrado Leica",
    name: "Xiaomi 17T Pro 5G 512GB (12GB RAM) Registrado Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 2870,
    price: 2870,
    originalPrice: 3200,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "LEICA PRO R",
    badgeType: "new",
    registro: "R",
    stock: 11,
    rating: 5.0,
    reviewsCount: 61,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "12 GB RAM", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K OLED 144Hz 4500 nits HDR10+",
      processor: "MediaTek Dimensity 9400 Flagship (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "50 MP Leica Light Fusion OIS + 50 MP Periscopio + 12 MP UGA",
      battery: "5,500 mAh | 120W HyperCharge + 50W Inalámbrica"
    },
    colors: ["Titanio Negro", "Titanio Plata", "Azul Océano"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del Xiaomi 17T Pro. Cámara Leica Periscópica de élite y carga de 120W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 41. XIAOMI 17T PRO 1TB/12RAM S/3540®️ (Registrado R)
  {
    id: "xiaomi-17t-pro-1tb-reg",
    nombre: "Xiaomi 17T Pro 5G 1TB (12GB RAM) Registrado Leica",
    name: "Xiaomi 17T Pro 5G 1TB (12GB RAM) Registrado Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 3540,
    price: 3540,
    originalPrice: 3950,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
    badge: "EDICIÓN 1TB R",
    badgeType: "new",
    registro: "R",
    stock: 7,
    rating: 5.0,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17t-pro.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["1 Terabyte (1024 GB)", "12 GB RAM", "Leica Periscopio", "120W HyperCharge"],
    specsObj: {
      screen: "6.67\" 1.5K OLED 144Hz 4500 nits HDR10+",
      processor: "MediaTek Dimensity 9400 Flagship (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "1 TB (1024 GB) UFS 4.0",
      cameras: "50 MP Leica Light Fusion OIS + 50 MP Periscopio + 12 MP UGA",
      battery: "5,500 mAh | 120W HyperCharge + 50W Inalámbrica"
    },
    colors: ["Titanio Negro", "Titanio Plata"],
    description: "Edición especial de 1 Terabyte (1024 GB) de almacenamiento ultrarrápido UFS 4.0. El tope de la gama 17T con óptica Leica y 120W HyperCharge. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 42. MI 17 512GB/12RAM S/3400®️
  {
    id: "xiaomi-17-512gb-12ram",
    nombre: "Xiaomi 17 5G 512GB (12GB RAM) Flagship Leica",
    name: "Xiaomi 17 5G 512GB (12GB RAM) Flagship Leica",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 3400,
    price: 3400,
    originalPrice: 3850,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
    badge: "SNAPDRAGON 8 GEN 4",
    badgeType: "new",
    registro: "R",
    stock: 9,
    rating: 5.0,
    reviewsCount: 48,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Snapdragon 8 Gen 4 (Elite)", "512 GB", "12 GB RAM", "Óptica Leica Summilux"],
    specsObj: {
      screen: "6.36\" 1.5K LTPO OLED 120Hz 3000 nits Marco Ultradelgado",
      processor: "Qualcomm Snapdragon 8 Elite / Gen 4 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "Triple Leica 50 MP: Light Hunter 900 OIS + Telefoto 75mm OIS + UGA",
      battery: "5,400 mAh Silicio-Carbono | Carga 90W + 50W Inalámbrica"
    },
    colors: ["Negro Cerámica", "Blanco Puro", "Verde Jade"],
    description: "El nuevo buque insignia premium compacto de Xiaomi impulsado por el chip Snapdragon 8 Elite de 3nm, pantalla LTPO de bisel mínimo y cámaras Leica profesionales. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 43. MI 17 ULTRA 512GB/16RAM S/5130®️
  {
    id: "xiaomi-17-ultra-512gb-16ram",
    nombre: "Xiaomi 17 Ultra 5G 512GB (16GB RAM) Leica Master Photography",
    name: "Xiaomi 17 Ultra 5G 512GB (16GB RAM) Leica Master Photography",
    marca: "Xiaomi",
    brand: "Xiaomi",
    category: "xiaomi",
    range: "alta",
    precio: 5130,
    price: 5130,
    originalPrice: 5790,
    imagen: "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
    image: "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
    badge: "EL REY DE LA FOTOGRAFÍA",
    badgeType: "new",
    registro: "R",
    stock: 6,
    rating: 5.0,
    reviewsCount: 74,
    gallery: [
      "assets/img/brands/Xiaomi/xiaomi-17-ultra.webp",
      "assets/img/brands/Xiaomi/xiaomi-hero.webp",
      "assets/img/ui/banners/xiaomi banner.jpeg",
      "assets/img/brands/Xiaomi/Xiaomi_logo_clean.png"
    ],
    specs: ["Cámara Cuádruple Leica 1\"", "Sensor Sony LYT-900", "512 GB / 16 GB RAM", "Snapdragon 8 Elite"],
    specsObj: {
      screen: "6.73\" WQHD+ LTPO AMOLED 120Hz 3000 nits Dolby Vision All-Around Liquid",
      processor: "Qualcomm Snapdragon 8 Elite (3nm)",
      ram: "16 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "Cuádruple 50 MP Leica: Sensor 1\" LYT-900 OIS apertura variable + Periscopio 200 MP / 50 MP + Telefoto 75mm + Ultra Gran Angular",
      battery: "5,300 mAh Silicio | Carga 90W HyperCharge + 80W Inalámbrica"
    },
    colors: ["Negro Cerámica", "Blanco Titanio", "Verde Oliva Leica"],
    description: "La cumbre de la fotografía móvil mundial creada en colaboración con Leica. Sensor de 1 pulgada Sony LYT-900 con apertura variable sin escalonamiento, 16GB de RAM y la máxima potencia de Snapdragon. Se emite comprobante de venta para garantía.",
    disponible: true
  }
];

function serializeProduct(p) {
  const lines = [];
  lines.push('  {');
  lines.push(`    id: ${JSON.stringify(p.id)},`);
  lines.push(`    nombre: ${JSON.stringify(p.nombre)},`);
  lines.push(`    name: ${JSON.stringify(p.name)},`);
  lines.push(`    marca: ${JSON.stringify(p.marca)},`);
  lines.push(`    brand: ${JSON.stringify(p.brand)},`);
  lines.push(`    category: ${JSON.stringify(p.category)},`);
  lines.push(`    range: ${JSON.stringify(p.range)},`);
  lines.push(`    precio: ${p.precio},`);
  lines.push(`    price: ${p.price},`);
  lines.push(`    originalPrice: ${p.originalPrice},`);
  lines.push(`    imagen: ${JSON.stringify(p.imagen)},`);
  lines.push(`    image: ${JSON.stringify(p.image)},`);
  lines.push(`    badge: ${JSON.stringify(p.badge)},`);
  lines.push(`    badgeType: ${JSON.stringify(p.badgeType)},`);
  lines.push(`    registro: ${JSON.stringify(p.registro)},`);
  lines.push(`    stock: ${p.stock},`);
  lines.push(`    rating: ${p.rating},`);
  lines.push(`    reviewsCount: ${p.reviewsCount},`);
  lines.push(`    gallery: ${JSON.stringify(p.gallery, null, 6).replace(/\]/g, '    ]')},`);
  lines.push(`    specs: ${JSON.stringify(p.specs)},`);
  lines.push(`    specsObj: ${JSON.stringify(p.specsObj, null, 6).replace(/\}/g, '    }')},`);
  lines.push(`    colors: ${JSON.stringify(p.colors)},`);
  lines.push(`    description: ${JSON.stringify(p.description)},`);
  lines.push(`    disponible: ${p.disponible}`);
  lines.push('  }');
  return lines.join('\n');
}

const productsFilePath = path.join(__dirname, '..', 'data', 'products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Buscamos `id: "redmi-note-13-pro-plus"` en products.js
const markerRedmi = 'id: "redmi-note-13-pro-plus"';
const idxMarker = content.indexOf(markerRedmi);

if (idxMarker === -1) {
  console.error('No se encontró el marcador redmi-note-13-pro-plus');
  process.exit(1);
}

// Retroceder hasta la llave de apertura del producto {
const startCut = content.lastIndexOf('{', idxMarker);

// Avanzar hasta el cierre de este producto: `}`
const endBracket = content.indexOf('}', idxMarker);

// Avanzar hasta la coma que le sigue si existe
let endCut = endBracket + 1;
while (content[endCut] === ',' || content[endCut] === ' ' || content[endCut] === '\n' || content[endCut] === '\r') {
  if (content[endCut] === ',') {
    endCut++;
    break;
  }
  endCut++;
}

// Reemplazamos redmi-note-13-pro-plus con los 43 productos nuevos
const serializedNew = xiaomiRedmiProducts.map(serializeProduct).join(',\n') + ',\n  ';

let newContent = content.substring(0, startCut) + serializedNew + content.substring(endCut);

// Bump CATALOG_VERSION
newContent = newContent.replace(
  /const CATALOG_VERSION = ".*?";/,
  'const CATALOG_VERSION = "2026-10-20-xiaomi-redmi-v1";'
);

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log('¡Catálogo actualizado con éxito!');
console.log(`Se agregaron ${xiaomiRedmiProducts.length} productos Redmi/Xiaomi.`);
