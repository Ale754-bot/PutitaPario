import fs from "fs";
import path from "path";

const jsonDir = "./src/data";

// Reemplaza extensiones en cada archivo JSON
function updateJsonFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const updated = content.replace(/\.(jpg|jpeg|png)/gi, ".webp");
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`✅ Actualizado ${filePath}`);
}

// Recorre todos los JSON en la carpeta
fs.readdirSync(jsonDir).forEach(file => {
  if (file.endsWith(".json")) {
    const filePath = path.join(jsonDir, file);
    updateJsonFile(filePath);
  }
});
