const fs = require("fs");
const path = require("path");

console.log("=== CHECK GLOBAL BACKEND ===\\n");

const basePath = "./backend";

const routesDir = path.join(basePath, "routes");
const controllersDir = path.join(basePath, "controllers");
const modelsDir = path.join(basePath, "models");

const checkExport = (filePath, type) => {
  try {
    const mod = require(filePath);
    if (type === "router") {
      if (typeof mod !== "function" || !mod.stack) {
        console.log(`✖ ${filePath} - ne retourne PAS un router`);
      } else {
        console.log(`✔ ${filePath} - router OK`);
      }
    } else if (type === "controller") {
      if (typeof mod !== "object") {
        console.log(`✖ ${filePath} - contrôleur incomplet`);
      } else {
        console.log(`✔ ${filePath} - contrôleur OK`);
      }
    } else if (type === "model") {
      if (typeof mod !== "function") {
        console.log(`✖ ${filePath} - modèle invalide`);
      } else {
        console.log(`✔ ${filePath} - modèle OK`);
      }
    }
  } catch (err) {
    console.log(`✖ ${filePath} - erreur ou fichier manquant : ${err.message}`);
  }
};

console.log("--- Vérification des routes ---");
fs.readdirSync(routesDir)
  .filter((f) => f.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(routesDir, file);
    checkExport(filePath, "router");
  });

console.log("\\n--- Vérification des contrôleurs ---");
fs.readdirSync(controllersDir)
  .filter((f) => f.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(controllersDir, file);
    checkExport(filePath, "controller");
  });

console.log("\\n--- Vérification des modèles ---");
fs.readdirSync(modelsDir)
  .filter((f) => f.endsWith(".js"))
  .forEach((file) => {
    const filePath = path.join(modelsDir, file);
    checkExport(filePath, "model");
  });

console.log("\\n=== FIN DU CHECK ===");
