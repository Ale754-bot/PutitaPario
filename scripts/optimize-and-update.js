// scripts/optimize-and-update.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public/images");
const jsonDir = path.join(process.cwd(), "src/data"); // o la ruta real

async function optimizeImages(dir = imagesDir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 🔁 Si es carpeta, la recorro también
      await optimizeImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      const base = path.basename(file, ext);
      const webpFile = `${base}.webp`;
      const webpPath = path.join(dir, webpFile);

      if (fs.existsSync(webpPath)) continue;

      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        console.log(`🔄 Optimizing ${fullPath} → ${webpPath}`);
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
      }
    }
  }
}

// 2. Actualizar JSON con rutas .webp
function updateJSON() {
  const files = fs.readdirSync(jsonDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(jsonDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const ids = new Set();
    let hasDuplicate = false;

    const updated = data.map(item => {
      // Validar duplicados
      if (ids.has(item.id)) {
        console.warn(`⚠️ Duplicate ID found: ${item.id} in ${file}`);
        hasDuplicate = true;
      }
      ids.add(item.id);

      // Actualizar imagen si no está en .webp
      if (item.imagen && (item.imagen.endsWith(".jpg") || item.imagen.endsWith(".png"))) {
        const base = path.basename(item.imagen, path.extname(item.imagen));
        item.imagen = `/images/${base}.webp`;
      }
      return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`✅ Updated ${file}${hasDuplicate ? " (duplicates detected)" : ""}`);
  }
}

// 3. Ejecutar todo
(async () => {
  await optimizeImages();
  updateJSON();
  console.log("✨ All done! Images optimized and JSON updated.");
})();
