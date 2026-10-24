const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/products.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

const tecnoModels = [
  // 1. TECNO SPARK GO 3 64GB/4+4RAM S/400®️
  {
    id: "tecno-spark-go-3-64gb",
    nombre: "Tecno Spark Go 3 64GB (4GB+4GB RAM) Pantalla 120Hz Dinámica",
    name: "Tecno Spark Go 3 64GB (4GB+4GB RAM) Pantalla 120Hz Dinámica",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "economica",
    precio: 400,
    price: 400,
    originalPrice: 470,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 9,
    rating: 4.8,
    reviewsCount: 34,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Octa-Core T606", "64 GB", "Pantalla 120Hz Fluida", "Altavoces Duales DTS"],
    specsObj: {
      screen: "6.67\" HD+ 120Hz Ultra Fluida con Dynamic Port",
      processor: "Unisoc T606 Octa-Core de Gran Eficiencia",
      ram: "4 GB RAM (+4GB Fusión de Memoria = 8GB Total)",
      storage: "64 GB (Expandible con MicroSD hasta 1TB)",
      cameras: "Principal 13 MP AI con Doble Flash LED + Frontal 8 MP con Flash Frontal",
      battery: "5,000 mAh Batería de Larga Duración | Carga Type-C 15W"
    },
    colors: ["Negro Gravedad", "Blanco Glaciar", "Oro Mágico"],
    description: "Smartphone accesible de alta durabilidad con pantalla de 120Hz para máxima fluidez, Dynamic Port interactivo para notificaciones y batería de 5,000 mAh con registro oficial en lista blanca.",
    disponible: true
  },

  // 2. TECNO SPARK GO 3 128GB/4+4RAM S/460®️
  {
    id: "tecno-spark-go-3-128gb",
    nombre: "Tecno Spark Go 3 128GB (4GB+4GB RAM) 120Hz Dynamic Port",
    name: "Tecno Spark Go 3 128GB (4GB+4GB RAM) 120Hz Dynamic Port",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "economica",
    precio: 460,
    price: 460,
    originalPrice: 530,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 8,
    rating: 4.8,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Octa-Core T606", "128 GB", "Pantalla 120Hz Dinámica", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.67\" HD+ 120Hz Ultra Fluida con Dynamic Port",
      processor: "Unisoc T606 Octa-Core de Gran Eficiencia",
      ram: "4 GB RAM (+4GB Fusión de Memoria = 8GB Total)",
      storage: "128 GB (Gran Almacenamiento)",
      cameras: "Principal 13 MP AI con HDR + Frontal 8 MP con Flash Frontal",
      battery: "5,000 mAh Batería de Larga Duración | Carga Type-C 15W"
    },
    colors: ["Negro Gravedad", "Blanco Glaciar", "Verde Esmeralda"],
    description: "Doble capacidad de almacenamiento interno con 128GB, pantalla suave de 120Hz, altavoces duales estéreo con optimización DTS y Dynamic Port con garantía oficial.",
    disponible: true
  },

  // 3. TECNO SPARK 40C 256GB/8+8RAM S/520®️
  {
    id: "tecno-spark-40c-256gb",
    nombre: "Tecno Spark 40C 256GB (8GB+8GB RAM) Pantalla Solar 90Hz",
    name: "Tecno Spark 40C 256GB (8GB+8GB RAM) Pantalla Solar 90Hz",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "economica",
    precio: 520,
    price: 520,
    originalPrice: 610,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 7,
    rating: 4.9,
    reviewsCount: 41,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Helio G36 Octa-Core", "256 GB Masivo", "8GB (+8GB RAM = 16GB)", "Cámara 50MP HDR"],
    specsObj: {
      screen: "6.6\" 90Hz HD+ Sunlight Display con Dynamic Port",
      processor: "MediaTek Helio G36 Octa-Core",
      ram: "8 GB RAM (+8GB Fusión = 16GB RAM Total)",
      storage: "256 GB Almacenamiento Masivo",
      cameras: "Dual 50 MP AI Ultra Nítida + Lente Auxiliar + Frontal 8 MP Dual Flash",
      battery: "5,000 mAh | Carga Rápida 18W Type-C"
    },
    colors: ["Negro Alquimia", "Dorado Encanto", "Azul Mágico"],
    description: "256GB de almacenamiento masivo y 16GB de RAM total (8GB física + 8GB virtual) para almacenar miles de fotos y usar múltiples apps sin lentitud con registro asegurado.",
    disponible: true
  },

  // 4. TECNO SPARK 50 256GB/4+12RAM S/640®️
  {
    id: "tecno-spark-50-256gb",
    nombre: "Tecno Spark 50 256GB (4GB+12GB RAM) Pantalla 90Hz FHD+ 50MP",
    name: "Tecno Spark 50 256GB (4GB+12GB RAM) Pantalla 90Hz FHD+ 50MP",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "media",
    precio: 640,
    price: 640,
    originalPrice: 750,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 8,
    rating: 4.9,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Helio G85 Gaming", "256 GB", "4GB (+12GB Virtual = 16GB)", "50MP Ultra Clear"],
    specsObj: {
      screen: "6.78\" FHD+ 90Hz Pantalla Ultra Fluida (Punch-Hole)",
      processor: "MediaTek Helio G85 Gaming Processor (12nm)",
      ram: "4 GB RAM (+12GB Fusión Extendida = 16GB RAM Total)",
      storage: "256 GB Almacenamiento Rápido",
      cameras: "50 MP Ultra Clear AI Principal + Modo Súper Noche + Frontal 32 MP Glow Selfie con Dual Flash",
      battery: "5,000 mAh | Carga Rápida 18W Type-C"
    },
    colors: ["Negro Temporal", "Blanco Ciber", "Dorado Neón"],
    description: "Potenciado por el procesador gamer Helio G85 con 16GB de memoria RAM total, cámara frontal de 32 MP con doble flash para selfies impecables de noche y 256GB de memoria.",
    disponible: true
  },

  // 5. TECNO SPARK 40 PRO 256GB/8+8RAM S/860®️
  {
    id: "tecno-spark-40-pro-256gb",
    nombre: "Tecno Spark 40 Pro 256GB (8GB+8GB RAM) AMOLED 120Hz 108MP",
    name: "Tecno Spark 40 Pro 256GB (8GB+8GB RAM) AMOLED 120Hz 108MP",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "media",
    precio: 860,
    price: 860,
    originalPrice: 990,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 6,
    rating: 4.9,
    reviewsCount: 52,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Helio G99 Ultimate (6nm)", "256 GB", "AMOLED 120Hz Curva", "Cámara 108MP Ultra Sense"],
    specsObj: {
      screen: "6.78\" Curva AMOLED 120Hz FHD+ con Lector de Huella en Pantalla",
      processor: "MediaTek Helio G99 Ultimate (6nm) de Alto Rendimiento",
      ram: "8 GB RAM (+8GB Expansión Virtual = 16GB Total)",
      storage: "256 GB UFS 2.2",
      cameras: "Triple 108 MP Ultra Sense con Zoom 3x sin Pérdida + 2 MP Macro + Frontal 32 MP Dual Flash",
      battery: "5,000 mAh | Carga Rápida 33W (Super Charge)"
    },
    colors: ["Verde Selva Esmeralda", "Gris Titanio", "Oro Resplandor"],
    description: "Pantalla curva AMOLED cinematográfica de 120Hz con lector de huellas óptico integrado, sensor principal de 108 MP con zoom 3x sin pérdida y chip Helio G99 Ultimate de 6nm.",
    disponible: true
  },

  // 6. TECNO CURVE 2 5G 256GB/8+8RAM S/1110®️
  {
    id: "tecno-curve-2-5g-256gb",
    nombre: "Tecno Curve 2 5G 256GB (8GB+8GB RAM) Pantalla Curva AMOLED 120Hz 70W",
    name: "Tecno Curve 2 5G 256GB (8GB+8GB RAM) Pantalla Curva AMOLED 120Hz 70W",
    marca: "Tecno",
    brand: "Tecno",
    category: "tecno",
    range: "media",
    precio: 1110,
    price: 1110,
    originalPrice: 1290,
    imagen: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    image: "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 5,
    rating: 5.0,
    reviewsCount: 48,
    gallery: [
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp",
      "assets/img/brands/Tecno/Celular_tecno_para_inicio.webp"
    ],
    specs: ["Dimensity 7020 5G", "256 GB UFS", "Curva 3D AMOLED 120Hz", "Carga Flash 70W + 50MP OIS"],
    specsObj: {
      screen: "6.78\" 3D Curved AMOLED 120Hz (1.07B Colores, Corning Gorilla Glass 5)",
      processor: "MediaTek Dimensity 7020 5G Octa-Core (6nm)",
      ram: "8 GB RAM (+8GB Expansión = 16GB RAM Total)",
      storage: "256 GB Almacenamiento Ultrarrápido",
      cameras: "Triple 50 MP OIS Estabilización Óptica + 2 MP Profundidad + IA + Frontal 32 MP Dual Flash",
      battery: "5,000 mAh Batería de Larga Duración | Carga Ultra Flash 70W (50% en 16 min)"
    },
    colors: ["Azul Glaciar Espejo", "Negro Eclipse", "Verde Jade"],
    description: "La estrella de la serie Tecno con diseño curvo premium ultra delgado, conectividad 5G de alta velocidad, estabilización óptica de imagen OIS de 50 MP y carga ultra rápida de 70W.",
    disponible: true
  }
];

const accMarker = 'const accesorios = [';
const parts = fileContent.split(accMarker);
let part1 = parts[0];
let part2 = parts[1];

// Find last closing ]; in part1
const endProdsIdx = part1.lastIndexOf('];');
if (endProdsIdx !== -1) {
  const beforeEnd = part1.slice(0, endProdsIdx);
  const tecnoJson = JSON.stringify(tecnoModels, null, 2);
  const tecnoInner = tecnoJson.slice(tecnoJson.indexOf('[') + 1, tecnoJson.lastIndexOf(']')).trim();

  part1 = beforeEnd.trimEnd() + ',\n\n  /* ===================================================\n     SMARTPHONES OFICIALES TECNO MOBILE\n     =================================================== */\n' + tecnoInner + '\n];\n\n';
  console.log('Successfully injected 6 Tecno models into part1!');
} else {
  console.error('Could not find end of productos in part1');
}

// Bump catalog version in part2
part2 = part2.replace(/const CATALOG_VERSION = "[^"]+";/, 'const CATALOG_VERSION = "2026-10-21-tecno-v1";');

const finalContent = part1 + accMarker + part2;
fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log('Successfully saved data/products.js with Tecno models!');
