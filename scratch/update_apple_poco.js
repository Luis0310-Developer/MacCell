const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.js');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Mapping Apple
const appleMap = {
  // iPhone 17 (base)
  'iphone-17-256gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728593/PHONE_17_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728593/PHONE_17_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728595/PHONE_17_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728598/PHONE_17_3.webp'
    ]
  },
  'iphone-17-256gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728593/PHONE_17_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728593/PHONE_17_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728595/PHONE_17_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728598/PHONE_17_3.webp'
    ]
  },
  // iPhone 17 Pro
  'iphone-17-pro-256gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728550/IPHONE_17_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728550/IPHONE_17_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728553/IPHONE_17_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728555/IPHONE_17_PRO_3.webp'
    ]
  },
  'iphone-17-pro-256gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728550/IPHONE_17_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728550/IPHONE_17_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728553/IPHONE_17_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728555/IPHONE_17_PRO_3.webp'
    ]
  },
  // iPhone 17 Pro Max
  'iphone-17-pro-max-256gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  'iphone-17-pro-max-256gb-fisico-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  'iphone-17-pro-max-512gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  'iphone-17-pro-max-256gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  'iphone-17-pro-max-512gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  'iphone-17-pro-max-1tb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728557/IPHONE_17_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728560/IPHONE_17_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728562/IPHONE_17_PRO_MAX_3.webp'
    ]
  },
  // iPhone 18 Pro
  'iphone-18-pro-256gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728565/IPHONE_18_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728565/IPHONE_18_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728567/IPHONE_18_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728570/IPHONE_18_PRO_3.webp'
    ]
  },
  'iphone-18-pro-512gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728565/IPHONE_18_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728565/IPHONE_18_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728567/IPHONE_18_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728570/IPHONE_18_PRO_3.webp'
    ]
  },
  // iPhone 18 Pro Max
  'iphone-18-pro-max-256gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728572/IPHONE_18_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728572/IPHONE_18_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728574/IPHONE_18_PRO_MAX_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728577/IPHONE_18_PRO_MAX_3.webp'
    ]
  },
  'iphone-18-pro-max-512gb-esim': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728572/IPHONE_18_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728572/IPHONE_18_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728574/IPHONE_18_PRO_MAX_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728577/IPHONE_18_PRO_MAX_3.webp'
    ]
  },
  // iPhone 16e
  'iphone-16e-128gb-fisico-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728543/IPHONE_16E_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728543/IPHONE_16E_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728546/IPHONE_16E_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728548/IPHONE_16E_3.jpg'
    ]
  },
  // iPhone 16 (base)
  'iphone-16-128gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728529/IPHONE_16_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728529/IPHONE_16_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728531/IPHONE_16_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728534/IPHONE_16_3.jpg'
    ]
  },
  // iPhone 16 Pro Max
  'iphone-16-pro-max-256gb-fisico': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728536/IPHONE_16_PRO_MAX_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728536/IPHONE_16_PRO_MAX_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728538/IPHONE_16_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728541/IPHONE_16_PRO_MAX_3.jpg'
    ]
  },
  // iPhone 15 (base)
  'iphone-15-128gb-fisico-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728515/IPHONE_15_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728515/IPHONE_15_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728517/IPHONE_15_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728520/IPHONE_15_3.webp'
    ]
  },
  'iphone-15-128gb-fisico-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728515/IPHONE_15_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728515/IPHONE_15_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728517/IPHONE_15_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728520/IPHONE_15_3.webp'
    ]
  },
  // iPhone 15 Pro Max
  'iphone-15-pro-max-256gb-fisico': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728522/IPHONE_15_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728522/IPHONE_15_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728524/IPHONE_15_PRO_MAX_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728527/IPHONE_15_PRO_MAX_3.webp'
    ]
  },
  // iPhone 14 Pro Max
  'iphone-14-pro-max-1tb-fisico': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728507/IPHONE_14_PRO_MAX_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728507/IPHONE_14_PRO_MAX_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728510/IPHONE_14_PRO_MAX_2.png',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728512/IPHONE_14_PRO_MAX_3.webp'
    ]
  },
  // iPhone 13 Pro Max
  'iphone-13-pro-max-256gb-fisico': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792728506/IPHONE_13_PRO_MAX.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728506/IPHONE_13_PRO_MAX.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728506/IPHONE_13_PRO_MAX_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792728507/IPHONE_13_PRO_MAX_3.png'
    ]
  }
};

// Mapping POCO
const pocoMap = {
  // POCO C71
  'poco-c71-64gb': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_3.jpg'
    ]
  },
  'poco-c71-128gb': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_2.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729218/POCO_C71_3.jpg'
    ]
  },
  // POCO C85
  'poco-c85-128gb': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729222/POCO_C85_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729222/POCO_C85_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729224/POCO_C85_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729226/POCO_C85_3.jpg'
    ]
  },
  'poco-c85-256gb': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729222/POCO_C85_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729222/POCO_C85_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729224/POCO_C85_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729226/POCO_C85_3.jpg'
    ]
  },
  // POCO X7 Pro
  'poco-x7-pro-512gb': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729251/POCO_X7_PRO_1.jpg',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729251/POCO_X7_PRO_1.jpg',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729253/POCO_X7_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729256/POCO_X7_PRO_3.jpg'
    ]
  },
  // POCO X8 Pro
  'poco-x8-pro-256gb-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729261/POCO_X8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729263/POCO_X8_PRO_3.jpg'
    ]
  },
  'poco-x8-pro-256gb-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729261/POCO_X8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729263/POCO_X8_PRO_3.jpg'
    ]
  },
  'poco-x8-pro-512gb-8ram': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729261/POCO_X8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729263/POCO_X8_PRO_3.jpg'
    ]
  },
  'poco-x8-pro-512gb-12ram-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729261/POCO_X8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729263/POCO_X8_PRO_3.jpg'
    ]
  },
  'poco-x8-pro-512gb-12ram-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729258/POCO_X8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729261/POCO_X8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729263/POCO_X8_PRO_3.jpg'
    ]
  },
  // POCO X8 Pro Max
  'poco-x8-pro-max-512gb-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729265/POCO_X8_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729265/POCO_X8_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729268/POCO_X8_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729270/POCO_X8_PRO_MAX_3.jpg'
    ]
  },
  'poco-x8-pro-max-512gb-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729265/POCO_X8_PRO_MAX_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729265/POCO_X8_PRO_MAX_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729268/POCO_X8_PRO_MAX_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729270/POCO_X8_PRO_MAX_3.jpg'
    ]
  },
  // POCO F8 Pro
  'poco-f8-pro-512gb-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729230/POCO_F8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729230/POCO_F8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729232/POCO_F8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729234/POCO_F8_PRO_3.webp'
    ]
  },
  'poco-f8-pro-512gb-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729230/POCO_F8_PRO_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729230/POCO_F8_PRO_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729232/POCO_F8_PRO_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729234/POCO_F8_PRO_3.webp'
    ]
  },
  // POCO F8 Ultra
  'poco-f8-ultra-256gb-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729239/POCO_F8_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729241/POCO_F8_ULTRA_3.jpg'
    ]
  },
  'poco-f8-ultra-256gb-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729239/POCO_F8_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729241/POCO_F8_ULTRA_3.jpg'
    ]
  },
  'poco-f8-ultra-512gb-libre': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729239/POCO_F8_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729241/POCO_F8_ULTRA_3.jpg'
    ]
  },
  'poco-f8-ultra-512gb-reg': {
    image: 'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
    gallery: [
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729237/POCO_F8_ULTRA_1.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729239/POCO_F8_ULTRA_2.webp',
      'https://res.cloudinary.com/qknps0t6/image/upload/v1792729241/POCO_F8_ULTRA_3.jpg'
    ]
  }
};

const allUpdates = { ...appleMap, ...pocoMap };

// Load productos via VM
const vm = require('vm');
const sandbox = {};
vm.runInNewContext(content + '; sandbox.productos = productos;', { sandbox });
const prods = sandbox.productos;

let updateCount = 0;
prods.forEach(p => {
  if (allUpdates[p.id]) {
    p.image = allUpdates[p.id].image;
    p.imagen = allUpdates[p.id].image;
    p.gallery = allUpdates[p.id].gallery;
    updateCount++;
  }
});

console.log(`Updated ${updateCount} products in memory.`);

// Serialize cleanly
const output = `/* ===================================================
   MACCELL - DATA / CATÁLOGO DE PRODUCTOS & ACCESORIOS
   Base de datos modular con rutas actualizadas
   =================================================== */

const productos = ${JSON.stringify(prods, null, 2)};

// Exponer en window y exportar si es entorno Node/CommonJS
if (typeof window !== 'undefined') {
  window.productos = productos;
  window.PRODUCTS_DATA = productos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productos };
}
`;

fs.writeFileSync(productsFilePath, output, 'utf8');
console.log('Successfully wrote updated data/products.js');
