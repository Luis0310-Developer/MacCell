const fs = require('fs');
const path = require('path');

// 22 Modelos de iPhone (13 Chip Físico + 9 eSIM)
const appleModels = [
  // ==========================================
  // IPHONE — CHIP FÍSICO
  // ==========================================
  {
    id: "iphone-15-128gb-fisico-libre",
    nombre: "iPhone 15 128GB (Chip Físico) Libre",
    name: "iPhone 15 128GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "media-alta",
    precio: 2380,
    price: 2380,
    originalPrice: 2750,
    imagen: "assets/img/brands/Iphone/iphone-15.webp",
    image: "assets/img/brands/Iphone/iphone-15.webp",
    badge: "CHIP FÍSICO",
    badgeType: "offer",
    registro: "Libre",
    stock: 14,
    rating: 4.8,
    reviewsCount: 58,
    gallery: [
      "assets/img/brands/Iphone/iphone-15.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Chip A16 Bionic", "Dynamic Island", "Cámara 48MP"],
    specsObj: {
      screen: "6.1\" Super Retina XDR OLED 2000 nits",
      processor: "Apple A16 Bionic (4nm)",
      ram: "6 GB RAM",
      storage: "128 GB NVMe",
      cameras: "Dual 48 MP con Telefoto 2x + 12 MP Ultra Gran Angular",
      battery: "3,349 mAh | Conector USB-C universal"
    },
    colors: ["Negro", "Azul Pastel", "Rosa", "Verde", "Amarillo"],
    description: "Versión Libre con bandeja para Chip Físico (Nano-SIM). Equipado con Dynamic Island, cámara de 48 MP con zoom 2x de calidad óptica y puerto USB-C. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-15-128gb-fisico-reg",
    nombre: "iPhone 15 128GB (Chip Físico) Registrado",
    name: "iPhone 15 128GB (Chip Físico) Registrado",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "media-alta",
    precio: 2620,
    price: 2620,
    originalPrice: 2950,
    imagen: "assets/img/brands/Iphone/iphone-15.webp",
    image: "assets/img/brands/Iphone/iphone-15.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 12,
    rating: 4.9,
    reviewsCount: 64,
    gallery: [
      "assets/img/brands/Iphone/iphone-15.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Registrado Lista Blanca", "Chip Físico Nano-SIM", "Chip A16 Bionic", "Dynamic Island"],
    specsObj: {
      screen: "6.1\" Super Retina XDR OLED 2000 nits",
      processor: "Apple A16 Bionic (4nm)",
      ram: "6 GB RAM",
      storage: "128 GB NVMe",
      cameras: "Dual 48 MP con Telefoto 2x + 12 MP Ultra Gran Angular",
      battery: "3,349 mAh | Conector USB-C universal"
    },
    colors: ["Negro", "Azul Pastel", "Rosa", "Verde"],
    description: "Versión Registrada (R): Homologación oficial en lista blanca MTC con bandeja para Chip Físico. Dynamic Island y chip A16 Bionic. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-16-128gb-fisico-libre",
    nombre: "iPhone 16 128GB (Chip Físico) Libre",
    name: "iPhone 16 128GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 2740,
    price: 2740,
    originalPrice: 3100,
    imagen: "assets/img/brands/Iphone/iphone-16.webp",
    image: "assets/img/brands/Iphone/iphone-16.webp",
    badge: "APPLE INTELLIGENCE",
    badgeType: "new",
    registro: "Libre",
    stock: 15,
    rating: 4.9,
    reviewsCount: 51,
    gallery: [
      "assets/img/brands/Iphone/iphone-16.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Chip A18 (3nm)", "Control de Cámara", "Apple Intelligence"],
    specsObj: {
      screen: "6.1\" Super Retina XDR OLED 2000 nits Ceramic Shield",
      processor: "Apple A18 de 2da generación (3nm)",
      ram: "8 GB RAM",
      storage: "128 GB NVMe",
      cameras: "48 MP Fusion con teleobjetivo 2x + 12 MP Ultra Gran Angular Macro",
      battery: "3,561 mAh | Carga rápida USB-C y MagSafe"
    },
    colors: ["Ultramar", "Verde Azulado", "Rosa", "Blanco", "Negro"],
    description: "Versión Libre con ranura de Chip Físico. Diseñado para Apple Intelligence con el chip A18, nuevo botón Control de Cámara y botón de Acción. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-16e-128gb-fisico-reg",
    nombre: "iPhone 16e 128GB (Chip Físico) Registrado",
    name: "iPhone 16e 128GB (Chip Físico) Registrado",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "media-alta",
    precio: 2280,
    price: 2280,
    originalPrice: 2600,
    imagen: "assets/img/brands/Iphone/iphone-16e.webp",
    image: "assets/img/brands/Iphone/iphone-16e.webp",
    badge: "HOMOLOGADO R",
    badgeType: "offer",
    registro: "R",
    stock: 16,
    rating: 4.8,
    reviewsCount: 43,
    gallery: [
      "assets/img/brands/Iphone/iphone-16e.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Registrado Lista Blanca", "Chip Físico Nano-SIM", "Chip A18 Bionic", "OLED Super Retina"],
    specsObj: {
      screen: "6.1\" OLED Super Retina XDR",
      processor: "Apple A18 Bionic (3nm)",
      ram: "8 GB RAM",
      storage: "128 GB NVMe",
      cameras: "48 MP Fusion con OIS + 12 MP Frontal TrueDepth",
      battery: "3,500 mAh | Carga rápida USB-C"
    },
    colors: ["Negro Medianoche", "Blanco Estrella", "Rojo"],
    description: "Versión Registrada (R) con bandeja para Chip Físico. La puerta de entrada más potente al ecosistema Apple con chip A18 y cámara Fusion de 48 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-256gb-fisico-libre",
    nombre: "iPhone 17 256GB (Chip Físico) Libre",
    name: "iPhone 17 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 3260,
    price: 3260,
    originalPrice: 3700,
    imagen: "assets/img/brands/Iphone/iphone-17.webp",
    image: "assets/img/brands/Iphone/iphone-17.webp",
    badge: "PROMOTION 120HZ",
    badgeType: "new",
    registro: "Libre",
    stock: 11,
    rating: 5.0,
    reviewsCount: 39,
    gallery: [
      "assets/img/brands/Iphone/iphone-17.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "ProMotion 120Hz LTPO", "Chip A19 Bionic", "256 GB Espacio"],
    specsObj: {
      screen: "6.27\" ProMotion OLED LTPO 120Hz Siempre Activa",
      processor: "Apple A19 Bionic (3nm Mejorado)",
      ram: "8 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Dual 48 MP Fusion + 48 MP Ultra Gran Angular + Frontal 24 MP",
      battery: "3,700 mAh | Carga rápida 30W USB-C"
    },
    colors: ["Titanio Azul", "Verde Esmeralda", "Plata Luz", "Negro Estelar"],
    description: "Versión Libre con ranura de Chip Físico. Incorpora por fin pantalla ProMotion fluida de 120Hz en el modelo estándar, chip A19 y 256GB. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-256gb-fisico-libre",
    nombre: "iPhone 17 Pro 256GB (Chip Físico) Libre",
    name: "iPhone 17 Pro 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4360,
    price: 4360,
    originalPrice: 4900,
    imagen: "assets/img/brands/Iphone/iphone-17-pro.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro.webp",
    badge: "TITANIO PRO",
    badgeType: "new",
    registro: "Libre",
    stock: 9,
    rating: 5.0,
    reviewsCount: 47,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Chip A19 Pro (2nm)", "Triple 48MP Tetraprisma", "Chasis Titanio"],
    specsObj: {
      screen: "6.3\" Super Retina XDR ProMotion 120Hz 3000 nits",
      processor: "Apple A19 Pro Bionic (2nm TSMC)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP: Principal + Ultra Gran Angular + Telefoto Tetraprisma 5x OIS",
      battery: "3,850 mAh | Carga rápida 35W y MagSafe"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Negro", "Titanio Blanco"],
    description: "Versión Libre con soporte para Chip Físico. Rendimiento profesional con arquitectura de 2nm del chip A19 Pro, triple sensor de 48 MP y acabado de titanio pulido. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-13-pro-max-256gb-fisico",
    nombre: "iPhone 13 Pro Max 256GB (Chip Físico) Libre",
    name: "iPhone 13 Pro Max 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "media-alta",
    precio: 2750,
    price: 2750,
    originalPrice: 3150,
    imagen: "assets/img/brands/Iphone/iphone-13-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-13-pro-max.webp",
    badge: "CALIDAD/PRECIO",
    badgeType: "offer",
    registro: "Libre",
    stock: 10,
    rating: 4.8,
    reviewsCount: 62,
    gallery: [
      "assets/img/brands/Iphone/iphone-13-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "ProMotion 120Hz 6.7\"", "Triple Cámara 12MP", "Batería Legendaria"],
    specsObj: {
      screen: "6.7\" Super Retina XDR OLED ProMotion 120Hz",
      processor: "Apple A15 Bionic (GPU 5 núcleos)",
      ram: "6 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 12 MP con Telefoto 3x + Ultra Gran Angular Macro + LiDAR",
      battery: "4,352 mAh | Autonomía récord"
    },
    colors: ["Azul Sierra", "Grafito", "Oro", "Verde Alpino"],
    description: "Versión Libre con Chip Físico. El Pro Max legendario por su inagotable duración de batería, pantalla fluida a 120Hz y construcción en acero inoxidable. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-14-pro-max-1tb-fisico",
    nombre: "iPhone 14 Pro Max 1TB (Chip Físico) Libre",
    name: "iPhone 14 Pro Max 1TB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 3370,
    price: 3370,
    originalPrice: 3850,
    imagen: "assets/img/brands/Iphone/iphone-14-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-14-pro-max.webp",
    badge: "1 TB CAPACIDAD",
    badgeType: "offer",
    registro: "Libre",
    stock: 7,
    rating: 4.9,
    reviewsCount: 49,
    gallery: [
      "assets/img/brands/Iphone/iphone-14-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "1 Terabyte NVMe", "Dynamic Island", "Cámara 48MP Pro"],
    specsObj: {
      screen: "6.7\" Super Retina XDR OLED 120Hz Always-On",
      processor: "Apple A16 Bionic (4nm)",
      ram: "6 GB RAM",
      storage: "1 TB (1024 GB) NVMe",
      cameras: "Triple 48 MP Principal + 12 MP Telefoto 3x + 12 MP Ultra Gran Angular + LiDAR",
      battery: "4,323 mAh | Carga rápida MagSafe"
    },
    colors: ["Morado Oscuro", "Negro Espacial", "Oro", "Plata"],
    description: "Versión Libre con Chip Físico y la máxima capacidad de 1 Terabyte. Dynamic Island interactiva, cámara ProRAW de 48 MP y pantalla Always-On. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-15-pro-max-256gb-fisico",
    nombre: "iPhone 15 Pro Max 256GB (Chip Físico) Libre",
    name: "iPhone 15 Pro Max 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 3700,
    price: 3700,
    originalPrice: 4200,
    imagen: "assets/img/brands/Iphone/iphone-15-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-15-pro-max.webp",
    badge: "TITANIO GRADO 5",
    badgeType: "offer",
    registro: "Libre",
    stock: 11,
    rating: 4.9,
    reviewsCount: 55,
    gallery: [
      "assets/img/brands/Iphone/iphone-15-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Chip A17 Pro (3nm)", "Tetraprisma 5x", "Chasis Titanio"],
    specsObj: {
      screen: "6.7\" Super Retina XDR OLED ProMotion 120Hz",
      processor: "Apple A17 Pro con Ray Tracing por hardware",
      ram: "8 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP + Telefoto Tetraprisma 5x OIS + 12 MP Ultra Gran Angular",
      battery: "4,422 mAh | Puerto USB-C 3.0 de alta velocidad"
    },
    colors: ["Titanio Natural", "Titanio Azul", "Titanio Blanco", "Titanio Negro"],
    description: "Versión Libre con Chip Físico. Chasis ultraligero de titanio de grado aeroespacial, chip A17 Pro capaz de correr juegos de consola y zoom óptico 5x. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-16-pro-max-256gb-fisico",
    nombre: "iPhone 16 Pro Max 256GB (Chip Físico) Libre",
    name: "iPhone 16 Pro Max 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4220,
    price: 4220,
    originalPrice: 4750,
    imagen: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    image: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    badge: "PANTALLA 6.9\"",
    badgeType: "new",
    registro: "Libre",
    stock: 12,
    rating: 5.0,
    reviewsCount: 68,
    gallery: [
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_transparent.png",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Pantalla 6.9\" 120Hz", "Chip A18 Pro", "Control de Cámara"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED 120Hz Bordes Ultradelgados",
      processor: "Apple A18 Pro Bionic (3nm)",
      ram: "8 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP Fusion + 48 MP Ultra Gran Angular + 12 MP Telefoto 5x Tetraprisma",
      battery: "4,685 mAh | Carga rápida 30W"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Negro", "Titanio Blanco"],
    description: "Versión Libre con ranura para Chip Físico. La pantalla más grande jamás vista en un iPhone con 6.9 pulgadas, botón de Control de Cámara y chip A18 Pro. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-256gb-fisico-libre",
    nombre: "iPhone 17 Pro Max 256GB (Chip Físico) Libre",
    name: "iPhone 17 Pro Max 256GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4690,
    price: 4690,
    originalPrice: 5250,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "FLAGSHIP 2026",
    badgeType: "new",
    registro: "Libre",
    stock: 10,
    rating: 5.0,
    reviewsCount: 42,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "Chip A19 Pro (2nm)", "Triple 48MP Zoom 6x", "Pantalla 6.9\" 3500 nits"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz Anti-Reflejo 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm TSMC)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Telefoto Periscopio 6x OIS + 48 MP Ultra + 48 MP Principal",
      battery: "4,850 mAh | Carga 40W USB-C y MagSafe Qi2"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial", "Titanio Blanco"],
    description: "Versión Libre con bandeja de Chip Físico. Máxima potencia mundial con arquitectura de 2nm, recubrimiento antirreflejo y triple sensor de 48 MP con zoom óptico 6x. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-256gb-fisico-reg",
    nombre: "iPhone 17 Pro Max 256GB (Chip Físico) Registrado",
    name: "iPhone 17 Pro Max 256GB (Chip Físico) Registrado",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4960,
    price: 4960,
    originalPrice: 5500,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "HOMOLOGADO R",
    badgeType: "new",
    registro: "R",
    stock: 8,
    rating: 5.0,
    reviewsCount: 46,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Registrado Lista Blanca", "Chip Físico Nano-SIM", "Chip A19 Pro (2nm)", "Pantalla 6.9\""],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz Anti-Reflejo 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm TSMC)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Telefoto Periscopio 6x OIS + 48 MP Ultra + 48 MP Principal",
      battery: "4,850 mAh | Carga 40W USB-C"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial"],
    description: "Versión Registrada (R): Homologación oficial en lista blanca MTC con bandeja de Chip Físico. El buque insignia con A19 Pro, titanio aeroespacial y zoom periscópico. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-512gb-fisico-libre",
    nombre: "iPhone 17 Pro Max 512GB (Chip Físico) Libre",
    name: "iPhone 17 Pro Max 512GB (Chip Físico) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 5390,
    price: 5390,
    originalPrice: 5990,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "512 GB PRO MAX",
    badgeType: "new",
    registro: "Libre",
    stock: 7,
    rating: 5.0,
    reviewsCount: 38,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Chip Físico Nano-SIM", "512 GB NVMe", "Chip A19 Pro (2nm)", "Triple 48MP 6x"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm)",
      ram: "12 GB RAM",
      storage: "512 GB NVMe",
      cameras: "Triple 48 MP OIS con Periscopio 6x + 48 MP Ultra + LiDAR",
      battery: "4,850 mAh | Carga 40W USB-C"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial"],
    description: "Versión Libre con ranura de Chip Físico y 512GB de memoria masiva ultrarrápida. La experiencia cumbre de Apple para creadores y usuarios profesionales. Se emite comprobante de venta para garantía.",
    disponible: true
  },

  // ==========================================
  // IPHONE — ESIM
  // ==========================================
  {
    id: "iphone-17-256gb-esim",
    nombre: "iPhone 17 256GB (eSIM Edition) Libre",
    name: "iPhone 17 256GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 3190,
    price: 3190,
    originalPrice: 3600,
    imagen: "assets/img/brands/Iphone/iphone-17.webp",
    image: "assets/img/brands/Iphone/iphone-17.webp",
    badge: "ESIM DIGITAL",
    badgeType: "offer",
    registro: "Libre",
    stock: 12,
    rating: 4.9,
    reviewsCount: 34,
    gallery: [
      "assets/img/brands/Iphone/iphone-17.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "ProMotion 120Hz LTPO", "Chip A19 Bionic", "256 GB Espacio"],
    specsObj: {
      screen: "6.27\" ProMotion OLED LTPO 120Hz Siempre Activa",
      processor: "Apple A19 Bionic (3nm)",
      ram: "8 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Dual 48 MP Fusion + 48 MP Ultra Gran Angular",
      battery: "3,700 mAh | Carga rápida 30W USB-C"
    },
    colors: ["Titanio Azul", "Verde Esmeralda", "Plata Luz", "Negro Estelar"],
    description: "Edición eSIM Digital: Mayor seguridad sin tarjetas físicas, activación instantánea de múltiples líneas, pantalla ProMotion 120Hz y chip A19 Bionic. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-256gb-esim",
    nombre: "iPhone 17 Pro 256GB (eSIM Edition) Libre",
    name: "iPhone 17 Pro 256GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4160,
    price: 4160,
    originalPrice: 4680,
    imagen: "assets/img/brands/Iphone/iphone-17-pro.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro.webp",
    badge: "ESIM PRO",
    badgeType: "new",
    registro: "Libre",
    stock: 9,
    rating: 5.0,
    reviewsCount: 37,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "Chip A19 Pro (2nm)", "Triple 48MP Tetraprisma", "Chasis Titanio"],
    specsObj: {
      screen: "6.3\" Super Retina XDR ProMotion 120Hz 3000 nits",
      processor: "Apple A19 Pro Bionic (2nm)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Telefoto 5x Tetraprisma OIS",
      battery: "3,850 mAh | Carga rápida 35W"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Negro", "Titanio Blanco"],
    description: "Edición eSIM Digital Pro: Cuerpo sellado sin ranuras físicas para máxima resistencia, chip A19 Pro de 2nm y triple sensor de 48 MP. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-18-pro-256gb-esim",
    nombre: "iPhone 18 Pro 256GB (eSIM Edition) Libre",
    name: "iPhone 18 Pro 256GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 5800,
    price: 5800,
    originalPrice: 6450,
    imagen: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    image: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    badge: "FUTURO FLAGSHIP",
    badgeType: "new",
    registro: "Libre",
    stock: 6,
    rating: 5.0,
    reviewsCount: 28,
    gallery: [
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_transparent.png",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "Chip A20 Pro (2nm GAA)", "Face ID Bajo Pantalla", "256 GB NVMe"],
    specsObj: {
      screen: "6.3\" All-Screen OLED LTPO 120Hz con Face ID bajo pantalla",
      processor: "Apple A20 Pro Bionic (2nm GAA de nueva generación)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Zoom Continuo Periscópico + LiDAR de 2da Gen",
      battery: "4,000 mAh Grafeno | Carga ultra veloz 45W"
    },
    colors: ["Titanio Cósmico", "Titanio Natural", "Platino"],
    description: "Edición eSIM Digital: La vanguardia tecnológica absoluta con el revolucionario procesador A20 Pro de 2nm GAA, Face ID integrado bajo la pantalla y chasis de titanio pulido. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-18-pro-512gb-esim",
    nombre: "iPhone 18 Pro 512GB (eSIM Edition) Libre",
    name: "iPhone 18 Pro 512GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 6300,
    price: 6300,
    originalPrice: 6990,
    imagen: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    image: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    badge: "512 GB A20 PRO",
    badgeType: "new",
    registro: "Libre",
    stock: 5,
    rating: 5.0,
    reviewsCount: 31,
    gallery: [
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_transparent.png",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "512 GB NVMe", "Chip A20 Pro (2nm)", "Pantalla Completa 120Hz"],
    specsObj: {
      screen: "6.3\" All-Screen OLED LTPO 120Hz 4000 nits",
      processor: "Apple A20 Pro Bionic (2nm GAA)",
      ram: "12 GB RAM",
      storage: "512 GB NVMe",
      cameras: "Triple 48 MP con Periscopio Continuo + Sensor 1 pulgada",
      battery: "4,000 mAh | Carga 45W y MagSafe Qi2"
    },
    colors: ["Titanio Cósmico", "Titanio Natural", "Platino"],
    description: "Edición eSIM Digital de 512GB: Potencia gráfica sin precedentes impulsada por A20 Pro y almacenamiento de grado cinematográfico para video ProRes 8K. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-256gb-esim",
    nombre: "iPhone 17 Pro Max 256GB (eSIM Edition) Libre",
    name: "iPhone 17 Pro Max 256GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 4480,
    price: 4480,
    originalPrice: 5050,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "ESIM PRO MAX",
    badgeType: "new",
    registro: "Libre",
    stock: 9,
    rating: 5.0,
    reviewsCount: 40,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "Pantalla 6.9\" 120Hz", "Chip A19 Pro (2nm)", "Triple 48MP Zoom 6x"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Periscopio 6x OIS + 48 MP Ultra",
      battery: "4,850 mAh | Carga 40W USB-C"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial"],
    description: "Edición eSIM Digital Pro Max con pantalla gigante de 6.9 pulgadas sin reflejos, cámara periscópica de 6x y chip A19 Pro de 2nm. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-18-pro-max-256gb-esim",
    nombre: "iPhone 18 Pro MAX 256GB (eSIM Edition) Libre",
    name: "iPhone 18 Pro MAX 256GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 6300,
    price: 6300,
    originalPrice: 7000,
    imagen: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    image: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    badge: "TOPE DE GAMA 2026",
    badgeType: "new",
    registro: "Libre",
    stock: 6,
    rating: 5.0,
    reviewsCount: 45,
    gallery: [
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_transparent.png",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "Pantalla 6.9\" All-Screen", "Chip A20 Pro (2nm)", "Triple 48MP Periscopio"],
    specsObj: {
      screen: "6.9\" All-Screen OLED LTPO 120Hz con Face ID bajo pantalla 4000 nits",
      processor: "Apple A20 Pro Bionic (2nm GAA)",
      ram: "12 GB RAM",
      storage: "256 GB NVMe",
      cameras: "Triple 48 MP con Zoom Continuo 10x + Sensor Principal de 1 pulgada",
      battery: "5,000 mAh Grafeno | Carga rápida 45W"
    },
    colors: ["Titanio Cósmico", "Titanio Natural", "Platino"],
    description: "El smartphone más potente y exclusivo del mundo: chip A20 Pro de 2nm, pantalla 6.9\" todo pantalla con Face ID oculto y batería de 5,000 mAh. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-512gb-esim",
    nombre: "iPhone 17 Pro Max 512GB (eSIM Edition) Libre",
    name: "iPhone 17 Pro Max 512GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 5150,
    price: 5150,
    originalPrice: 5750,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "512 GB ESIM",
    badgeType: "new",
    registro: "Libre",
    stock: 8,
    rating: 5.0,
    reviewsCount: 36,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "512 GB NVMe", "Chip A19 Pro (2nm)", "Pantalla 6.9\" ProMotion"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm)",
      ram: "12 GB RAM",
      storage: "512 GB NVMe",
      cameras: "Triple 48 MP OIS con Periscopio 6x + LiDAR",
      battery: "4,850 mAh | Carga 40W USB-C"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial"],
    description: "Edición eSIM Digital de 512GB: Almacenamiento holgado para grabación en Log y Apple ProRes con chasis de titanio y autonomía superior. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-18-pro-max-512gb-esim",
    nombre: "iPhone 18 Pro MAX 512GB (eSIM Edition) Libre",
    name: "iPhone 18 Pro MAX 512GB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 7180,
    price: 7180,
    originalPrice: 7950,
    imagen: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    image: "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
    badge: "512 GB SUPREMO",
    badgeType: "new",
    registro: "Libre",
    stock: 5,
    rating: 5.0,
    reviewsCount: 33,
    gallery: [
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_transparent.png",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "512 GB NVMe", "Chip A20 Pro (2nm GAA)", "Sensor 1 Pulg."],
    specsObj: {
      screen: "6.9\" All-Screen OLED LTPO 120Hz con Face ID bajo pantalla",
      processor: "Apple A20 Pro Bionic (2nm GAA)",
      ram: "12 GB RAM",
      storage: "512 GB NVMe",
      cameras: "Triple 48 MP con Zoom Continuo 10x + Sensor Principal de 1 pulgada",
      battery: "5,000 mAh Grafeno | Carga rápida 45W"
    },
    colors: ["Titanio Cósmico", "Titanio Natural", "Platino"],
    description: "Edición eSIM Digital Suprema con 512 GB y chip A20 Pro. La cumbre de la ingeniería de Apple con pantalla ininterrumpida y cámara con zoom continuo. Se emite comprobante de venta para garantía.",
    disponible: true
  },
  {
    id: "iphone-17-pro-max-1tb-esim",
    nombre: "iPhone 17 Pro Max 1TB (eSIM Edition) Libre",
    name: "iPhone 17 Pro Max 1TB (eSIM Edition) Libre",
    marca: "Apple",
    brand: "Apple",
    category: "apple",
    range: "alta",
    precio: 5860,
    price: 5860,
    originalPrice: 6500,
    imagen: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    image: "assets/img/brands/Iphone/iphone-17-pro-max.webp",
    badge: "1 TB ESIM",
    badgeType: "new",
    registro: "Libre",
    stock: 4,
    rating: 5.0,
    reviewsCount: 29,
    gallery: [
      "assets/img/brands/Iphone/iphone-17-pro-max.webp",
      "assets/img/brands/Iphone/Iphone 18 pro max.jpeg",
      "assets/img/brands/Iphone/iphone_logo_clean.png"
    ],
    specs: ["Conectividad eSIM Digital", "1 Terabyte NVMe", "Chip A19 Pro (2nm)", "Pantalla 6.9\" ProMotion"],
    specsObj: {
      screen: "6.9\" Super Retina XDR OLED ProMotion 120Hz 3500 nits",
      processor: "Apple A19 Pro Bionic (2nm)",
      ram: "12 GB RAM",
      storage: "1 TB (1024 GB) NVMe",
      cameras: "Triple 48 MP OIS con Periscopio 6x + LiDAR",
      battery: "4,850 mAh | Carga 40W USB-C"
    },
    colors: ["Titanio Desierto", "Titanio Natural", "Titanio Espacial"],
    description: "Edición eSIM Digital con 1 Terabyte de capacidad total. El pináculo de la productividad móvil y cinematográfica con chip A19 Pro de 2nm. Se emite comprobante de venta para garantía.",
    disponible: true
  }
];

// Helper para convertir objeto JS a string con formato legible
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

// Leer archivo actual
const productsFilePath = path.join(__dirname, '..', 'data', 'products.js');
let fileContent = fs.readFileSync(productsFilePath, 'utf8');

// 1. Eliminar el viejo iphone-15-128gb que estaba abajo
const markerIphone15 = 'id: "iphone-15-128gb"';
const indexOldIphone15 = fileContent.indexOf(markerIphone15);
if (indexOldIphone15 !== -1) {
  const startOld15 = fileContent.lastIndexOf('{', indexOldIphone15);
  const endOld15 = fileContent.indexOf('},', indexOldIphone15) + 2;
  // Cortar ese bloque
  fileContent = fileContent.substring(0, startOld15) + fileContent.substring(endOld15).replace(/^\s*\n/, '');
}

// 2. Reemplazar el viejo iphone-16-pro-max al principio por los 22 modelos Apple
const markerIphone16 = 'id: "iphone-16-pro-max"';
const markerSamsung = 'id: "samsung-s24-ultra"';

const indexIphone16 = fileContent.indexOf(markerIphone16);
const indexSamsung = fileContent.indexOf(markerSamsung);

if (indexIphone16 === -1 || indexSamsung === -1) {
  console.error('No se pudieron encontrar los marcadores para reemplazo Apple.');
  process.exit(1);
}

let startCut = fileContent.lastIndexOf('{', indexIphone16);
let endCut = fileContent.lastIndexOf('{', indexSamsung);

const newAppleString = appleModels.map(serializeProduct).join(',\n') + ',\n  ';

let updatedContent = fileContent.substring(0, startCut) + newAppleString + fileContent.substring(endCut);

// Bump version
updatedContent = updatedContent.replace(
  /const CATALOG_VERSION = ".*?";/,
  'const CATALOG_VERSION = "2026-10-20-apple-v1";'
);

fs.writeFileSync(productsFilePath, updatedContent, 'utf8');
console.log('Apple catalog updated successfully! Added models:', appleModels.length);
