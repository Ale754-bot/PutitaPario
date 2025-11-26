import fs from "fs";
import sharp from "sharp";

const baseDir = "./public/images";

// Recorre todas las subcarpetas dentro de public/images
const folders = fs.readdirSync(baseDir);

folders.forEach(folder => {
  const dirPath = `${baseDir}/${folder}`;
  const files = fs.readdirSync(dirPath).filter(f => /\.(jpe?g|png)$/i.test(f));

  files.forEach(file => {
    const input = `${dirPath}/${file}`;
    const output = input.replace(/\.(jpe?g|png)$/i, ".webp");

    sharp(input)
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => console.log(`✅ Optimizado ${folder}/${file}`))
      .catch(err => console.error(`❌ Error en ${folder}/${file}:`, err));
  });
});
