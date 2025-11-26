import fs from "fs";

const filePath = "./src/data/juguetes.json"; // ruta correcta

const content = fs.readFileSync(filePath, "utf8");
const updated = content.replace(/\.(jpg|jpeg|png)/gi, ".webp");
fs.writeFileSync(filePath, updated, "utf8");

console.log(`✅ Actualizado ${filePath}`);
