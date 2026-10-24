const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/products.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

const oppoProducts = [
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
    stock: 5,
    rating: 4.9,
    reviewsCount: 36,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Snapdragon 8 Gen 3", "512 GB UFS 4.0", "Quad 50MP Hasselblad Dual Periscopio", "AMOLED 120Hz 2K"],
    specsObj: {
      screen: "6.82\" LTPO AMOLED 120Hz QHD+ (4,500 nits)",
      processor: "Qualcomm Snapdragon 8 Gen 3 (4nm)",
      ram: "16 GB RAM LPDDR5X",
      storage: "512 GB UFS 4.0",
      cameras: "Cuádruple 50 MP (Sony 1\" OIS) + 50 MP Tele 3x + 50 MP Periscopio 6x + 50 MP Ultra Gran Angular Hasselblad",
      battery: "5,000 mAh | Carga rápida 100W SuperVOOC + 50W Inalámbrica"
    },
    colors: ["Negro Cuero Vegano", "Marrón Arena", "Azul Océano"],
    description: "El buque insignia definitivo de OPPO con el primer sistema mundial de doble cámara periscópica, sensor Sony de 1 pulgada y calibración de color profesional Hasselblad.",
    disponible: true
  },
  {
    id: "oppo-find-x7",
    nombre: "OPPO Find X7 5G 256GB Triple Cámara 50MP Hasselblad",
    name: "OPPO Find X7 5G 256GB Triple Cámara 50MP Hasselblad",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "alta",
    precio: 2999,
    price: 2999,
    originalPrice: 3299,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 6,
    rating: 4.9,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 9300", "256 GB UFS 4.0", "Triple 50MP Hasselblad", "OLED 120Hz 1.5K"],
    specsObj: {
      screen: "6.78\" AMOLED 120Hz 1.5K (4,500 nits)",
      processor: "MediaTek Dimensity 9300 (4nm)",
      ram: "12 GB RAM LPDDR5X",
      storage: "256 GB UFS 4.0",
      cameras: "Triple 50 MP OIS + 64 MP Periscopio 3x + 50 MP Ultra Gran Angular",
      battery: "5,000 mAh | Carga rápida 100W SuperVOOC"
    },
    colors: ["Negro Estelar", "Plata Lunar", "Púrpura"],
    description: "Potencia flagship sin compromisos con Dimensity 9300, cámara de retrato Hasselblad y carga ultrarrápida de 100W.",
    disponible: true
  },
  {
    id: "oppo-reno-12-pro",
    nombre: "OPPO Reno 12 Pro 5G 512GB (12GB RAM) Nebula Silver AI",
    name: "OPPO Reno 12 Pro 5G 512GB (12GB RAM) Nebula Silver AI",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 2199,
    price: 2199,
    originalPrice: 2499,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 8,
    rating: 4.8,
    reviewsCount: 41,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7300-Energy", "512 GB", "Cámara 50MP Sony LYT-600 + Tele 50MP", "Curva OLED 120Hz"],
    specsObj: {
      screen: "6.7\" Quad-Curved AMOLED 120Hz FHD+",
      processor: "MediaTek Dimensity 7300-Energy (4nm)",
      ram: "12 GB RAM (+12GB Virtual)",
      storage: "512 GB",
      cameras: "Triple 50 MP OIS + 50 MP Teleobjetivo Retrato 2x + 8 MP Ultra Gran Angular",
      battery: "5,000 mAh | 80W SuperVOOC"
    },
    colors: ["Nebula Silver", "Space Brown"],
    description: "Diseño futurista de aleación resistente a caídas 'All-Round Armor', pantalla curva cuádruple y suite de Inteligencia Artificial para edición.",
    disponible: true
  },
  {
    id: "oppo-reno-12",
    nombre: "OPPO Reno 12 5G 256GB (12GB RAM) Gris Titanio",
    name: "OPPO Reno 12 5G 256GB (12GB RAM) Gris Titanio",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1799,
    price: 1799,
    originalPrice: 1999,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 9,
    rating: 4.8,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7300", "256 GB", "Cámara 50MP OIS", "Pantalla 120Hz OLED"],
    specsObj: {
      screen: "6.7\" AMOLED 120Hz FHD+",
      processor: "MediaTek Dimensity 7300-Energy (4nm)",
      ram: "12 GB RAM",
      storage: "256 GB",
      cameras: "Triple 50 MP OIS + 8 MP Ultra Gran Angular + 2 MP Macro",
      battery: "5,000 mAh | 80W SuperVOOC"
    },
    colors: ["Gris Titanio", "Rosa Atardecer"],
    description: "Chasis de alta resistencia contra caídas e impactos, sensor principal Sony de 50 MP y carga 80W SuperVOOC de larga duración.",
    disponible: true
  },
  {
    id: "oppo-reno-11-pro",
    nombre: "OPPO Reno 11 Pro 5G 512GB (12GB RAM) Blanco Perla",
    name: "OPPO Reno 11 Pro 5G 512GB (12GB RAM) Blanco Perla",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1899,
    price: 1899,
    originalPrice: 2199,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 7,
    rating: 4.8,
    reviewsCount: 27,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 8200", "512 GB", "Cámara Retrato Sony 32MP", "Curva 120Hz"],
    specsObj: {
      screen: "6.7\" OLED Curvo 120Hz HDR10+",
      processor: "MediaTek Dimensity 8200 (4nm)",
      ram: "12 GB RAM",
      storage: "512 GB",
      cameras: "Triple 50 MP OIS + 32 MP Retrato 2x + 8 MP Ultra Gran Angular",
      battery: "4,600 mAh | 80W SuperVOOC"
    },
    colors: ["Blanco Perla", "Gris Roca"],
    description: "Especialista en retratos con lente Sony de 32 MP para efecto bokeh profesional y diseño ultradelgado de textura perlada.",
    disponible: true
  },
  {
    id: "oppo-reno-11",
    nombre: "OPPO Reno 11 5G 256GB (8GB RAM) Verde Onda",
    name: "OPPO Reno 11 5G 256GB (8GB RAM) Verde Onda",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1499,
    price: 1499,
    originalPrice: 1699,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 10,
    rating: 4.7,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7050", "256 GB", "Cámara 50MP Sony OIS", "Carga 67W SuperVOOC"],
    specsObj: {
      screen: "6.7\" AMOLED Curvo 120Hz",
      processor: "MediaTek Dimensity 7050 5G",
      ram: "8 GB RAM (+8GB Virtual)",
      storage: "256 GB",
      cameras: "Triple 50 MP OIS + 32 MP Telefoto Retrato 2x + 8 MP Ultra Gran Angular",
      battery: "5,000 mAh | 67W SuperVOOC"
    },
    colors: ["Verde Onda", "Gris Titanio"],
    description: "Smartphone equilibrado de gama media premium con cámara para retratos con zoom óptico 2x y pantalla curva de 120Hz.",
    disponible: true
  },
  {
    id: "oppo-reno-11f",
    nombre: "OPPO Reno 11F 5G 256GB (8GB RAM) Verde Palmera Resistente IP65",
    name: "OPPO Reno 11F 5G 256GB (8GB RAM) Verde Palmera Resistente IP65",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 1299,
    price: 1299,
    originalPrice: 1449,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 12,
    rating: 4.8,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 7050", "256 GB", "Cámara 64MP Ultra-Clear", "Protección IP65"],
    specsObj: {
      screen: "6.7\" AMOLED Plano 120Hz sin bordes",
      processor: "MediaTek Dimensity 7050 5G",
      ram: "8 GB RAM (+8GB Virtual)",
      storage: "256 GB",
      cameras: "Triple 64 MP Ultra-Clear + 8 MP Gran Angular + 2 MP Macro",
      battery: "5,000 mAh | 67W SuperVOOC"
    },
    colors: ["Verde Palmera", "Azul Océano", "Morado Coral"],
    description: "Diseño plano ultraliviano con resistencia al agua y polvo IP65, cámara principal nítida de 64 MP y bordes simétricos.",
    disponible: true
  },
  {
    id: "oppo-a79-5g",
    nombre: "OPPO A79 5G 256GB (8GB RAM) Púrpura Brillante",
    name: "OPPO A79 5G 256GB (8GB RAM) Púrpura Brillante",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "media",
    precio: 899,
    price: 899,
    originalPrice: 1049,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 14,
    rating: 4.7,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 6020 5G", "256 GB", "Cámara 50MP AI", "Parlantes Duales 300%"],
    specsObj: {
      screen: "6.72\" FHD+ Sunlight Display 90Hz",
      processor: "MediaTek Dimensity 6020 5G",
      ram: "8 GB RAM (+8GB Virtual)",
      storage: "256 GB",
      cameras: "Dual 50 MP AI + 2 MP Retrato",
      battery: "5,000 mAh | 33W SuperVOOC"
    },
    colors: ["Púrpura Brillante", "Negro Misterio"],
    description: "Velocidad 5G con gran almacenamiento de 256GB, modo de ultra volumen al 300% con altavoces estéreo duales y carga rápida de 33W.",
    disponible: true
  },
  {
    id: "oppo-a58",
    nombre: "OPPO A58 128GB (6GB RAM) Verde Dazzle",
    name: "OPPO A58 128GB (6GB RAM) Verde Dazzle",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "baja",
    precio: 629,
    price: 629,
    originalPrice: 729,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 15,
    rating: 4.7,
    reviewsCount: 22,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Helio G85", "128 GB", "Cámara 50MP AI", "33W SuperVOOC"],
    specsObj: {
      screen: "6.72\" FHD+ Sunlight Display",
      processor: "MediaTek Helio G85",
      ram: "6 GB RAM (+6GB Virtual)",
      storage: "128 GB",
      cameras: "Dual 50 MP AI + 2 MP Profundidad",
      battery: "5,000 mAh | 33W SuperVOOC"
    },
    colors: ["Verde Dazzle", "Negro Brillante"],
    description: "Calidad y precio con pantalla nítida Full HD+, batería de 5,000 mAh y tecnología de sonido envolvente estéreo.",
    disponible: true
  },
  {
    id: "oppo-a38",
    nombre: "OPPO A38 128GB (4GB RAM) Dorado Oro Brillante",
    name: "OPPO A38 128GB (4GB RAM) Dorado Oro Brillante",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "baja",
    precio: 519,
    price: 519,
    originalPrice: 599,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 18,
    rating: 4.6,
    reviewsCount: 19,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Helio G85", "128 GB", "Pantalla 90Hz Sunlight", "33W Carga Rápida"],
    specsObj: {
      screen: "6.56\" HD+ Sunlight Display 90Hz",
      processor: "MediaTek Helio G85",
      ram: "4 GB RAM (+4GB Virtual)",
      storage: "128 GB",
      cameras: "Dual 50 MP AI + 2 MP Bokeh",
      battery: "5,000 mAh | 33W SuperVOOC"
    },
    colors: ["Dorado Oro", "Negro Brillante"],
    description: "Equipo accesible con pantalla de 90Hz ultra fluida para exteriores, cámara de 50 MP y carga rápida de 33W.",
    disponible: true
  },
  {
    id: "oppo-a18",
    nombre: "OPPO A18 128GB (4GB RAM) Azul Resplandor",
    name: "OPPO A18 128GB (4GB RAM) Azul Resplandor",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "baja",
    precio: 449,
    price: 449,
    originalPrice: 499,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Libre",
    badgeType: "libre",
    registro: "Libre",
    stock: 20,
    rating: 4.6,
    reviewsCount: 25,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Helio G85", "128 GB", "Pantalla 90Hz", "Batería 5,000 mAh"],
    specsObj: {
      screen: "6.56\" 90Hz Sunlight Display",
      processor: "MediaTek Helio G85",
      ram: "4 GB RAM",
      storage: "128 GB",
      cameras: "Dual 8 MP + 2 MP",
      battery: "5,000 mAh"
    },
    colors: ["Azul Resplandor", "Negro Brillante"],
    description: "El modelo más económico de OPPO con batería para todo el día, 128GB de almacenamiento y fluidez garantizada.",
    disponible: true
  },
  {
    id: "oppo-find-n3-flip",
    nombre: "OPPO Find N3 Flip 512GB (12GB RAM) Pantalla Vertical Plegable",
    name: "OPPO Find N3 Flip 512GB (12GB RAM) Pantalla Vertical Plegable",
    marca: "OPPO",
    brand: "OPPO",
    category: "oppo",
    range: "alta",
    precio: 3499,
    price: 3499,
    originalPrice: 3899,
    imagen: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    image: "assets/img/brands/OPPO/Celular oppo para inicio.webp",
    badge: "Registrado",
    badgeType: "registrado",
    registro: "R",
    stock: 4,
    rating: 4.9,
    reviewsCount: 18,
    gallery: [
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp",
      "assets/img/brands/OPPO/Celular oppo para inicio.webp"
    ],
    specs: ["Dimensity 9200", "512 GB", "Triple Cámara Hasselblad", "Plegable 120Hz"],
    specsObj: {
      screen: "6.8\" LTPO AMOLED Plegable 120Hz + Externa 3.26\" Vertical",
      processor: "MediaTek Dimensity 9200 (4nm)",
      ram: "12 GB RAM",
      storage: "512 GB UFS 4.0",
      cameras: "Triple 50 MP OIS + 32 MP Retrato 2x + 48 MP Ultra Gran Angular Hasselblad",
      battery: "4,300 mAh | 44W SuperVOOC"
    },
    colors: ["Oro Crema", "Negro Elegante", "Rosa Niebla"],
    description: "Plegable de bolsillo con bisagra de flexión sin marcas, pantalla externa vertical interactiva y la primera triple cámara Hasselblad en un plegable flip.",
    disponible: true
  }
];

// Read existing products and ensure no duplicates
const { productos } = require(targetFile);
const existingIds = new Set(productos.map(p => p.id));
const toAdd = oppoProducts.filter(p => !existingIds.has(p.id));

if (toAdd.length > 0) {
  // Format toAdd as JS objects
  const jsonStr = JSON.stringify(toAdd, null, 2);
  // Remove outer [ and ]
  const innerContent = jsonStr.slice(jsonStr.indexOf('[') + 1, jsonStr.lastIndexOf(']')).trim();
  
  // Insert before the closing `];` of `const productos = [`
  const lastBracketIndex = fileContent.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    fileContent = fileContent.slice(0, lastBracketIndex).trimEnd() + ',\n\n  /* --- SMARTPHONES OFICIALES OPPO --- */\n' + innerContent + '\n];\n' + fileContent.slice(lastBracketIndex + 2);
    fs.writeFileSync(targetFile, fileContent, 'utf8');
    console.log('Successfully added', toAdd.length, 'OPPO smartphones to data/products.js!');
  } else {
    console.error('Could not locate closing ]; in products.js');
  }
} else {
  console.log('OPPO products already exist in products.js');
}
