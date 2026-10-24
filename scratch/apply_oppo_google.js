const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/products.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

// The 2 requested Google Pixel models
const googleModels = [
  // 1. GOOGLE PIXEL 11 PRO 256GB/12RAM S/4100 (Libre)
  {
    id: "google-pixel-11-pro",
    nombre: "Google Pixel 11 Pro 256GB (12GB RAM) Gemini Nano OLED 120Hz",
    name: "Google Pixel 11 Pro 256GB (12GB RAM) Gemini Nano OLED 120Hz",
    marca: "Google",
    brand: "Google",
    category: "google",
    range: "alta",
    precio: 4100,
    price: 4100,
    originalPrice: 4500,
    imagen: "assets/img/brands/Google/google pixel para inicio.jpeg",
    image: "assets/img/brands/Google/google pixel para inicio.jpeg",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 6,
    rating: 4.9,
    reviewsCount: 32,
    gallery: [
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg"
    ],
    specs: ["Tensor G5 AI", "256 GB", "Cámara Triple Pro 50MP", "Pantalla Actua OLED 120Hz"],
    specsObj: {
      screen: "6.3\" Super Actua OLED 120Hz LTPO (3,000 nits pico HDR)",
      processor: "Google Tensor G5 (3nm) + Coprocesador Titan M3",
      ram: "12 GB LPDDR5X Ultra Rápida",
      storage: "256 GB UFS 4.0",
      cameras: "Triple Pro: 50 MP Octa PD Principal + 48 MP Ultra Gran Angular Macro + 48 MP Teleobjetivo 5x óptico (30x Super Res) + Frontal 42 MP",
      battery: "4,700 mAh | Carga Rápida 30W + Inalámbrica Qi2 + Compartir Batería"
    },
    colors: ["Obsidian (Negro)", "Porcelain (Blanco)", "Hazel (Avellana)"],
    description: "El flagship compacto más avanzado de Google con Inteligencia Artificial Gemini Nano integrada directamente en el hardware, triple cámara profesional con teleobjetivo periscópico de 5x y pantalla Super Actua ultra brillante.",
    disponible: true
  },

  // 2. GOOGLE PIXEL 10 PRO XL FÍSICO 256GB/16RAM S/4200®️ (Registrado)
  {
    id: "google-pixel-10-pro-xl-fisico",
    nombre: "Google Pixel 10 Pro XL Físico 256GB (16GB RAM) Ranura SIM Nano-SIM + eSIM",
    name: "Google Pixel 10 Pro XL Físico 256GB (16GB RAM) Ranura SIM Nano-SIM + eSIM",
    marca: "Google",
    brand: "Google",
    category: "google",
    range: "alta",
    precio: 4200,
    price: 4200,
    originalPrice: 4700,
    imagen: "assets/img/brands/Google/google pixel para inicio.jpeg",
    image: "assets/img/brands/Google/google pixel para inicio.jpeg",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 5,
    rating: 5.0,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg",
      "assets/img/brands/Google/google pixel para inicio.jpeg"
    ],
    specs: ["Tensor G5 3nm", "256 GB", "SIM Físico + eSIM", "Pantalla 6.8\" Super Actua 120Hz"],
    specsObj: {
      screen: "6.8\" Super Actua OLED LTPO 1-120Hz (3,000 nits pico HDR)",
      processor: "Google Tensor G5 con Motor de IA TPU de Nueva Generación",
      ram: "16 GB LPDDR5X para Tareas Pesadas y Multitarea IA",
      storage: "256 GB UFS 4.0",
      cameras: "Pro Triple Studio: 50 MP Principal OIS + 48 MP Ultra Gran Angular Macro + 48 MP Teleobjetivo Periscópico 5x OIS (Super Res Zoom hasta 30x) + Frontal 42 MP Ultra Gran Angular",
      battery: "5,060 mAh | Carga Rápida 37W + Inalámbrica Rápida"
    },
    colors: ["Obsidian (Negro)", "Porcelain (Blanco)", "Rose Quartz (Rosa)", "Hazel (Avellana)"],
    description: "Versión exclusiva con bandeja SIM física (Nano-SIM) + soporte eSIM para máxima compatibilidad con todos los operadores del Perú, 16GB de memoria RAM física, pantalla cinematográfica de 6.8 pulgadas y registro garantizado en lista blanca oficial.",
    disponible: true
  }
];

// The 6 requested OPPO models + Find X7 Ultra flagship
const oppoModels = [
  // 1. OPPO A6T 128GB/4RAM S/520®️
  {
    id: "oppo-a6t-128gb",
    nombre: "OPPO A6T 128GB (4GB RAM) Resistente IP54 90Hz",
    name: "OPPO A6T 128GB (4GB RAM) Resistente IP54 90Hz",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "economica",
    precio: 520,
    price: 520,
    originalPrice: 590,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 9,
    rating: 4.8,
    reviewsCount: 36,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Snapdragon Octa-Core", "128 GB", "Pantalla 90Hz Ultra Brillante", "45W SUPERVOOC"],
    specsObj: {
      screen: "6.67\" HD+ 90Hz Ultra Brillante (950 nits bajo el sol)",
      processor: "Qualcomm Snapdragon Octa-Core (6nm)",
      ram: "4 GB RAM (+4GB Expansión Virtual = 8GB)",
      storage: "128 GB (Expandible con MicroSD)",
      cameras: "Dual 50 MP AI Ultra Nítida + Sensor de Profundidad + Frontal 8 MP",
      battery: "5,000 mAh | Carga Rápida 45W SUPERVOOC (50% en 30 min)"
    },
    colors: ["Azul Océano", "Negro Medianoche"],
    description: "Diseño ultradelgado y resistente con certificación militar contra caídas y salpicaduras IP54, pantalla ultra brillante de 950 nits y carga flash 45W SUPERVOOC.",
    disponible: true
  },

  // 2. OPPO A6C 128GB/4RAM S/590®️
  {
    id: "oppo-a6c-128gb",
    nombre: "OPPO A6C 128GB (4GB RAM) Pantalla Solar 90Hz",
    name: "OPPO A6C 128GB (4GB RAM) Pantalla Solar 90Hz",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "economica",
    precio: 590,
    price: 590,
    originalPrice: 670,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 8,
    rating: 4.8,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Octa-Core Eficiente", "128 GB", "Batería 5,100 mAh", "Cámara 50MP AI"],
    specsObj: {
      screen: "6.67\" 90Hz Sunlight Display con Modo Exterior",
      processor: "MediaTek Octa-Core de Alta Eficiencia",
      ram: "4 GB RAM (+4GB Virtual)",
      storage: "128 GB",
      cameras: "Cámara Principal 50 MP AI + Lente Retrato + Frontal 8 MP HDR",
      battery: "5,100 mAh Batería de 4 Años de Salud Garantizada | Carga 45W"
    },
    colors: ["Verde Aurora", "Negro Brillante"],
    description: "Excelente autonomía con batería de larga duración de 5,100 mAh, pantalla solar ultra legible de 90Hz y protección contra salpicaduras Splash Touch.",
    disponible: true
  },

  // 3. OPPO A6X 256GB/4RAM S/840®️
  {
    id: "oppo-a6x-256gb",
    nombre: "OPPO A6X 256GB (4GB RAM) 256GB Almacenamiento 90Hz",
    name: "OPPO A6X 256GB (4GB RAM) 256GB Almacenamiento 90Hz",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "economica",
    precio: 840,
    price: 840,
    originalPrice: 950,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 7,
    rating: 4.9,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Octa-Core 6nm", "256 GB", "Altavoces 300% Ultra Volumen", "Resistencia Militar Grado Caídas"],
    specsObj: {
      screen: "6.67\" 90Hz HD+ Ultra Suave (1,000 nits pico)",
      processor: "Qualcomm Snapdragon Octa-Core (6nm)",
      ram: "4 GB RAM (+4GB Expansión Dinámica)",
      storage: "256 GB Almacenamiento Masivo",
      cameras: "Dual 50 MP Ultra Nítida + Lente Bokeh + Frontal 8 MP",
      battery: "5,000 mAh | 45W SUPERVOOC"
    },
    colors: ["Rojo Crepúsculo", "Azul Océano", "Negro Medianoche"],
    description: "Gran capacidad de almacenamiento de 256GB para fotos y videos sin límites, sistema de sonido estéreo con 300% de Ultra Volumen y durabilidad militar certificada.",
    disponible: true
  },

  // 4. OPPO A5 5G 256GB/8RAM S/990®️
  {
    id: "oppo-a5-5g-256gb",
    nombre: "OPPO A5 5G 256GB (8GB RAM) Red 5G Ultra Rápida",
    name: "OPPO A5 5G 256GB (8GB RAM) Red 5G Ultra Rápida",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 990,
    price: 990,
    originalPrice: 1150,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 6,
    rating: 4.9,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 6020 5G", "256 GB", "8GB (+8GB Virtual)", "Altavoces Estéreo Duales"],
    specsObj: {
      screen: "6.72\" FHD+ 90Hz Sunlight Display (680 nits)",
      processor: "MediaTek Dimensity 6020 5G (7nm)",
      ram: "8 GB RAM (+8GB Expansión = 16GB Total)",
      storage: "256 GB Almacenamiento Rápido",
      cameras: "Dual 50 MP AI Cámara Principal + 2 MP Retrato + Frontal 8 MP",
      battery: "5,000 mAh | Carga Rápida 33W SUPERVOOC"
    },
    colors: ["Púrpura Pluma", "Negro Misterio"],
    description: "Conectividad 5G ultrarrápida combinada con 8GB de RAM física (ampliables a 16GB), 256GB de memoria, pantalla FHD+ brillante y altavoces estéreo envolventes con 300% de volumen.",
    disponible: true
  },

  // 5. OPPO RENO 11 5G 256GB/12RAM S/1099®️
  {
    id: "oppo-reno-11-5g-256gb",
    nombre: "OPPO Reno 11 5G 256GB (12GB RAM) Experto en Retratos Pantalla Curva OLED 120Hz",
    name: "OPPO Reno 11 5G 256GB (12GB RAM) Experto en Retratos Pantalla Curva OLED 120Hz",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1099,
    price: 1099,
    originalPrice: 1299,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 7,
    rating: 4.9,
    reviewsCount: 56,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7050 5G", "256 GB", "Sony 50MP OIS + Tele 32MP", "Curva OLED 120Hz 67W"],
    specsObj: {
      screen: "6.7\" 3D Curved OLED 120Hz (1.07B Colores, HDR10+)",
      processor: "MediaTek Dimensity 7050 5G (6nm)",
      ram: "12 GB RAM (+12GB Virtual = 24GB Total)",
      storage: "256 GB UFS 2.2",
      cameras: "Triple: 50 MP Sony OIS Principal + 32 MP Teleobjetivo Retrato Sony IMX709 (Zoom 2x) + 8 MP Ultra Gran Angular + Frontal 32 MP Sony",
      battery: "5,000 mAh | 67W SUPERVOOC (50% en 19 min)"
    },
    colors: ["Verde Ola de Mar", "Gris Titanio Roca"],
    description: "El auténtico experto en fotografía de retratos con sensor Sony OIS de 50 MP y teleobjetivo exclusivo de 32 MP, pantalla curva OLED cinematográfica de 120Hz y carga flash de 67W.",
    disponible: true
  },

  // 6. OPPO A6 PRO 256GB/8RAM S/1300®️
  {
    id: "oppo-a6-pro-256gb",
    nombre: "OPPO A6 Pro 5G 256GB (8GB RAM) Grado Militar 67W SUPERVOOC",
    name: "OPPO A6 Pro 5G 256GB (8GB RAM) Grado Militar 67W SUPERVOOC",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1300,
    price: 1300,
    originalPrice: 1480,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 5,
    rating: 4.9,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7050 5G", "256 GB", "OLED 120Hz Splash Touch", "67W SUPERVOOC"],
    specsObj: {
      screen: "6.7\" OLED 120Hz Ultra Fluida con Splash Touch",
      processor: "MediaTek Dimensity 7050 5G Octa-Core",
      ram: "8 GB RAM (+8GB Virtual = 16GB Total)",
      storage: "256 GB UFS",
      cameras: "Dual 64 MP Ultra Nítida OIS + 2 MP Retrato + Frontal 32 MP",
      battery: "5,000 mAh Batería Ultra Resistente | 67W SUPERVOOC"
    },
    colors: ["Azul Estelar", "Negro Medianoche"],
    description: "Gama media profesional con pantalla OLED de 120Hz, cámara de 64 MP con estabilización óptica, resistencia certificada de grado militar y carga flash de 67W.",
    disponible: true
  },

  // 7. OPPO FIND X7 ULTRA 5G (Flagship showcase)
  {
    id: "oppo-find-x7-ultra",
    nombre: "OPPO Find X7 Ultra 5G 512GB Hasselblad Cuero Negro",
    name: "OPPO Find X7 Ultra 5G 512GB Hasselblad Cuero Negro",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "alta",
    precio: 3899,
    price: 3899,
    originalPrice: 4299,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 4,
    rating: 5.0,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Snapdragon 8 Gen 3", "512 GB UFS 4.0", "Quad Cámara Hasselblad Sony LYT-900 1\"", "LTPO OLED 4,500 Nits 120Hz"],
    specsObj: {
      screen: "6.82\" QHD+ LTPO OLED 120Hz Curva (4,500 nits pico)",
      processor: "Qualcomm Snapdragon 8 Gen 3 (4nm)",
      ram: "16 GB LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "Cuádruple 50MP Hasselblad: Principal 50MP Sony LYT-900 1\" OIS + Periscopio 50MP 3x OIS + Periscopio 50MP 6x OIS + Ultra Gran Angular 50MP",
      battery: "5,000 mAh | 100W SUPERVOOC + 50W Inalámbrica"
    },
    colors: ["Tailored Black (Cuero)", "Ocean Blue"],
    description: "La cumbre de la fotografía móvil: primer smartphone del mundo con doble sensor periscopio y sensor Sony de 1 pulgada calibrado por Hasselblad.",
    disponible: true
  }
];

const accMarker = 'const accesorios = [';
const parts = fileContent.split(accMarker);
let part1 = parts[0];
let part2 = parts[1];

// 1. Clean accidental OPPO duplicate in part2
const mStart = part2.indexOf('const merged = [...parsedProds');
const mEnd = part2.indexOf('productos.forEach(baseP => {');
if (mStart !== -1 && mEnd !== -1) {
  part2 = part2.slice(0, mStart) + 'const merged = [...parsedProds];\n\n          ' + part2.slice(mEnd);
  console.log('Cleaned accidental block in part2!');
}

// Bump catalog version in part2
part2 = part2.replace(/const CATALOG_VERSION = "[^"]+";/, 'const CATALOG_VERSION = "2026-10-21-oppo-google-realme-v2";');

// 2. Prepend Google models to the Google section in part1
// We know Google starts at google-pixel-9-pro-xl
const gIdx = part1.indexOf('id": "google-pixel-9-pro-xl"');
if (gIdx !== -1) {
  let gObjStart = gIdx;
  while (gObjStart > 0 && part1[gObjStart] !== '{') {
    gObjStart--;
  }
  const beforeGoogle = part1.slice(0, gObjStart);
  const afterGoogle = part1.slice(gObjStart);

  const googleJson = JSON.stringify(googleModels, null, 2);
  const googleInner = googleJson.slice(googleJson.indexOf('[') + 1, googleJson.lastIndexOf(']')).trim();

  part1 = beforeGoogle + googleInner + ',\n  ' + afterGoogle;
  console.log('Injected Google models into part1!');
} else {
  console.error('Could not find Google start index');
}

// 3. Replace the existing OPPO models in part1 with oppoModels
// Find where OPPO starts: oppo-find-x7-ultra
const oIdx = part1.indexOf('id": "oppo-find-x7-ultra"');
if (oIdx !== -1) {
  let oObjStart = oIdx;
  while (oObjStart > 0 && part1[oObjStart] !== '{') {
    oObjStart--;
  }
  const beforeOppo = part1.slice(0, oObjStart);
  const oppoJson = JSON.stringify(oppoModels, null, 2);
  const oppoInner = oppoJson.slice(oppoJson.indexOf('[') + 1, oppoJson.lastIndexOf(']')).trim();

  // Everything after oObjStart up to ];
  part1 = beforeOppo.trimEnd() + '\n' + oppoInner + '\n];\n\n';
  console.log('Injected OPPO models into part1!');
} else {
  console.error('Could not find OPPO start index');
}

const finalContent = part1 + accMarker + part2;
fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log('Successfully written updated data/products.js!');
