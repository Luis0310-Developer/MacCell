const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/products.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

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

// Replace OPPO block
const splitMarker = 'const accesorios = [';
const parts = fileContent.split(splitMarker);
let prodsPart = parts[0];

// Find where oppo-find-x7-ultra was
const lines = prodsPart.split('\n');
const oppoStartIdx = lines.findIndex(l => l.includes('"id": "oppo-find-x7-ultra"') || l.includes('id: "oppo-find-x7-ultra"'));

if (oppoStartIdx !== -1) {
  let realStart = oppoStartIdx;
  while (realStart > 0 && !lines[realStart].trim().startsWith('{')) {
    realStart--;
  }

  const beforeOppo = lines.slice(0, realStart).join('\n');
  const jsonStr = JSON.stringify(oppoModels, null, 2);
  const innerContent = jsonStr.slice(jsonStr.indexOf('[') + 1, jsonStr.lastIndexOf(']')).trim();

  const updatedProdsPart = beforeOppo.trimEnd() + '\n' + innerContent + '\n];\n\n';
  const finalFile = updatedProdsPart + splitMarker + parts[1];
  fs.writeFileSync(targetFile, finalFile, 'utf8');
  console.log('Successfully updated OPPO products with', oppoModels.length, 'models!');
} else {
  console.error('Could not find oppoStartIdx');
}
