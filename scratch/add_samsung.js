const fs = require('fs');
const path = require('path');

const samsungGalaxyProducts = [
  // 1. GALAXY A06 128GB/4RAM S/450®️
  {
    id: "galaxy-a06-128gb-4ram",
    nombre: "Samsung Galaxy A06 128GB (4GB RAM)",
    name: "Samsung Galaxy A06 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "economica",
    precio: 450,
    price: 450,
    originalPrice: 520,
    imagen: "assets/img/brands/Samsung/samsung-a07.webp",
    image: "assets/img/brands/Samsung/samsung-a07.webp",
    badge: "OFERTA",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.7,
    reviewsCount: 32,
    gallery: [
      "assets/img/brands/Samsung/samsung-a07.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["128 GB Almacenamiento", "4 GB RAM", "Pantalla 6.7\" 90Hz", "Batería 5,000 mAh 25W"],
    specsObj: {
      screen: "6.7\" HD+ 90Hz U-Cut Display",
      processor: "MediaTek Helio G85 Octa-Core",
      ram: "4 GB RAM (+4GB RAM Plus)",
      storage: "128 GB (MicroSD hasta 1TB)",
      cameras: "50 MP Principal + 2 MP Profundidad + 8 MP Frontal",
      battery: "5,000 mAh | Carga rápida 25W"
    },
    colors: ["Negro", "Azul Claro", "Dorado"],
    description: "Gran pantalla de 6.7\" fluida a 90Hz con procesador Helio G85, cámara nítida de 50 MP y soporte de carga rápida de 25W con batería de 5,000 mAh. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 2. GALAXY A07 64GB/4RAM S/440®️
  {
    id: "galaxy-a07-64gb-4ram",
    nombre: "Samsung Galaxy A07 64GB (4GB RAM)",
    name: "Samsung Galaxy A07 64GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "economica",
    precio: 440,
    price: 440,
    originalPrice: 500,
    imagen: "assets/img/brands/Samsung/samsung-a07.webp",
    image: "assets/img/brands/Samsung/samsung-a07.webp",
    badge: "NUEVO INGRESO",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.7,
    reviewsCount: 20,
    gallery: [
      "assets/img/brands/Samsung/samsung-a07.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["64 GB Expandible", "4 GB RAM", "Pantalla 90Hz", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.7\" HD+ 90Hz Infinity-U",
      processor: "MediaTek Helio G85 / Exynos Octa-Core",
      ram: "4 GB RAM (+RAM Plus)",
      storage: "64 GB (Expandible)",
      cameras: "50 MP AI + Frontal 8 MP",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Negro", "Verde Claro", "Plata"],
    description: "Nueva generación de entrada Galaxy A07 con diseño elegante, pantalla a 90Hz y cámara principal de 50 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 3. GALAXY A07 128GB/4RAM S/460®️
  {
    id: "galaxy-a07-128gb-4ram",
    nombre: "Samsung Galaxy A07 128GB (4GB RAM)",
    name: "Samsung Galaxy A07 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "economica",
    precio: 460,
    price: 460,
    originalPrice: 530,
    imagen: "assets/img/brands/Samsung/samsung-a07.webp",
    image: "assets/img/brands/Samsung/samsung-a07.webp",
    badge: "MÁS VENDIDO",
    badgeType: "offer",
    registro: "R",
    stock: 18,
    rating: 4.8,
    reviewsCount: 35,
    gallery: [
      "assets/img/brands/Samsung/samsung-a07.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["128 GB Almacenamiento", "4 GB RAM", "Cámara 50 MP", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.7\" HD+ 90Hz Infinity-U",
      processor: "MediaTek Helio G85 / Exynos Octa-Core",
      ram: "4 GB RAM (+RAM Plus)",
      storage: "128 GB (Expandible hasta 1TB)",
      cameras: "50 MP AI + Frontal 8 MP",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Negro", "Verde Claro", "Plata"],
    description: "Versión de 128GB del Galaxy A07 para almacenar miles de recuerdos con máxima comodidad. Pantalla fluida a 90Hz y gran autonomía. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 4. GALAXY A16 128GB/4RAM S/520®️
  {
    id: "galaxy-a16-128gb-4ram",
    nombre: "Samsung Galaxy A16 128GB (4GB RAM)",
    name: "Samsung Galaxy A16 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "economica",
    precio: 520,
    price: 520,
    originalPrice: 600,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "SUPER AMOLED",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.8,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Super AMOLED 90Hz", "128 GB", "4 GB RAM", "6 Años Actualizaciones"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 90Hz 800 nits",
      processor: "MediaTek Helio G99 Octa-Core (6nm)",
      ram: "4 GB RAM",
      storage: "128 GB",
      cameras: "50 MP Principal + 5 MP Ultra Gran Angular + 2 MP Macro + 13 MP Frontal",
      battery: "5,000 mAh | Carga rápida 25W"
    },
    colors: ["Azul Grisáceo", "Verde Claro", "Negro"],
    description: "Pantalla Super AMOLED de colores vivos con 6 años garantizados de actualizaciones de seguridad de Samsung. Cámara triple con sensor de 50 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 5. GALAXY A16 5G 128GB/4RAM S/600®️
  {
    id: "galaxy-a16-5g-128gb-4ram",
    nombre: "Samsung Galaxy A16 5G 128GB (4GB RAM)",
    name: "Samsung Galaxy A16 5G 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 600,
    price: 600,
    originalPrice: 690,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "RED 5G",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Conectividad 5G", "Super AMOLED 90Hz", "128 GB", "6 Años de Soporte"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 90Hz",
      processor: "Samsung Exynos 1330 5G / Dimensity 6300",
      ram: "4 GB RAM",
      storage: "128 GB",
      cameras: "50 MP + 5 MP Ultra Gran Angular + 13 MP Frontal",
      battery: "5,000 mAh | Carga rápida 25W"
    },
    colors: ["Azul Marino", "Dorado Claro", "Verde Turquesa"],
    description: "Conectividad 5G ultrarrápida combinada con pantalla Super AMOLED de 6.7\" y soporte oficial de 6 años de software. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 6. GALAXY A17 4G 128GB/4RAM S/660®️
  {
    id: "galaxy-a17-4g-128gb-4ram",
    nombre: "Samsung Galaxy A17 4G 128GB (4GB RAM)",
    name: "Samsung Galaxy A17 4G 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 660,
    price: 660,
    originalPrice: 760,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "NUEVA SERIE A17",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 4.8,
    reviewsCount: 25,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Super AMOLED 90Hz", "128 GB", "4 GB RAM", "Cámara 50 MP OIS"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 90Hz Vision Booster",
      processor: "MediaTek Helio G99-Ultra / Exynos",
      ram: "4 GB RAM",
      storage: "128 GB",
      cameras: "50 MP con OIS + 5 MP UGA + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Negro Grafito", "Azul Cielo", "Plata Estelar"],
    description: "Estreno de la nueva serie Galaxy A17 con cámara estabilizada OIS de 50 MP y pantalla Super AMOLED con Vision Booster. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 7. GALAXY A17 4G 256GB/8RAM S/870®️
  {
    id: "galaxy-a17-4g-256gb-8ram",
    nombre: "Samsung Galaxy A17 4G 256GB (8GB RAM)",
    name: "Samsung Galaxy A17 4G 256GB (8GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 870,
    price: 870,
    originalPrice: 990,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "256GB / 8GB RAM",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 36,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["256 GB Almacenamiento", "8 GB RAM", "Super AMOLED 90Hz", "Cámara 50 MP OIS"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 90Hz Vision Booster",
      processor: "MediaTek Helio G99-Ultra / Exynos",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP con OIS + 5 MP UGA + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Negro Grafito", "Azul Cielo", "Plata Estelar"],
    description: "Configuración máxima de 8GB de RAM y 256GB de almacenamiento para el Galaxy A17. Excelente fluidez en juegos y apps. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 8. GALAXY A17 5G 128GB/4RAM S/730®️
  {
    id: "galaxy-a17-5g-128gb-4ram",
    nombre: "Samsung Galaxy A17 5G 128GB (4GB RAM)",
    name: "Samsung Galaxy A17 5G 128GB (4GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 730,
    price: 730,
    originalPrice: 840,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "5G VELOCIDAD",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 30,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Red 5G", "128 GB", "4 GB RAM", "Super AMOLED 120Hz"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 120Hz",
      processor: "Samsung Exynos 1380 / 1480 5G (5nm)",
      ram: "4 GB RAM",
      storage: "128 GB",
      cameras: "50 MP OIS + 5 MP UGA + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Awesome Black", "Awesome Blue", "Awesome Lime"],
    description: "Conectividad 5G con pantalla Super AMOLED de 120Hz para navegación y streaming ultra fluidos. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 9. GALAXY A17 5G 128GB/6RAM S/790®️
  {
    id: "galaxy-a17-5g-128gb-6ram",
    nombre: "Samsung Galaxy A17 5G 128GB (6GB RAM)",
    name: "Samsung Galaxy A17 5G 128GB (6GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 790,
    price: 790,
    originalPrice: 910,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "6GB RAM 5G",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 34,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Red 5G", "128 GB", "6 GB RAM", "Super AMOLED 120Hz"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 120Hz",
      processor: "Samsung Exynos 1380 / 1480 5G (5nm)",
      ram: "6 GB RAM",
      storage: "128 GB",
      cameras: "50 MP OIS + 5 MP UGA + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Awesome Black", "Awesome Blue", "Awesome Lime"],
    description: "Versión de 6GB de RAM para multitarea ágil y descargas en red 5G sin interrupciones. Pantalla Super AMOLED a 120Hz. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 10. GALAXY A17 5G 256GB/8RAM S/990®️
  {
    id: "galaxy-a17-5g-256gb-8ram",
    nombre: "Samsung Galaxy A17 5G 256GB (8GB RAM)",
    name: "Samsung Galaxy A17 5G 256GB (8GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 990,
    price: 990,
    originalPrice: 1140,
    imagen: "assets/img/brands/Samsung/samsung-a17.webp",
    image: "assets/img/brands/Samsung/samsung-a17.webp",
    badge: "TOP SERIE A17",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.9,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Samsung/samsung-a17.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Red 5G", "Super AMOLED 120Hz"],
    specsObj: {
      screen: "6.7\" FHD+ Super AMOLED 120Hz",
      processor: "Samsung Exynos 1380 / 1480 5G (5nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 5 MP UGA + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Awesome Black", "Awesome Blue", "Awesome Lime"],
    description: "El más completo de la serie A17 con 256GB de almacenamiento interno y 8GB de RAM. Soporte 5G y cámara estabilizada OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 11. GALAXY A27 5G 128GB/6RAM S/1070®️
  {
    id: "galaxy-a27-5g-128gb-6ram",
    nombre: "Samsung Galaxy A27 5G 128GB (6GB RAM)",
    name: "Samsung Galaxy A27 5G 128GB (6GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 1070,
    price: 1070,
    originalPrice: 1230,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "NUEVA SERIE A27",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 4.8,
    reviewsCount: 28,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Super AMOLED 120Hz", "128 GB", "6 GB RAM", "Cámara 50 MP OIS"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz 1000 nits",
      processor: "Exynos 1380 Octa-Core 5G (5nm)",
      ram: "6 GB RAM",
      storage: "128 GB",
      cameras: "50 MP con OIS + 8 MP Ultra Gran Angular + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Azul Hielo", "Negro", "Amarillo Suave"],
    description: "Línea A27 con diseño prémium plano, panel Super AMOLED de 1000 nits a 120Hz y cámara con OIS para fotos nítidas sin movimiento. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 12. GALAXY A27 5G 256GB/8RAM S/1240®️
  {
    id: "galaxy-a27-5g-256gb-8ram",
    nombre: "Samsung Galaxy A27 5G 256GB (8GB RAM)",
    name: "Samsung Galaxy A27 5G 256GB (8GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 1240,
    price: 1240,
    originalPrice: 1420,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "256GB / 8GB RAM",
    badgeType: "offer",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["256 GB", "8 GB RAM", "Super AMOLED 120Hz", "Cámara 50 MP OIS"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz 1000 nits",
      processor: "Exynos 1380 Octa-Core 5G (5nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP con OIS + 8 MP Ultra Gran Angular + 13 MP Frontal",
      battery: "5,000 mAh | Carga 25W"
    },
    colors: ["Azul Hielo", "Negro", "Amarillo Suave"],
    description: "Configuración de 256GB de almacenamiento y 8GB de RAM para el Galaxy A27 5G. Potencia y almacenamiento para años de uso. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 13. GALAXY A36 5G 256GB/8RAM S/1240®️
  {
    id: "galaxy-a36-5g-256gb-8ram",
    nombre: "Samsung Galaxy A36 5G 256GB (8GB RAM)",
    name: "Samsung Galaxy A36 5G 256GB (8GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 1240,
    price: 1240,
    originalPrice: 1430,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "RESISTENCIA IP67",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 44,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Certificación IP67 Agua", "256 GB", "8 GB RAM", "Super AMOLED 120Hz"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz Vision Booster",
      processor: "Samsung Exynos 1380 5G (5nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 8 MP Ultra Gran Angular + 5 MP Macro + 13 MP Selfie",
      battery: "5,000 mAh | Carga rápida 25W"
    },
    colors: ["Awesome Lilac", "Awesome Navy", "Awesome Iceblue"],
    description: "Resistencia certificada IP67 contra inmersiones accidentales en agua y polvo. Pantalla Super AMOLED a 120Hz y cámara cuádruple de 50 MP con OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 14. GALAXY A37 5G 256GB/8RAM S/1290®️
  {
    id: "galaxy-a37-5g-256gb-8ram",
    nombre: "Samsung Galaxy A37 5G 256GB (8GB RAM)",
    name: "Samsung Galaxy A37 5G 256GB (8GB RAM)",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media",
    precio: 1290,
    price: 1290,
    originalPrice: 1480,
    imagen: "assets/img/brands/Samsung/samsung-a57.webp",
    image: "assets/img/brands/Samsung/samsung-a57.webp",
    badge: "NUEVA GENERACIÓN A37",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Samsung/samsung-a57.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["IP67 Agua y Polvo", "256 GB", "8 GB RAM", "Super AMOLED 120Hz"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz 1200 nits",
      processor: "Exynos 1480 5G con GPU AMD RDNA",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 12 MP UGA + 16 MP Frontal",
      battery: "5,000 mAh | Carga rápida 25W"
    },
    colors: ["Awesome Lilac", "Awesome Navy", "Awesome Iceblue"],
    description: "Evolución de la serie A30 con procesador Exynos 1480 con arquitectura gráfica AMD, pantalla de 1200 nits y resistencia al agua IP67. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 15. GALAXY A56 5G 256GB/8RAM S/1320 (Libre)
  {
    id: "galaxy-a56-5g-256gb-8ram-libre",
    nombre: "Samsung Galaxy A56 5G 256GB (8GB RAM) Libre",
    name: "Samsung Galaxy A56 5G 256GB (8GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1320,
    price: 1320,
    originalPrice: 1520,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "VERSIÓN LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 4.9,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "8 GB RAM", "Marco de Metal & IP67"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz HDR10+ Gorilla Glass Victus+",
      processor: "Samsung Exynos 1480 5G con gráficos AMD Xclipse",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS sensor grande + 12 MP Ultra Gran Angular + 32 MP Selfie",
      battery: "5,000 mAh | Carga rápida 25W / 45W"
    },
    colors: ["Awesome Iceblue", "Awesome Navy", "Awesome Lilac"],
    description: "Versión Libre del Galaxy A56 5G. Marco de metal prémium, cristal Victus+, resistencia al agua IP67 y potente cámara de 50 MP OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 16. GALAXY A56 5G 256GB/8RAM S/1480®️ (Registrado R)
  {
    id: "galaxy-a56-5g-256gb-8ram-reg",
    nombre: "Samsung Galaxy A56 5G 256GB (8GB RAM) Registrado",
    name: "Samsung Galaxy A56 5G 256GB (8GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1480,
    price: 1480,
    originalPrice: 1690,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.9,
    reviewsCount: 58,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "Marco de Metal & IP67"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz HDR10+ Gorilla Glass Victus+",
      processor: "Samsung Exynos 1480 5G con gráficos AMD Xclipse",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS sensor grande + 12 MP Ultra Gran Angular + 32 MP Selfie",
      battery: "5,000 mAh | Carga rápida 25W / 45W"
    },
    colors: ["Awesome Iceblue", "Awesome Navy", "Awesome Lilac"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del Galaxy A56 5G. Resistencia IP67 y chasis de metal. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 17. GALAXY A56 5G 256GB/12RAM S/1370 (Libre)
  {
    id: "galaxy-a56-5g-256gb-12ram-libre",
    nombre: "Samsung Galaxy A56 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy A56 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1370,
    price: 1370,
    originalPrice: 1580,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "12GB RAM LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 10,
    rating: 4.9,
    reviewsCount: 35,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "12 GB RAM", "Gráficos AMD Xclipse"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz Victus+",
      processor: "Samsung Exynos 1480 5G (4nm)",
      ram: "12 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 12 MP UGA + 32 MP Frontal",
      battery: "5,000 mAh | Carga 25W / 45W"
    },
    colors: ["Awesome Iceblue", "Awesome Navy", "Awesome Lemon"],
    description: "Edición con 12GB de memoria RAM física en versión Libre para los usuarios más exigentes. Gráficos AMD y pantalla a 120Hz. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 18. GALAXY A56 5G 256GB/12RAM S/1590®️ (Registrado R)
  {
    id: "galaxy-a56-5g-256gb-12ram-reg",
    nombre: "Samsung Galaxy A56 5G 256GB (12GB RAM) Registrado",
    name: "Samsung Galaxy A56 5G 256GB (12GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1590,
    price: 1590,
    originalPrice: 1820,
    imagen: "assets/img/brands/Samsung/samsung-a56.webp",
    image: "assets/img/brands/Samsung/samsung-a56.webp",
    badge: "12GB RAM REGISTRADO",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 5.0,
    reviewsCount: 50,
    gallery: [
      "assets/img/brands/Samsung/samsung-a56.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "12 GB RAM", "Gráficos AMD Xclipse"],
    specsObj: {
      screen: "6.6\" FHD+ Super AMOLED 120Hz Victus+",
      processor: "Samsung Exynos 1480 5G (4nm)",
      ram: "12 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 12 MP UGA + 32 MP Frontal",
      battery: "5,000 mAh | Carga 25W / 45W"
    },
    colors: ["Awesome Iceblue", "Awesome Navy", "Awesome Lemon"],
    description: "Tope de gama de la serie A56 con 12GB de RAM y homologación oficial registrada en lista blanca MTC. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 19. GALAXY A57 5G 256GB/8RAM S/1460 (Libre)
  {
    id: "galaxy-a57-5g-256gb-8ram-libre",
    nombre: "Samsung Galaxy A57 5G 256GB (8GB RAM) Libre",
    name: "Samsung Galaxy A57 5G 256GB (8GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1460,
    price: 1460,
    originalPrice: 1680,
    imagen: "assets/img/brands/Samsung/samsung-a57.webp",
    image: "assets/img/brands/Samsung/samsung-a57.webp",
    badge: "NUEVO A57 LIBRE",
    badgeType: "new",
    registro: "Libre",
    stock: 11,
    rating: 4.9,
    reviewsCount: 32,
    gallery: [
      "assets/img/brands/Samsung/samsung-a57.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "8 GB RAM", "Galaxy AI & IP68"],
    specsObj: {
      screen: "6.65\" FHD+ Super AMOLED 120Hz 1400 nits",
      processor: "Samsung Exynos 1580 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS Pro + 12 MP Ultra Gran Angular + 32 MP Selfie 4K",
      battery: "5,000 mAh | Carga 45W Fast Charging"
    },
    colors: ["Awesome Iceblue", "Awesome Graphite", "Awesome Lilac"],
    description: "Nuevo Galaxy A57 con funciones de Galaxy AI integradas, carga rápida de 45W y pantalla de 1400 nits. Versión Libre. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 20. GALAXY A57 5G 256GB/8RAM S/1550®️ (Registrado R)
  {
    id: "galaxy-a57-5g-256gb-8ram-reg",
    nombre: "Samsung Galaxy A57 5G 256GB (8GB RAM) Registrado",
    name: "Samsung Galaxy A57 5G 256GB (8GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1550,
    price: 1550,
    originalPrice: 1780,
    imagen: "assets/img/brands/Samsung/samsung-a57.webp",
    image: "assets/img/brands/Samsung/samsung-a57.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 5.0,
    reviewsCount: 48,
    gallery: [
      "assets/img/brands/Samsung/samsung-a57.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "Galaxy AI & IP68"],
    specsObj: {
      screen: "6.65\" FHD+ Super AMOLED 120Hz 1400 nits",
      processor: "Samsung Exynos 1580 5G (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS Pro + 12 MP Ultra Gran Angular + 32 MP Selfie 4K",
      battery: "5,000 mAh | Carga 45W Fast Charging"
    },
    colors: ["Awesome Iceblue", "Awesome Graphite", "Awesome Lilac"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del nuevo Galaxy A57. Soporte para Galaxy AI y cámara de 50 MP OIS. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 21. GALAXY A57 5G 512GB/12RAM (CONSULTAR 👀)
  {
    id: "galaxy-a57-5g-512gb-12ram-libre",
    nombre: "Samsung Galaxy A57 5G 512GB (12GB RAM) Libre",
    name: "Samsung Galaxy A57 5G 512GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 1750,
    price: 1750,
    originalPrice: 1990,
    imagen: "assets/img/brands/Samsung/samsung-a57.webp",
    image: "assets/img/brands/Samsung/samsung-a57.webp",
    badge: "CONSULTAR PRECIO",
    badgeType: "offer",
    registro: "Libre",
    stock: 8,
    rating: 5.0,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/Samsung/samsung-a57.webp",
      "assets/img/brands/Samsung/samsung-a-series.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["512 GB Capacidad", "12 GB RAM", "Galaxy AI", "Carga 45W"],
    specsObj: {
      screen: "6.65\" FHD+ Super AMOLED 120Hz 1400 nits",
      processor: "Samsung Exynos 1580 5G (4nm)",
      ram: "12 GB RAM",
      storage: "512 GB",
      cameras: "50 MP OIS Pro + 12 MP Ultra Gran Angular + 32 MP Selfie 4K",
      battery: "5,000 mAh | Carga 45W Fast Charging"
    },
    colors: ["Awesome Iceblue", "Awesome Graphite"],
    description: "Versión tope de gama del Galaxy A57 5G con 512GB de memoria y 12GB de RAM física. Consultar precio y disponibilidad en tiempo real por WhatsApp. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 22. GALAXY S26 256GB/12RAM S/2770 (Libre)
  {
    id: "galaxy-s26-256gb-12ram-libre",
    nombre: "Samsung Galaxy S26 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy S26 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 2770,
    price: 2770,
    originalPrice: 3190,
    imagen: "assets/img/brands/Samsung/samsung-hero.webp",
    image: "assets/img/brands/Samsung/samsung-hero.webp",
    badge: "GALAXY AI 2026",
    badgeType: "new",
    registro: "Libre",
    stock: 9,
    rating: 5.0,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/brands/Samsung/samsung-s26-ultra.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "12 GB RAM", "Snapdragon 8 Elite"],
    specsObj: {
      screen: "6.2\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits",
      processor: "Snapdragon 8 Elite / Exynos 2500 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "50 MP Dual Pixel OIS + 10 MP Telefoto 3x + 12 MP Ultra Gran Angular",
      battery: "4,000 mAh | Carga 25W + Carga Inalámbrica 15W"
    },
    colors: ["Cobalt Violet", "Amber Yellow", "Onyx Black"],
    description: "El nuevo buque insignia compacto Galaxy S26 con 12GB de RAM y la suite completa de Galaxy AI de última generación. Versión Libre. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 23. GALAXY S24 FE 256GB/8RAM S/2050®️ (Registrado R)
  {
    id: "galaxy-s24-fe-256gb-8ram-reg",
    nombre: "Samsung Galaxy S24 FE 5G 256GB (8GB RAM) Registrado",
    name: "Samsung Galaxy S24 FE 5G 256GB (8GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 2050,
    price: 2050,
    originalPrice: 2390,
    imagen: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    image: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 14,
    rating: 4.9,
    reviewsCount: 52,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-fe.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "Galaxy AI Completo"],
    specsObj: {
      screen: "6.7\" Dynamic AMOLED 2X 120Hz 1900 nits",
      processor: "Exynos 2400e Deca-Core (4nm)",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP OIS + 8 MP Telefoto 3x OIS + 12 MP UGA + 10 MP Frontal",
      battery: "4,700 mAh | Carga 25W + Inalámbrica"
    },
    colors: ["Azul", "Grafito", "Menta"],
    description: "Versión Registrada en lista blanca MTC con pantalla de 6.7\" Dynamic AMOLED 2X, teleobjetivo 3x óptico y toda la inteligencia artificial de Galaxy AI. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 24. GALAXY S25 FE 256GB/8RAM S/2070 (Libre)
  {
    id: "galaxy-s25-fe-256gb-8ram-libre",
    nombre: "Samsung Galaxy S25 FE 5G 256GB (8GB RAM) Libre",
    name: "Samsung Galaxy S25 FE 5G 256GB (8GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 2070,
    price: 2070,
    originalPrice: 2390,
    imagen: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    image: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    badge: "NUEVO S25 FE LIBRE",
    badgeType: "new",
    registro: "Libre",
    stock: 11,
    rating: 4.9,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-fe.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "256 GB", "8 GB RAM", "ProVisual Engine AI"],
    specsObj: {
      screen: "6.7\" Dynamic AMOLED 2X 120Hz 2000 nits",
      processor: "Exynos 2400 / Snapdragon 8 Gen 3 FE",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP con OIS Pro + 8 MP Telefoto 3x + 12 MP UGA",
      battery: "4,800 mAh | Carga 25W + Inalámbrica"
    },
    colors: ["Icy Blue", "Jet Black", "Silver Shadow"],
    description: "Versión Libre del nuevo S25 Fan Edition con motor fotográfico ProVisual Engine, pantalla brillante de 2000 nits y teleobjetivo de 3 aumentos. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 25. GALAXY S25 FE 256GB/8RAM S/2360®️ (Registrado R)
  {
    id: "galaxy-s25-fe-256gb-8ram-reg",
    nombre: "Samsung Galaxy S25 FE 5G 256GB (8GB RAM) Registrado",
    name: "Samsung Galaxy S25 FE 5G 256GB (8GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 2360,
    price: 2360,
    originalPrice: 2690,
    imagen: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    image: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.9,
    reviewsCount: 47,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-fe.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "256 GB", "8 GB RAM", "ProVisual Engine AI"],
    specsObj: {
      screen: "6.7\" Dynamic AMOLED 2X 120Hz 2000 nits",
      processor: "Exynos 2400 / Snapdragon 8 Gen 3 FE",
      ram: "8 GB RAM",
      storage: "256 GB",
      cameras: "50 MP con OIS Pro + 8 MP Telefoto 3x + 12 MP UGA",
      battery: "4,800 mAh | Carga 25W + Inalámbrica"
    },
    colors: ["Icy Blue", "Jet Black", "Silver Shadow"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del Galaxy S25 FE. Excelente desempeño fotográfico con IA y zoom óptico 3x. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 26. GALAXY S25 FE 512GB/8RAM S/2300 (Libre)
  {
    id: "galaxy-s25-fe-512gb-8ram-libre",
    nombre: "Samsung Galaxy S25 FE 5G 512GB (8GB RAM) Libre",
    name: "Samsung Galaxy S25 FE 5G 512GB (8GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "media-alta",
    precio: 2300,
    price: 2300,
    originalPrice: 2650,
    imagen: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    image: "assets/img/brands/Samsung/samsung-s25-fe.webp",
    badge: "512GB LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 10,
    rating: 5.0,
    reviewsCount: 30,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-fe.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "8 GB RAM", "Galaxy AI"],
    specsObj: {
      screen: "6.7\" Dynamic AMOLED 2X 120Hz 2000 nits",
      processor: "Exynos 2400 / Snapdragon 8 Gen 3 FE",
      ram: "8 GB RAM",
      storage: "512 GB",
      cameras: "50 MP con OIS Pro + 8 MP Telefoto 3x + 12 MP UGA",
      battery: "4,800 mAh | Carga 25W + Inalámbrica"
    },
    colors: ["Icy Blue", "Jet Black", "Silver Shadow"],
    description: "Versión Libre del Galaxy S25 FE con 512GB de almacenamiento para guardar tus fotos y videos en máxima calidad sin saturar la memoria. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 27. GALAXY S25 ULTRA 5G 256GB/12RAM S/2830 (Libre)
  {
    id: "galaxy-s25-ultra-256gb-12ram-libre",
    nombre: "Samsung Galaxy S25 Ultra 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy S25 Ultra 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 2830,
    price: 2830,
    originalPrice: 3250,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "TITANIO & S-PEN",
    badgeType: "new",
    registro: "Libre",
    stock: 12,
    rating: 5.0,
    reviewsCount: 65,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "Titanio Grado 5", "256 GB / 12 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Silver"],
    description: "Versión Libre del Galaxy S25 Ultra con estructura de titanio grado aeroespacial, S-Pen integrado, sensor fotográfico de 200 MP y el chip Snapdragon 8 Elite. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 28. GALAXY S25 ULTRA 5G 256GB/12RAM S/3030® (Registrado R)
  {
    id: "galaxy-s25-ultra-256gb-12ram-reg",
    nombre: "Samsung Galaxy S25 Ultra 5G 256GB (12GB RAM) Registrado",
    name: "Samsung Galaxy S25 Ultra 5G 256GB (12GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3030,
    price: 3030,
    originalPrice: 3450,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 15,
    rating: 5.0,
    reviewsCount: 78,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "Titanio Grado 5", "256 GB / 12 GB RAM", "S-Pen Integrado"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Silver"],
    description: "Versión Registrada (R) con homologación en lista blanca MTC del Galaxy S25 Ultra. Chasis de titanio, S-Pen y cámara cuádruple con zoom 100x Space Zoom. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 29. GALAXY S25 ULTRA 5G 512GB/12RAM S/3070 (Libre)
  {
    id: "galaxy-s25-ultra-512gb-12ram-libre",
    nombre: "Samsung Galaxy S25 Ultra 5G 512GB (12GB RAM) Libre",
    name: "Samsung Galaxy S25 Ultra 5G 512GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3070,
    price: 3070,
    originalPrice: 3500,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "512GB LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 5.0,
    reviewsCount: 54,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "12 GB RAM", "Cámara 200 MP OIS"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Silver"],
    description: "Versión Libre de 512GB del S25 Ultra. Capacidad masiva para fotografía en RAW de 200 MP y videos 8K sin limitaciones. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 30. GALAXY S25 ULTRA 5G 512GB/12RAM S/3280®️ (Registrado R)
  {
    id: "galaxy-s25-ultra-512gb-12ram-reg",
    nombre: "Samsung Galaxy S25 Ultra 5G 512GB (12GB RAM) Registrado",
    name: "Samsung Galaxy S25 Ultra 5G 512GB (12GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3280,
    price: 3280,
    originalPrice: 3750,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 5.0,
    reviewsCount: 85,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "12 GB RAM", "S-Pen & Titanio"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Silver"],
    description: "Versión Registrada (R) con 512GB de memoria y homologación oficial MTC del Galaxy S25 Ultra. Chasis de titanio, S-Pen y pantalla antideslumbrante Corning Armor. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 31. GALAXY S25 ULTRA 5G 1TB/12RAM S/3390 (Libre)
  {
    id: "galaxy-s25-ultra-1tb-12ram-libre",
    nombre: "Samsung Galaxy S25 Ultra 5G 1TB (12GB RAM) Libre",
    name: "Samsung Galaxy S25 Ultra 5G 1TB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3390,
    price: 3390,
    originalPrice: 3890,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "EDICIÓN 1TB LIBRE",
    badgeType: "new",
    registro: "Libre",
    stock: 7,
    rating: 5.0,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["1 Terabyte (1024 GB)", "12 GB RAM", "Titanio Grado 5", "S-Pen"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "1 TB (1024 GB) UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray"],
    description: "La edición de 1 Terabyte en versión Libre del S25 Ultra. Almacenamiento total sin límites para profesionales y creadores de contenido. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 32. GALAXY S25 ULTRA 5G 1TB/12RAM S/3480®️ (Registrado R)
  {
    id: "galaxy-s25-ultra-1tb-12ram-reg",
    nombre: "Samsung Galaxy S25 Ultra 5G 1TB (12GB RAM) Registrado",
    name: "Samsung Galaxy S25 Ultra 5G 1TB (12GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3480,
    price: 3480,
    originalPrice: 3990,
    imagen: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s25-ultra.webp",
    badge: "HOMOLOGADO 1TB",
    badgeType: "new",
    registro: "R",
    stock: 9,
    rating: 5.0,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Samsung/samsung-s25-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "1 TB Almacenamiento", "12 GB RAM", "S-Pen"],
    specsObj: {
      screen: "6.86\" Dynamic AMOLED 2X 120Hz LTPO 2600 nits Corning Armor",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "1 TB (1024 GB) UFS 4.0",
      cameras: "200 MP Principal OIS + 50 MP Periscopio 5x + 50 MP Ultra Gran Angular + 10 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W + Carga Inalámbrica 15W"
    },
    colors: ["Titanium Black", "Titanium Gray"],
    description: "Versión Registrada (R) con 1 Terabyte de almacenamiento y homologación oficial MTC del Galaxy S25 Ultra. Chasis de titanio y S-Pen integrado. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 33. GALAXY S26 PLUS 256GB/12RAM S/3130 (Libre)
  {
    id: "galaxy-s26-plus-256gb-12ram-libre",
    nombre: "Samsung Galaxy S26+ 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy S26+ 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3130,
    price: 3130,
    originalPrice: 3590,
    imagen: "assets/img/brands/Samsung/samsung-hero.webp",
    image: "assets/img/brands/Samsung/samsung-hero.webp",
    badge: "SERIE S26+",
    badgeType: "new",
    registro: "Libre",
    stock: 8,
    rating: 5.0,
    reviewsCount: 32,
    gallery: [
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/brands/Samsung/samsung-s26-ultra.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "Pantalla QHD+ 6.7\"", "256 GB / 12 GB RAM", "Carga 45W"],
    specsObj: {
      screen: "6.7\" Dynamic AMOLED 2X QHD+ 120Hz LTPO 2800 nits",
      processor: "Snapdragon 8 Elite / Exynos 2500 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "50 MP Dual Pixel OIS + 10 MP Telefoto 3x OIS + 12 MP UGA",
      battery: "4,900 mAh | Carga rápida 45W + 15W Wireless"
    },
    colors: ["Cobalt Violet", "Onyx Black", "Silver Shadow"],
    description: "Versión Libre del Galaxy S26 Plus con pantalla QHD+ ultrabrillante de 2800 nits, batería de 4,900 mAh y carga rápida de 45W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 34. GALAXY S26 ULTRA 5G 256GB/12RAM S/3330 (Libre)
  {
    id: "galaxy-s26-ultra-256gb-12ram-libre",
    nombre: "Samsung Galaxy S26 Ultra 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy S26 Ultra 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3330,
    price: 3330,
    originalPrice: 3790,
    imagen: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    badge: "EL MÁXIMO FLAGSHIP",
    badgeType: "new",
    registro: "Libre",
    stock: 10,
    rating: 5.0,
    reviewsCount: 56,
    gallery: [
      "assets/img/brands/Samsung/samsung-s26-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "Titanio Aeroespacial", "256 GB / 12 GB RAM", "Cámara 200 MP AI Pro"],
    specsObj: {
      screen: "6.9\" Dynamic AMOLED 2X 120Hz LTPO 3000 nits Corning Armor 2",
      processor: "Qualcomm Snapdragon 8 Elite Gen 2 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "200 MP Sensor OIS Mejorado + 50 MP Periscopio 5x/10x + 50 MP UGA + 50 MP Telefoto 3x",
      battery: "5,000 mAh | Carga 45W / 65W + 25W Inalámbrica"
    },
    colors: ["Titanium Gray", "Titanium Black", "Titanium Silver"],
    description: "El máximo buque insignia de Samsung en versión Libre. Pantalla de 6.9\" con 3000 nits, cámaras cuádruples con sensor de 200 MP y chasis de titanio. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 35. GALAXY S26 ULTRA 5G 512GB/12RAM S/3790 (Libre)
  {
    id: "galaxy-s26-ultra-512gb-12ram-libre",
    nombre: "Samsung Galaxy S26 Ultra 5G 512GB (12GB RAM) Libre",
    name: "Samsung Galaxy S26 Ultra 5G 512GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 3790,
    price: 3790,
    originalPrice: 4290,
    imagen: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    badge: "512GB LIBRE",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 5.0,
    reviewsCount: 68,
    gallery: [
      "assets/img/brands/Samsung/samsung-s26-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Versión Libre", "512 GB", "12 GB RAM", "S-Pen & Titanio"],
    specsObj: {
      screen: "6.9\" Dynamic AMOLED 2X 120Hz LTPO 3000 nits Corning Armor 2",
      processor: "Qualcomm Snapdragon 8 Elite Gen 2 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "200 MP Sensor OIS + 50 MP Periscopio + 50 MP UGA + 50 MP Telefoto",
      battery: "5,000 mAh | Carga 45W + 25W Wireless"
    },
    colors: ["Titanium Gray", "Titanium Black", "Titanium Silver"],
    description: "Versión Libre con 512GB del revolucionario Galaxy S26 Ultra. Capacidad masiva para tus contenidos profesionales y grabación en 8K a 60fps. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 36. GALAXY S26 ULTRA 5G 512GB/12RAM S/4290®️ (Registrado R)
  {
    id: "galaxy-s26-ultra-512gb-12ram-reg",
    nombre: "Samsung Galaxy S26 Ultra 5G 512GB (12GB RAM) Registrado",
    name: "Samsung Galaxy S26 Ultra 5G 512GB (12GB RAM) Registrado",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 4290,
    price: 4290,
    originalPrice: 4890,
    imagen: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    image: "assets/img/brands/Samsung/samsung-s26-ultra.webp",
    badge: "HOMOLOGADO S26 ULTRA",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 5.0,
    reviewsCount: 92,
    gallery: [
      "assets/img/brands/Samsung/samsung-s26-ultra.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Registrado MTC", "512 GB", "12 GB RAM", "Titanio & S-Pen"],
    specsObj: {
      screen: "6.9\" Dynamic AMOLED 2X 120Hz LTPO 3000 nits Corning Armor 2",
      processor: "Qualcomm Snapdragon 8 Elite Gen 2 (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "200 MP Sensor OIS + 50 MP Periscopio + 50 MP UGA + 50 MP Telefoto",
      battery: "5,000 mAh | Carga 45W + 25W Wireless"
    },
    colors: ["Titanium Gray", "Titanium Black", "Titanium Silver"],
    description: "Versión Registrada (R) con homologación oficial en lista blanca MTC del Galaxy S26 Ultra de 512GB. El pináculo de la ingeniería móvil con S-Pen y titanio aeroespacial. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  // 37. SAMSUNG ZFOLD 8 ULTRA 5G 256GB/12RAM S/6550 (Libre)
  {
    id: "samsung-zfold-8-ultra-256gb-12ram-libre",
    nombre: "Samsung Galaxy Z Fold 8 Ultra 5G 256GB (12GB RAM) Libre",
    name: "Samsung Galaxy Z Fold 8 Ultra 5G 256GB (12GB RAM) Libre",
    marca: "Samsung",
    brand: "Samsung",
    category: "samsung",
    range: "alta",
    precio: 6550,
    price: 6550,
    originalPrice: 7490,
    imagen: "assets/img/brands/Samsung/samsung-zfold-8.webp",
    image: "assets/img/brands/Samsung/samsung-zfold-8.webp",
    badge: "PLEGABLE DEFINITIVO",
    badgeType: "new",
    registro: "Libre",
    stock: 5,
    rating: 5.0,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Samsung/samsung-zfold-8.webp",
      "assets/img/brands/Samsung/samsung-hero.webp",
      "assets/img/ui/banners/Banner samsung.jpeg",
      "assets/img/brands/Samsung/Samsung_logo_clean.png"
    ],
    specs: ["Plegable Ultra Delgado", "Doble Pantalla Dynamic AMOLED 2X", "256 GB / 12 GB RAM", "Bisagra Armor Titanio"],
    specsObj: {
      screen: "Principal: 8.0\" Foldable Dynamic AMOLED 2X 120Hz 2800 nits | Externa: 6.5\" AMOLED 120Hz",
      processor: "Qualcomm Snapdragon 8 Elite for Galaxy (3nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "200 MP OIS + 12 MP Ultra Gran Angular + 10 MP Telefoto 3x OIS + Cámaras frontales duales",
      battery: "4,600 mAh Dual Cell | Carga 45W + Inalámbrica"
    },
    colors: ["Phantom Black", "Titanium Silver", "Navy Blue"],
    description: "El smartphone plegable definitivo de Samsung. Pantalla interior inmersiva de 8.0\", grosor ultradelgado, bisagra de titanio y cámara de 200 MP con Galaxy AI. Se emite comprobante de venta para garantía.",
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

// 1. Eliminar el viejo `samsung-a55-5g`
const idxA55 = content.indexOf('id: "samsung-a55-5g"');
if (idxA55 !== -1) {
  const startA55 = content.lastIndexOf('{', idxA55);
  const endA55Bracket = content.indexOf('}', idxA55);
  let endA55 = endA55Bracket + 1;
  while (content[endA55] === ',' || content[endA55] === ' ' || content[endA55] === '\n' || content[endA55] === '\r') {
    if (content[endA55] === ',') {
      endA55++;
      break;
    }
    endA55++;
  }
  content = content.substring(0, startA55) + content.substring(endA55);
}

// 2. Reemplazar `samsung-s24-ultra` con los 37 nuevos productos Samsung Galaxy
const idxS24 = content.indexOf('id: "samsung-s24-ultra"');
if (idxS24 === -1) {
  console.error('No se encontró samsung-s24-ultra');
  process.exit(1);
}

const startS24 = content.lastIndexOf('{', idxS24);
const endS24Bracket = content.indexOf('}', idxS24);
let endS24 = endS24Bracket + 1;
while (content[endS24] === ',' || content[endS24] === ' ' || content[endS24] === '\n' || content[endS24] === '\r') {
  if (content[endS24] === ',') {
    endS24++;
    break;
  }
  endS24++;
}

const serializedSamsung = samsungGalaxyProducts.map(serializeProduct).join(',\n') + ',\n  ';

let newContent = content.substring(0, startS24) + serializedSamsung + content.substring(endS24);

// Bump CATALOG_VERSION
newContent = newContent.replace(
  /const CATALOG_VERSION = ".*?";/,
  'const CATALOG_VERSION = "2026-10-20-samsung-galaxy-v1";'
);

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log('¡Catálogo Samsung actualizado con éxito!');
console.log(`Se integraron ${samsungGalaxyProducts.length} productos Samsung Galaxy.`);
