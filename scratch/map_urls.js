const fs = require('fs');

const rawUrls = `
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_17_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_15C_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795880/REDMI_15C_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/REDMI_15C_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/REDMI_15_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_17_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_PLUS_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/Xioami_18_pro_max.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795879/NOTE_15_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_transparent.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_4G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_PRO_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/Xiaomi_logo_clean.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_mi_17_3.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/xiaomi_mi_17_4.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795878/NOTE_15_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/NOTE_15_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_13_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/xiaomi_mi_17_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_15_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_15_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/REDMI_13_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/xiaomi_mi_17_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/NOTE_17_PRO_MAX_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/XIAOMI_17T_PRO_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795877/NOTE_17_PRO_MAX_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/REDMI_13_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_15_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_3.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_PRO_MAX_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/XIAOMI_17T_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795876/NOTE_17_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/XIAOMI_17T_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_14_PRO_PLUS_5G_1.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/XIAOMI_17T_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_4.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/REDMI_A7_PRO_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/MI_17_ULTRA_4.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/MI_17_ULTRA_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795875/NOTE_12_PRO_PLUS_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/NOTE_12_PRO_PLUS_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A7_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_17_ULTRA_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A7_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_17_ULTRA_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_15T_PRO_5G_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A5_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/MI_12_LITE_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795874/REDMI_A5_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_PRO_5G_2.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/REDMI_A5_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_12_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_PRO_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/REDMI_17_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_12_5G_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/NOTE_17_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792795873/MI_15T_5G_3.jpg
`;

const urls = rawUrls.trim().split('\n').map(u => u.trim()).filter(Boolean);
console.log('Total URLs parsed:', urls.length);

const localFiles = fs.readdirSync('assets/img/brands/Xiaomi');
console.log('Total local files:', localFiles.length);

const urlMap = {};
urls.forEach(u => {
  const filename = u.substring(u.lastIndexOf('/') + 1);
  urlMap[filename] = u;
});

console.log('URL keys count:', Object.keys(urlMap).length);
console.log('Keys:', Object.keys(urlMap));
