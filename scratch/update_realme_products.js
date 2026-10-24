const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/products.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

const realmeModels = [
  // 1. REALME NOTE 50 64GB/3RAM S/330®️
  {
    id: "realme-note-50-64gb",
    nombre: "Realme Note 50 64GB (3GB RAM) Midnight Black 90Hz",
    name: "Realme Note 50 64GB (3GB RAM) Midnight Black 90Hz",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "economica",
    precio: 330,
    price: 330,
    originalPrice: 380,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 9,
    rating: 4.8,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Unisoc T612", "64 GB", "Pantalla 6.74\" 90Hz", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.74\" HD+ 90Hz Ultra Suave (560 nits)",
      processor: "Unisoc T612 Octa-Core (12nm)",
      ram: "3 GB RAM (+3GB Dinámica Virtual)",
      storage: "64 GB (Expandible hasta 2TB con MicroSD)",
      cameras: "Cámara Principal 13 MP AI + Lente B/N + Frontal 5 MP",
      battery: "5,000 mAh Batería de Larga Duración | Carga 10W"
    },
    colors: ["Midnight Black (Negro)", "Sky Blue (Azul)"],
    description: "Equipo ultradelgado de 7.99 mm con pantalla fluida de 90Hz, protección contra polvo y salpicaduras IP54, batería de 5,000 mAh y registro oficial en lista blanca garantizado.",
    disponible: true
  },

  // 2. REALME C53 128GB/6RAM S/520
  {
    id: "realme-c53-128gb",
    nombre: "Realme C53 128GB (6GB RAM) Champion Gold Mini Cápsula",
    name: "Realme C53 128GB (6GB RAM) Champion Gold Mini Cápsula",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "economica",
    precio: 520,
    price: 520,
    originalPrice: 590,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 8,
    rating: 4.8,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Unisoc T612", "128 GB", "50 MP Cámara AI", "33W SuperVOOC"],
    specsObj: {
      screen: "6.74\" FHD+ 90Hz con Mini Cápsula dinámica",
      processor: "Unisoc T612 Octa-Core (12nm)",
      ram: "6 GB RAM (+6GB Virtual = 12GB Total)",
      storage: "128 GB (Slot triple para 2 SIM + MicroSD)",
      cameras: "Dual 50 MP Ultra Clear AI + Sensor de Profundidad + Frontal 8 MP",
      battery: "5,000 mAh | Carga Rápida 33W SuperVOOC (50% en 31 min)"
    },
    colors: ["Champion Gold (Dorado)", "Mighty Black (Negro)"],
    description: "Diseño ultradelgado de 7.49 mm con carga rápida de 33W SuperVOOC, 6GB de RAM ampliables y cámara de alta resolución de 50 MP.",
    disponible: true
  },

  // 3. REALME C75 128GB/6RAM S/750
  {
    id: "realme-c75-128gb",
    nombre: "Realme C75 128GB (6GB RAM) ArmorShell Batería 6000mAh",
    name: "Realme C75 128GB (6GB RAM) ArmorShell Batería 6000mAh",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "economica",
    precio: 750,
    price: 750,
    originalPrice: 840,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 7,
    rating: 4.9,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Helio G92 Max", "128 GB", "Batería 6,000 mAh 45W", "Resistencia IP69 ArmorShell"],
    specsObj: {
      screen: "6.72\" FHD+ 90Hz Sunlight Display (690 nits)",
      processor: "MediaTek Helio G92 Max Octa-Core",
      ram: "6 GB RAM (+6GB Expansión Dinámica)",
      storage: "128 GB (Expandible hasta 2TB)",
      cameras: "Cámara Principal 50 MP Ultra Clear AI + Lente Bokeh + Frontal 8 MP",
      battery: "6,000 mAh Gigante | Carga Rápida 45W SuperVOOC"
    },
    colors: ["Lightning Gold (Oro)", "Black Storm (Negro)"],
    description: "El smartphone más resistente de la serie C con certificación ArmorShell grado militar IP69 contra caídas y agua caliente, batería bestial de 6,000 mAh y carga de 45W.",
    disponible: true
  },

  // 4. REALME 16 PRO 512GB/12RAM S/1560
  {
    id: "realme-16-pro-512gb",
    nombre: "Realme 16 Pro 5G 512GB (12GB RAM) Pantalla Curva OLED 120Hz",
    name: "Realme 16 Pro 5G 512GB (12GB RAM) Pantalla Curva OLED 120Hz",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "media",
    precio: 1560,
    price: 1560,
    originalPrice: 1750,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 6,
    rating: 4.9,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Dimensity 7050 5G", "512 GB", "Cámara 200MP OIS", "Curva OLED 120Hz 67W"],
    specsObj: {
      screen: "6.7\" Curved Vision OLED 120Hz FHD+ (1.07B Colores, 2160Hz PWM)",
      processor: "MediaTek Dimensity 7050 5G Octa-Core (6nm)",
      ram: "12 GB RAM (+12GB Virtual = 24GB Total)",
      storage: "512 GB UFS 3.1",
      cameras: "Principal 200 MP OIS SuperZoom + 8 MP Ultra Gran Angular + 2 MP Macro + Frontal 32 MP Sony",
      battery: "5,000 mAh | Carga Flash 67W SuperVOOC (50% en 18 min)"
    },
    colors: ["Sunrise Beige (Cuero Vegano)", "Oasis Green (Verde)", "Astral Black"],
    description: "Gama media premium con pantalla curva insignia de 120Hz, cámara de 200 MP con estabilización óptica OIS, 512GB de almacenamiento masivo y acabado en cuero vegano de lujo.",
    disponible: true
  },

  // 5. REALME 16 PRO PLUS 512GB/12RAM S/2050
  {
    id: "realme-16-pro-plus-512gb-libre",
    nombre: "Realme 16 Pro Plus 5G 512GB (12GB RAM) Lente Periscopio 64MP OIS Libre",
    name: "Realme 16 Pro Plus 5G 512GB (12GB RAM) Lente Periscopio 64MP OIS Libre",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "media",
    precio: 2050,
    price: 2050,
    originalPrice: 2290,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 5,
    rating: 4.9,
    reviewsCount: 47,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Snapdragon 7s Gen 2", "512 GB", "Periscopio 64MP 120x Zoom", "OLED Curva 120Hz 67W"],
    specsObj: {
      screen: "6.7\" Curved OLED 120Hz Pro-XDR (2160Hz PWM Dimming)",
      processor: "Qualcomm Snapdragon 7s Gen 2 (4nm)",
      ram: "12 GB RAM (+12GB Dinámica Virtual)",
      storage: "512 GB Almacenamiento Rápido",
      cameras: "Triple: 64 MP Periscopio OIS (Zoom 120x) + 50 MP Sony IMX890 OIS Principal + 8 MP Ultra Gran Angular + Frontal 32 MP Sony",
      battery: "5,000 mAh | Carga Rápida 67W SuperVOOC"
    },
    colors: ["Submarine Blue (Azul Cuero)", "Navigator Beige", "Dark Obsidian"],
    description: "Fotografía profesional con sensor Sony IMX890 OIS y teleobjetivo periscopio de 64 MP único en su segmento, diseño inspirado en relojes suizos de lujo y pantalla curva OLED Pro-XDR.",
    disponible: true
  },

  // 6. REALME 16 PRO PLUS b512GB/12RAM S/2270®️
  {
    id: "realme-16-pro-plus-512gb-registrado",
    nombre: "Realme 16 Pro Plus 5G 512GB (12GB RAM) Lente Periscopio Registrado",
    name: "Realme 16 Pro Plus 5G 512GB (12GB RAM) Lente Periscopio Registrado",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "media",
    precio: 2270,
    price: 2270,
    originalPrice: 2490,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 6,
    rating: 4.9,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Snapdragon 7s Gen 2", "512 GB", "Periscopio 64MP OIS", "Registrado Lista Blanca"],
    specsObj: {
      screen: "6.7\" Curved OLED 120Hz Pro-XDR (2160Hz PWM Dimming)",
      processor: "Qualcomm Snapdragon 7s Gen 2 (4nm)",
      ram: "12 GB RAM (+12GB Dinámica Virtual)",
      storage: "512 GB Almacenamiento Rápido",
      cameras: "Triple: 64 MP Periscopio OIS (Zoom 120x) + 50 MP Sony IMX890 OIS + 8 MP Gran Angular + Frontal 32 MP Sony",
      battery: "5,000 mAh | Carga Rápida 67W SuperVOOC"
    },
    colors: ["Submarine Blue (Azul Cuero)", "Navigator Beige", "Dark Obsidian"],
    description: "Versión oficial registrada en lista blanca de operadores peruanos. Máxima potencia con cámara periscópica de 64MP, 512GB de memoria y pantalla curva cinematográfica.",
    disponible: true
  },

  // 7. REALME GT 6 5G 512GB (16GB RAM)
  {
    id: "realme-gt-6",
    nombre: "Realme GT 6 5G 512GB (16GB RAM) Fluid Silver 6000 Nits",
    name: "Realme GT 6 5G 512GB (16GB RAM) Fluid Silver 6000 Nits",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "alta",
    precio: 2499,
    price: 2499,
    originalPrice: 2799,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 7,
    rating: 4.9,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Snapdragon 8s Gen 3", "512 GB UFS 4.0", "Cámara 50MP Sony LYT-808 OIS + Tele 50MP", "AMOLED 6,000 Nits 120Hz"],
    specsObj: {
      screen: "6.78\" 8T LTPO AMOLED 120Hz (6,000 nits récord mundial)",
      processor: "Qualcomm Snapdragon 8s Gen 3 (4nm)",
      ram: "16 GB RAM (+12GB Virtual)",
      storage: "512 GB UFS 4.0",
      cameras: "Triple 50 MP Sony LYT-808 OIS + 50 MP Teleobjetivo 2x Samsung + 8 MP Ultra Gran Angular",
      battery: "5,500 mAh | 120W SuperVOOC (50% en 10 min)"
    },
    colors: ["Fluid Silver", "Razor Green"],
    description: "El 'Flagship Killer' definitivo con la pantalla más brillante del planeta (6,000 nits), chip Snapdragon 8s Gen 3, batería masiva de 5,500 mAh y carga bestial de 120W.",
    disponible: true
  },

  // 8. REALME GT 6T 5G 256GB (12GB RAM)
  {
    id: "realme-gt-6t",
    nombre: "Realme GT 6T 5G 256GB (12GB RAM) Fluid Silver 120W",
    name: "Realme GT 6T 5G 256GB (12GB RAM) Fluid Silver 120W",
    marca: "Realme",
    brand: "Realme",
    category: "realme",
    range: "media",
    precio: 1999,
    price: 1999,
    originalPrice: 2249,
    imagen: "assets/img/brands/Realme/Celular realme para inicio.webp",
    image: "assets/img/brands/Realme/Celular realme para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 6,
    rating: 4.8,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp",
      "assets/img/brands/Realme/Celular realme para inicio.webp"
    ],
    specs: ["Snapdragon 7+ Gen 3", "256 GB UFS 4.0", "50MP Sony OIS", "Pantalla 6,000 Nits 120W"],
    specsObj: {
      screen: "6.78\" 8T LTPO AMOLED 120Hz (6,000 nits)",
      processor: "Qualcomm Snapdragon 7+ Gen 3 (4nm)",
      ram: "12 GB RAM (+12GB Virtual)",
      storage: "256 GB UFS 4.0",
      cameras: "Dual 50 MP Sony LYT-600 OIS + 8 MP Ultra Gran Angular + Frontal 32 MP",
      battery: "5,500 mAh | 120W SuperVOOC"
    },
    colors: ["Fluid Silver", "Razor Green"],
    description: "Rendimiento tope de gama con chip Snapdragon 7+ Gen 3, pantalla LTPO de 6,000 nits y batería de 5,500 mAh con 120W.",
    disponible: true
  }
];

// Find Realme block
const lines = fileContent.split('\n');
const startIdx = lines.findIndex(l => l.includes('"id": "realme-gt-6"') || l.includes('id: "realme-gt-6"'));
const endIdx = lines.findIndex((l, idx) => idx > startIdx && (l.includes('"id": "oppo-find-x7-ultra"') || l.includes('id: "oppo-find-x7-ultra"')));

if (startIdx !== -1 && endIdx !== -1) {
  // Backtrack startIdx to the line before '{' that opened realme-gt-6
  let realStart = startIdx;
  while (realStart > 0 && !lines[realStart].trim().startsWith('{')) {
    realStart--;
  }
  
  // Backtrack endIdx to the line that opened oppo-find-x7-ultra
  let realEnd = endIdx;
  while (realEnd > 0 && !lines[realEnd].trim().startsWith('{')) {
    realEnd--;
  }

  const before = lines.slice(0, realStart).join('\n');
  const after = lines.slice(realEnd).join('\n');

  const jsonStr = JSON.stringify(realmeModels, null, 2);
  const innerContent = jsonStr.slice(jsonStr.indexOf('[') + 1, jsonStr.lastIndexOf(']')).trim();

  const newContent = before + '\n' + innerContent + ',\n  ' + after;
  fs.writeFileSync(targetFile, newContent, 'utf8');
  console.log('Successfully updated Realme products with', realmeModels.length, 'models!');
} else {
  console.error('Could not find start or end index:', { startIdx, endIdx });
}
