const fs = require('fs');

const rawHonorUrls = `
https://res.cloudinary.com/qknps0t6/image/upload/v1792797020/Honor_logo_clean.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792797019/HONOR_X9D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797018/HONOR_X9D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797017/HONOR_X9D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797016/HONOR_X8D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797014/HONOR_X8D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797014/HONOR_X8D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797012/HONOR_X7E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797011/HONOR_X7E_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797010/HONOR_X7E_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797009/HONOR_X7D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797008/HONOR_X7D_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797007/HONOR_X7D_1.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792797005/HONOR_X6E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797004/HONOR_X6E_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797003/HONOR_X6E_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792797002/HONOR_X6D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797001/HONOR_X6D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792797000/HONOR_X6D_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796999/HONOR_X5D_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796998/HONOR_X5D_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796997/HONOR_X5D_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796996/HONOR_X5C_PLUS_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796995/HONOR_X5C_PLUS_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796993/HONOR_X5C_PLUS_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796992/HONOR_X5C_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796991/HONOR_X5C_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796990/HONOR_X5C_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796989/HONOR_WIN_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796988/HONOR_WIN_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796987/HONOR_WIN_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796985/HONOR_PLAY_20A_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796985/HONOR_PLAY_20A_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796983/HONOR_PLAY_20A_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796982/HONOR_PLAY_10_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796981/HONOR_PLAY_10_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796979/HONOR_PLAY_10_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796978/HONOR_MAGIC_8_PRO.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796976/HONOR_MAGIC_8_PRO_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796975/HONOR_MAGIC_8_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796973/HONOR_MAGIC_8_PRO_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796972/HONOR_MAGIC_8_LITE_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796971/HONOR_MAGIC_8_LITE_5G_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796970/HONOR_MAGIC_8_LITE_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796969/Honor_logo.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792796966/HONOR_600E_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796965/HONOR_600E_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796964/HONOR_600E_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796963/HONOR_600_PRO_5G_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796961/HONOR_600_PRO_5G_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796960/HONOR_600_PRO_5G_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796959/HONOR_600_3.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796958/HONOR_600_2.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796957/HONOR_600_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796956/HONOR_400_PRO_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796955/HONOR_400_PRO_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796952/HONOR_400_LITE_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796954/HONOR_400_PRO_1.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796951/HONOR_400_LITE_2.png
https://res.cloudinary.com/qknps0t6/image/upload/v1792796944/HONOR_400_LITE_1.webp
https://res.cloudinary.com/qknps0t6/image/upload/v1792796929/HONOR_400_3.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796928/HONOR_400_2.jpg
https://res.cloudinary.com/qknps0t6/image/upload/v1792796928/HONOR_400_1.webp
`;

const urls = rawHonorUrls.trim().split('\n').map(s => s.trim()).filter(Boolean);
console.log('Total Honor URLs provided:', urls.length);

const localHonorFiles = fs.existsSync('assets/img/brands/Honor') ? fs.readdirSync('assets/img/brands/Honor') : [];
console.log('Total local Honor files:', localHonorFiles.length);

const code = fs.readFileSync('data/products.js', 'utf8');
const prods = new Function(code + '; return productos;')();
const honorProds = prods.filter(p => p.marca?.toLowerCase() === 'honor' || p.category?.toLowerCase() === 'honor');

console.log('Total Honor products in products.js:', honorProds.length);
honorProds.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] ${p.nombre} (Img: ${p.imagen})`);
});
