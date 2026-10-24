const fs = require('fs');
const path = require('path');

const infinixProducts = [
  {
    id: "infinix-smart-10-256gb",
    nombre: "Infinix Smart 10 256GB (4+4GB RAM)",
    name: "Infinix Smart 10 256GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "economica",
    precio: 410,
    price: 410,
    originalPrice: 470,
    imagen: "assets/img/brands/Infinix/infinix-smart-10.webp",
    image: "assets/img/brands/Infinix/infinix-smart-10.webp",
    badge: "256GB MEMORIA",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.7,
    reviewsCount: 22,
    gallery: [
      "assets/img/brands/Infinix/infinix-smart-10.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["256 GB Almacenamiento", "4GB + 4GB RAM Extendida", "Pantalla 120Hz Fluida", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.7\" HD+ 120Hz Punch-Hole con Dynamic Bar",
      processor: "Unisoc T606 Octa-Core de alto rendimiento",
      ram: "4 GB (+4GB RAM Virtual Dinámica = 8GB)",
      storage: "256 GB (Expandible con MicroSD hasta 1TB)",
      cameras: "13 MP AI con Flash Dual + Frontal 8 MP",
      battery: "5,000 mAh | Carga rápida Tipo-C"
    },
    colors: ["Negro Titanio", "Azul Glaciar", "Verde Menta"],
    description: "Increíble capacidad de 256GB en gama de entrada. Integra pantalla ultra fluida de 120Hz con Dynamic Bar interactiva para llamadas y notificaciones, más batería de 5,000 mAh. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-smart-20-64gb",
    nombre: "Infinix Smart 20 64GB (4+4GB RAM)",
    name: "Infinix Smart 20 64GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "economica",
    precio: 430,
    price: 430,
    originalPrice: 490,
    imagen: "assets/img/brands/Infinix/infinix-smart-20.webp",
    image: "assets/img/brands/Infinix/infinix-smart-20.webp",
    badge: "NUEVA GENERACIÓN",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.7,
    reviewsCount: 18,
    gallery: [
      "assets/img/brands/Infinix/infinix-smart-20.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["64 GB Expandible", "4GB + 4GB RAM Dinámica", "Pantalla 120Hz Fluida", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.7\" HD+ 120Hz Ultra Fluida con Dynamic Island",
      processor: "Unisoc T606 / Helio Octa-Core",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "64 GB (Expandible con MicroSD)",
      cameras: "13 MP AI Ultra Clara + Frontal 8 MP con Flash Dual",
      battery: "5,000 mAh | Conector Tipo-C de larga duración"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Dorado Titanio"],
    description: "Nueva generación Infinix Smart 20 con pantalla suave a 120Hz, interacción dinámica con Dynamic Island y potente batería de 5,000 mAh para todo el día. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-smart-20-128gb",
    nombre: "Infinix Smart 20 128GB (4+4GB RAM)",
    name: "Infinix Smart 20 128GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "economica",
    precio: 460,
    price: 460,
    originalPrice: 520,
    imagen: "assets/img/brands/Infinix/infinix-smart-20.webp",
    image: "assets/img/brands/Infinix/infinix-smart-20.webp",
    badge: "MÁS VENDIDO",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.8,
    reviewsCount: 25,
    gallery: [
      "assets/img/brands/Infinix/infinix-smart-20.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["128 GB Almacenamiento", "4GB + 4GB RAM Dinámica", "Pantalla 120Hz Fluida", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.7\" HD+ 120Hz Ultra Fluida con Dynamic Island",
      processor: "Unisoc T606 / Helio Octa-Core",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "128 GB (Expandible con MicroSD)",
      cameras: "13 MP AI Ultra Clara + Frontal 8 MP con Flash Dual",
      battery: "5,000 mAh | Conector Tipo-C de larga duración"
    },
    colors: ["Negro Medianoche", "Azul Glaciar", "Verde Esmeralda"],
    description: "Versión de 128GB del Infinix Smart 20 para almacenar miles de fotos y videos sin preocupaciones. Pantalla a 120Hz y gran autonomía. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-40i-256gb",
    nombre: "Infinix Hot 40i 256GB (4+4GB RAM)",
    name: "Infinix Hot 40i 256GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "economica",
    precio: 500,
    price: 500,
    originalPrice: 570,
    imagen: "assets/img/brands/Infinix/infinix-hot-40i.webp",
    image: "assets/img/brands/Infinix/infinix-hot-40i.webp",
    badge: "CÁMARA 50MP",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.8,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-40i.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Cámara 50 MP AI", "256 GB UFS", "Selfie 32 MP con Flash", "Carga Rápida 18W"],
    specsObj: {
      screen: "6.56\" HD+ 90Hz Punch-Hole con Magic Ring",
      processor: "Unisoc T606 Octa-Core Gaming Engine",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "256 GB Almacenamiento UFS",
      cameras: "50 MP AI Ultra Cámara + Frontal 32 MP con Flash Frontal",
      battery: "5,000 mAh | Carga rápida 18W USB-C"
    },
    colors: ["Negro Horizonte", "Azul Palma", "Dorado Estelar"],
    description: "Uno de los smartphones más equilibrados de su segmento. Cámara principal de 50 MP, selfie ultra nítida de 32 MP con flash para autorretratos definidos y 256GB de memoria interna. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-60i-256gb",
    nombre: "Infinix Hot 60i 256GB (4+4GB RAM)",
    name: "Infinix Hot 60i 256GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "economica",
    precio: 520,
    price: 520,
    originalPrice: 590,
    imagen: "assets/img/brands/Infinix/infinix-hot-60i.webp",
    image: "assets/img/brands/Infinix/infinix-hot-60i.webp",
    badge: "PANTALLA 120HZ",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 20,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-60i.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["256 GB Almacenamiento", "Pantalla 120Hz Punch-Hole", "Cámara 50 MP AI", "Carga Rápida 18W"],
    specsObj: {
      screen: "6.7\" HD+ 120Hz con Dynamic Bar interactiva",
      processor: "MediaTek Helio G81 Octa-Core de alta eficiencia",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "256 GB (Expandible con MicroSD)",
      cameras: "50 MP AI Ultra Detalle + Frontal 8 MP con Flash Dual",
      battery: "5,000 mAh | Carga rápida 18W Tipo-C"
    },
    colors: ["Gris Titanio", "Verde Menta", "Negro Elegance"],
    description: "La nueva evolución de la serie Hot con pantalla ultra rápida a 120Hz, procesador Helio G81 optimizado y 256GB de capacidad interna. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-60-pro-256gb",
    nombre: "Infinix Hot 60 Pro 256GB (8+8GB RAM)",
    name: "Infinix Hot 60 Pro 256GB (8+8GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media",
    precio: 770,
    price: 770,
    originalPrice: 880,
    imagen: "assets/img/brands/Infinix/infinix-hot-60-pro.webp",
    image: "assets/img/brands/Infinix/infinix-hot-60-pro.webp",
    badge: "16GB RAM TOTAL",
    badgeType: "offer",
    registro: "R",
    stock: 12,
    rating: 4.9,
    reviewsCount: 28,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-60-pro.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["8GB + 8GB RAM (16GB)", "256 GB Almacenamiento", "Pantalla AMOLED 120Hz", "Cámara 108 MP Pro"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 120Hz 1300 nits",
      processor: "MediaTek Helio G99 / G100 Octa-Core 6nm",
      ram: "8 GB LPDDR4X (+8GB RAM Virtual = 16GB)",
      storage: "256 GB UFS 2.2",
      cameras: "108 MP Principal Ultra Nítida + Macro + 32 MP Frontal",
      battery: "5,000 mAh | Carga rápida 33W All-Round FastCharge"
    },
    colors: ["Negro Obsidiana", "Azul Glaciar", "Oro Aurora"],
    description: "Poderoso rendimiento gaming con 16GB de RAM dinámica, pantalla AMOLED de 120Hz de colores vibrantes y cámara ultra nítida de 108 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-60-pro-plus-256gb",
    nombre: "Infinix Hot 60 Pro+ 256GB (8+8GB RAM)",
    name: "Infinix Hot 60 Pro+ 256GB (8+8GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media",
    precio: 830,
    price: 830,
    originalPrice: 950,
    imagen: "assets/img/brands/Infinix/infinix-hot-60-pro-plus.webp",
    image: "assets/img/brands/Infinix/infinix-hot-60-pro-plus.webp",
    badge: "PANTALLA CURVA 3D",
    badgeType: "new",
    registro: "R",
    stock: 11,
    rating: 4.9,
    reviewsCount: 34,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-60-pro-plus.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Pantalla Curva 3D 120Hz", "8GB + 8GB RAM (16GB)", "Cámara 108 MP OIS", "Carga Rápida 33W"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 3D Curva 120Hz Gorilla Glass",
      processor: "MediaTek Helio G100 Octa-Core 6nm Gaming",
      ram: "8 GB (+8GB RAM Dinámica = 16GB)",
      storage: "256 GB UFS 2.2",
      cameras: "108 MP Principal con OIS Estabilizado + 32 MP Frontal",
      battery: "5,000 mAh | Carga rápida 33W con Bypass Charging"
    },
    colors: ["Titanio Titan", "Verde Esmeralda Curvo", "Negro Satinado"],
    description: "Elegancia suprema con diseño ultradelgado y pantalla curva 3D AMOLED de 120Hz. Sensor principal de 108 MP con estabilización óptica y 16GB de memoria RAM dinámica. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-70-128gb",
    nombre: "Infinix Hot 70 128GB (4+4GB RAM)",
    name: "Infinix Hot 70 128GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media",
    precio: 650,
    price: 650,
    originalPrice: 730,
    imagen: "assets/img/brands/Infinix/infinix-hot-70.webp",
    image: "assets/img/brands/Infinix/infinix-hot-70.webp",
    badge: "SERIE 70",
    badgeType: "new",
    registro: "R",
    stock: 14,
    rating: 4.8,
    reviewsCount: 21,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-70.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["128 GB Almacenamiento", "4GB + 4GB RAM", "Pantalla 120Hz FHD+", "Cámara 64 MP AI"],
    specsObj: {
      screen: "6.78\" FHD+ 120Hz HyperEngine Display",
      processor: "MediaTek Helio G91 / G99 Octa-Core",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "128 GB",
      cameras: "64 MP AI Dual Cámara + 16 MP Frontal con Flash",
      battery: "5,000 mAh | Carga rápida 33W FastCharge"
    },
    colors: ["Negro Ébano", "Azul Galaxia", "Verde Selva"],
    description: "El lanzamiento de la nueva serie HOT 70 de Infinix. Pantalla FHD+ de 120Hz, cámara de 64 MP con IA y carga rápida de 33W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-70-256gb",
    nombre: "Infinix Hot 70 256GB (4+4GB RAM)",
    name: "Infinix Hot 70 256GB (4+4GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media",
    precio: 710,
    price: 710,
    originalPrice: 810,
    imagen: "assets/img/brands/Infinix/infinix-hot-70.webp",
    image: "assets/img/brands/Infinix/infinix-hot-70.webp",
    badge: "GRAN ESPACIO",
    badgeType: "offer",
    registro: "R",
    stock: 15,
    rating: 4.8,
    reviewsCount: 26,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-70.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["256 GB Almacenamiento", "4GB + 4GB RAM", "Pantalla 120Hz FHD+", "Carga Rápida 33W"],
    specsObj: {
      screen: "6.78\" FHD+ 120Hz HyperEngine Display",
      processor: "MediaTek Helio G91 / G99 Octa-Core",
      ram: "4 GB (+4GB RAM Dinámica = 8GB)",
      storage: "256 GB Almacenamiento UFS",
      cameras: "64 MP AI Dual Cámara + 16 MP Frontal con Flash",
      battery: "5,000 mAh | Carga rápida 33W FastCharge"
    },
    colors: ["Negro Ébano", "Azul Galaxia", "Dorado Solar"],
    description: "Edición de 256GB del Hot 70 para máxima capacidad de almacenamiento. Pantalla fluida a 120Hz y batería de 5,000 mAh con carga de 33W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-hot-70-pro-5g-256gb",
    nombre: "Infinix Hot 70 Pro 5G 256GB (6+6GB RAM)",
    name: "Infinix Hot 70 Pro 5G 256GB (6+6GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media-alta",
    precio: 1160,
    price: 1160,
    originalPrice: 1320,
    imagen: "assets/img/brands/Infinix/infinix-hot-70-pro-5g.webp",
    image: "assets/img/brands/Infinix/infinix-hot-70-pro-5g.webp",
    badge: "RED 5G ULTRA",
    badgeType: "new",
    registro: "R",
    stock: 10,
    rating: 4.9,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Infinix/infinix-hot-70-pro-5g.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Conectividad 5G Ultra", "6GB + 6GB RAM (12GB)", "Pantalla AMOLED 120Hz", "Cámara 108 MP OIS"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 120Hz 1300 nits",
      processor: "MediaTek Dimensity 7020 / 6300 5G (6nm)",
      ram: "6 GB LPDDR4X (+6GB RAM Virtual = 12GB)",
      storage: "256 GB UFS 2.2",
      cameras: "108 MP con OIS Estabilizado + Macro + 32 MP Frontal",
      battery: "5,000 mAh | Carga rápida 45W All-Round FastCharge"
    },
    colors: ["Negro Titanio 5G", "Azul Cibernético", "Plata Estelar"],
    description: "Conectividad 5G de máxima velocidad combinada con pantalla AMOLED a 120Hz, cámara de 108 MP con OIS y carga rápida de 45W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-note-50-pro-256gb",
    nombre: "Infinix Note 50 Pro 256GB (8+8GB RAM)",
    name: "Infinix Note 50 Pro 256GB (8+8GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media-alta",
    precio: 1040,
    price: 1040,
    originalPrice: 1190,
    imagen: "assets/img/brands/Infinix/infinix-note-50-pro.webp",
    image: "assets/img/brands/Infinix/infinix-note-50-pro.webp",
    badge: "CARGA 70W ULTRA",
    badgeType: "offer",
    registro: "R",
    stock: 12,
    rating: 4.9,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Infinix/infinix-note-50-pro.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Carga Ultra 70W", "8GB + 8GB RAM (16GB)", "Pantalla AMOLED 120Hz Curva", "Cámara 108 MP OIS"],
    specsObj: {
      screen: "6.78\" FHD+ 3D Curved AMOLED 120Hz 1300 nits",
      processor: "MediaTek Helio G99 Ultimate (6nm)",
      ram: "8 GB (+8GB RAM Virtual = 16GB)",
      storage: "256 GB UFS 2.2",
      cameras: "108 MP OIS con Super Zoom 3x sin pérdida + 32 MP Frontal",
      battery: "5,000 mAh | Carga ultra rápida 70W All-Round FastCharge 2.0"
    },
    colors: ["Negro Obsidiana", "Oro Vintage", "Verde Titán"],
    description: "Serie NOTE profesional con pantalla curva 3D AMOLED, cámara estabilizada OIS de 108 MP y revolucionaria carga ultrarrápida de 70W. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-note-60-pro-256gb-wireless",
    nombre: "Infinix Note 60 Pro 256GB (8+8GB RAM) + Cargador Inalámbrico",
    name: "Infinix Note 60 Pro 256GB (8+8GB RAM) + Cargador Inalámbrico",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media-alta",
    precio: 1470,
    price: 1470,
    originalPrice: 1680,
    imagen: "assets/img/brands/Infinix/infinix-note-60-pro.webp",
    image: "assets/img/brands/Infinix/infinix-note-60-pro.webp",
    badge: "CARGA INALÁMBRICA",
    badgeType: "new",
    registro: "R",
    stock: 9,
    rating: 4.9,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Infinix/infinix-note-60-pro.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Incluye Cargador Inalámbrico", "Pantalla AMOLED 144Hz", "Cámara 108 MP OIS", "Carga 70W + 20W Wireless"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 144Hz 3D Curva 1500 nits",
      processor: "MediaTek Helio G100 / Dimensity 7020 5G",
      ram: "8 GB LPDDR4X (+8GB RAM Virtual = 16GB)",
      storage: "256 GB UFS",
      cameras: "108 MP OIS Triple Cámara con AI Aura Light + 32 MP Frontal",
      battery: "5,000 mAh | Carga 70W Alámbrica + Carga Inalámbrica Magnética MagCharge"
    },
    colors: ["Negro Titán", "Dorado Champagne", "Verde Bosque"],
    description: "Pack completo con base de carga inalámbrica magnética MagCharge incluida. Pantalla AMOLED 3D Curva a 144Hz, cámara de 108 MP OIS y audio de alta fidelidad firmado por JBL. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-note-60-pro-pininfarina-256gb",
    nombre: "Infinix Note 60 Pro 256GB (8+8GB RAM) + Pack Pininfarina & Carga Inalámbrica",
    name: "Infinix Note 60 Pro 256GB (8+8GB RAM) + Pack Pininfarina & Carga Inalámbrica",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "alta",
    precio: 1560,
    price: 1560,
    originalPrice: 1790,
    imagen: "assets/img/brands/Infinix/infinix-note-60-pro.webp",
    image: "assets/img/brands/Infinix/infinix-note-60-pro.webp",
    badge: "PACK PININFARINA",
    badgeType: "new",
    registro: "R",
    stock: 8,
    rating: 5.0,
    reviewsCount: 52,
    gallery: [
      "assets/img/brands/Infinix/infinix-note-60-pro.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Edición Especial Pininfarina", "Incluye Cargador Inalámbrico", "Pantalla AMOLED 144Hz Curva", "Audio Sound by JBL"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 144Hz 3D Curva de Lujo Pininfarina",
      processor: "MediaTek Helio G100 / Dimensity 5G Octa-Core",
      ram: "8 GB (+8GB RAM Virtual = 16GB)",
      storage: "256 GB UFS",
      cameras: "108 MP OIS + Sensor Telemacro + 32 MP Selfie HDR",
      battery: "5,000 mAh | Carga 70W + Base Inalámbrica MagCharge + Pack Pininfarina"
    },
    colors: ["Pininfarina Racing Carbon", "Pininfarina Italian Silver"],
    description: "Edición exclusiva de coleccionista diseñada en colaboración con la prestigiosa casa automotriz italiana Pininfarina. Incluye pack especial de accesorios de lujo, cargador inalámbrico magnético y acabados deportivos premium. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-note-edge-256gb",
    nombre: "Infinix Note Edge 256GB (8+8GB RAM)",
    name: "Infinix Note Edge 256GB (8+8GB RAM)",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "media-alta",
    precio: 1270,
    price: 1270,
    originalPrice: 1450,
    imagen: "assets/img/brands/Infinix/infinix-note-edge.webp",
    image: "assets/img/brands/Infinix/infinix-note-edge.webp",
    badge: "PANTALLA EDGE 3D",
    badgeType: "new",
    registro: "R",
    stock: 10,
    rating: 4.9,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/Infinix/infinix-note-edge.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Pantalla Edge Curva Infinita", "8GB + 8GB RAM (16GB)", "Cámara 108 MP OIS", "Carga Rápida 45W"],
    specsObj: {
      screen: "6.78\" AMOLED Dual-Edge 120Hz sin bordes",
      processor: "MediaTek Helio G99 / Dimensity 6nm",
      ram: "8 GB LPDDR4X (+8GB RAM Virtual = 16GB)",
      storage: "256 GB UFS",
      cameras: "108 MP Ultra Cámara con Estabilización Óptica + 32 MP Frontal",
      battery: "5,000 mAh | Carga rápida 45W All-Round FastCharge"
    },
    colors: ["Negro Titanio Edge", "Azul Océano Curvo", "Verde Oliva"],
    description: "Diseño premium ultradelgado con pantalla Edge curvada en ambos costados para una inmersión visual sin precedentes. Cámara de 108 MP OIS y batería de 5,000 mAh. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "infinix-gt-50-pro-gamer-256gb",
    nombre: "Infinix GT 50 Pro 5G 256GB (12+12GB RAM) + Kit Gamer Oficial",
    name: "Infinix GT 50 Pro 5G 256GB (12+12GB RAM) + Kit Gamer Oficial",
    marca: "Infinix",
    brand: "Infinix",
    category: "infinix",
    range: "alta",
    precio: 1920,
    price: 1920,
    originalPrice: 2190,
    imagen: "assets/img/brands/Infinix/infinix-gt-50-pro.webp",
    image: "assets/img/brands/Infinix/infinix-gt-50-pro.webp",
    badge: "KIT GAMER INCLUIDO",
    badgeType: "offer",
    registro: "R",
    stock: 8,
    rating: 5.0,
    reviewsCount: 64,
    gallery: [
      "assets/img/brands/Infinix/infinix-gt-50-pro.webp",
      "assets/img/brands/Infinix/infinix-hero.webp",
      "assets/img/ui/banners/infinix banner.jpeg",
      "assets/img/brands/Infinix/infinix_logo_clean.png"
    ],
    specs: ["Incluye Kit Gamer Oficial", "12GB + 12GB RAM (24GB)", "Pantalla AMOLED 144Hz RGB", "Dimensity Gaming 5G"],
    specsObj: {
      screen: "6.78\" FHD+ AMOLED 144Hz Cyber Mecha con Luces LED RGB",
      processor: "MediaTek Dimensity 8200 / 8300 Ultra 5G + Chip Display Gaming Dedicado",
      ram: "12 GB LPDDR5X (+12GB RAM Dinámica = 24GB)",
      storage: "256 GB UFS 3.1 Ultrarrápido",
      cameras: "108 MP OIS Ultra Gaming + 2 MP Macro + 32 MP Frontal 4K 60fps",
      battery: "5,000 mAh | Carga rápida 45W / 68W Bypass Charging sin recalentamiento"
    },
    colors: ["Mecha Blue RGB", "Cyber Silver RGB", "Mecha Orange"],
    description: "La bestia gamer definitiva de Infinix. Diseño Cyber Mecha con iluminación LED interactiva personalizable, 24GB de RAM total, pantalla a 144Hz y kit gamer oficial incluido (gatillos, cooler o accesorios gamer). Se emite comprobante de venta para garantía.",
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

// Buscamos el cierre de la lista de productos: justo antes de `const accesorios = [`
const accesoriosMarker = 'const accesorios = [';
const idxAccesorios = content.indexOf(accesoriosMarker);

if (idxAccesorios === -1) {
  console.error('No se encontró el marcador de accesorios.');
  process.exit(1);
}

// Retrocedemos desde idxAccesorios para encontrar `];` que cierra `productos`
const idxClosingBracket = content.lastIndexOf('];', idxAccesorios);

if (idxClosingBracket === -1) {
  console.error('No se encontró el cierre de productos ];');
  process.exit(1);
}

const serializedInfinix = ',\n' + infinixProducts.map(serializeProduct).join(',\n');

let newContent = content.substring(0, idxClosingBracket) + serializedInfinix + '\n' + content.substring(idxClosingBracket);

// Bump CATALOG_VERSION
newContent = newContent.replace(
  /const CATALOG_VERSION = ".*?";/,
  'const CATALOG_VERSION = "2026-10-20-infinix-v1";'
);

fs.writeFileSync(productsFilePath, newContent, 'utf8');
console.log('¡Catálogo actualizado con éxito!');
console.log(`Se agregaron ${infinixProducts.length} productos Infinix.`);
