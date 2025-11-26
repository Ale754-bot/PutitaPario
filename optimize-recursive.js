import fs from "fs";
import path from "path";
import sharp from "sharp";

const baseDir = "./public/images";

// Función recursiva que optimiza imágenes en una carpeta y sus subcarpetas
function optimizeFolder(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Si es subcarpeta, entrar recursivamente
      optimizeFolder(fullPath);
    } else if (/\.(jpe?g|png)$/i.test(item)) {
      // Si es imagen, convertir a webp
      const output = fullPath.replace(/\.(jpe?g|png)$/i, ".webp");

      sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => console.log(`✅ Optimizado ${fullPath}`))
        .catch(err => console.error(`❌ Error en ${fullPath}:`, err));
    }
  });
}

// Lanzar optimización desde la carpeta base
optimizeFolder(baseDir);
