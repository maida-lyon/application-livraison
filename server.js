const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();

// ✅ Route test pour Render (évite 502)
app.get("/", (req, res) => {
  res.send("✅ DeliverApp backend is LIVE !");
});

const corsOptions = {
  origin: "*", // remplace plus tard par ton frontend vercel
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", routes);

// ✅ Models & associations centralisées
require("./models"); // ← gère User ↔ Vehicule

require("./models/Entreprise");
require("./models/Commande");
require("./models/Document");
require("./models/Matching");
require("./models/Litige");
require("./models/Photo");
require("./models/Paiement");
require("./models/RIB");
require("./models/Adresse");
require("./models/Signature");
require("./models/Workflow");
require("./models/Notification");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.authenticate();
    console.log("✅ PostgreSQL connecté");

    await db.sync({ alter: true }); // propre sans forcer
    console.log("✅ Tables synchronisées avec succès");

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur DB :", error);
  }
})();
