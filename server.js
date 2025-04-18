const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:3002",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", routes);

require("./models/User");
require("./models/Entreprise");
require("./models/Commande");
require("./models/Document");
require("./models/Vehicule");
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

    await db.sync({ alter: true });
    console.log("✅ Tables synchronisées avec succès");

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur DB :", error);
  }
})();
