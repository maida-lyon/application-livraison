// start-dev.js
const path = require("path");

// Charger .env
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("🚀 Lancement du serveur en mode développement...\n");

// ✅ Corriger le chemin vers server.js
const serverPath = path.resolve(__dirname, "backend", "server.js");

require(serverPath);
