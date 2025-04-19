const fs = require('fs');
const path = require('path');

console.log('=== RESTAURATION DU BACKEND ===');

// Création des dossiers
['models', 'controllers', 'routes'].forEach(dir => {
const full = `backend/${dir}`;
if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
console.log(`✔ Dossier ${dir} prêt`);
});

// Modèles
const models = {
User: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = db.define('User', {
nom: DataTypes.STRING,
email: { type: DataTypes.STRING, unique: true },
telephone: DataTypes.STRING,
adresse: DataTypes.STRING,
role: DataTypes.STRING,
statutEnLigne: { type: DataTypes.BOOLEAN, defaultValue: false }
});
module.exports = User;`,

Vehicule: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Vehicule = db.define('Vehicule', {
marque: DataTypes.STRING,
modele: DataTypes.STRING,
immatriculation: DataTypes.STRING,
type: DataTypes.STRING
});
module.exports = Vehicule;`,

Commande: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Commande = db.define('Commande', {
type: DataTypes.STRING,
adresseDepart: DataTypes.STRING,
adresseArrivee: DataTypes.STRING,
poids: DataTypes.FLOAT,
volume: DataTypes.FLOAT,
statut: DataTypes.STRING
});
module.exports = Commande;`,

Matching: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Matching = db.define('Matching', {
type: DataTypes.STRING,
prix: DataTypes.FLOAT,
statut: DataTypes.STRING
});
module.exports = Matching;`,

Document: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Document = db.define('Document', {
type: DataTypes.STRING,
url: DataTypes.STRING,
statut: DataTypes.STRING,
raisonRefus: DataTypes.STRING
});
module.exports = Document;`,

Entreprise: `const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Entreprise = db.define('Entreprise', {
nom: DataTypes.STRING,
siret: DataTypes.STRING,
adresse: DataTypes.STRING
});
module.exports = Entreprise;`
};

for (const [name, code] of Object.entries(models)) {
fs.writeFileSync(`backend/models/${name}.js`, code);
console.log(`✔ Modèle ${name}.js recréé`);
}

// Contrôleurs
const baseController = name => `
const ${name} = require('../models/${name}');

exports.getAll = async (req, res) => {
const data = await ${name}.findAll();
res.json(data);
};

exports.create = async (req, res) => {
const item = await ${name}.create(req.body);
res.json(item);
};
`;

['User','Vehicule','Commande','Matching','Document','Entreprise'].forEach(name => {
fs.writeFileSync(`backend/controllers/${name.toLowerCase()}.controller.js`, baseController(name));
console.log(`✔ Contrôleur ${name}.js recréé`);
});

// Routes
const baseRoute = name => `
const express = require('express');
const router = express.Router();
const controller = require('../controllers/${name}.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;
`;

['user','vehicule','commande','matching','document','entreprise'].forEach(name => {
fs.writeFileSync(`backend/routes/${name}.routes.js`, baseRoute(name));
console.log(`✔ Route ${name}.routes.js recréée`);
});

// routes/index.js
fs.writeFileSync('backend/routes/index.js', `
const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const vehiculeRoutes = require("./vehicule.routes");
const commandeRoutes = require("./commande.routes");
const matchingRoutes = require("./matching.routes");
const documentRoutes = require("./document.routes");
const entrepriseRoutes = require("./entreprise.routes");

router.use("/users", userRoutes);
router.use("/vehicules", vehiculeRoutes);
router.use("/commandes", commandeRoutes);
router.use("/matchings", matchingRoutes);
router.use("/documents", documentRoutes);
router.use("/entreprises", entrepriseRoutes);

router.get("/", (req, res) => {
res.send("API Application Livraison opérationnelle");
});

module.exports = router;
`);
console.log('✔ routes/index.js restauré');

// server.js
fs.writeFileSync('backend/server.js', `
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('./routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

require('./models/User');
require('./models/Vehicule');
require('./models/Commande');
require('./models/Matching');
require('./models/Document');
require('./models/Entreprise');

const PORT = process.env.PORT || 5000;

(async () => {
try {
await db.authenticate();
console.log('PostgreSQL connecté');
await db.sync({ force: true });
console.log('Tables recréées');
app.listen(PORT, () => console.log('Serveur lancé sur le port', PORT));
} catch (err) {
console.error('Erreur serveur :', err);
}
})();
`);
console.log('✔ backend/server.js recréé');

console.log('\n=== BACKEND RESTAURÉ AVEC SUCCÈS ===');