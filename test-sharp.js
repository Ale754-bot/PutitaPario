import fs from "fs";
import sharp from "sharp";

const dirPath = "./public/images/juguetes"; // carpeta de prueba
const files = fs.readdirSync(dirPath).filter(f => /\.(jpe?g|png)$/i.test(f));

files.forEach(file => {
  const input = `${dirPath}/${file}`;
  const output = input.replace(/\.(jpe?g|png)$/i, ".webp"); // genera versión .webp

  sharp(input)
    .webp({ quality: 80 })
    .toFile(output)
    .then(() => console.log(`✅ Optimizado ${file}`))
    .catch(err => console.error(`❌ Error en ${file}:`, err));
});
