const express = require("express");
const router = express.Router();

// === IMPORTS DES ROUTES ===
const userRoutes = require("./user.routes");
const vehiculeRoutes = require("./vehicule.routes");
const commandeRoutes = require("./commande.routes");
const matchingRoutes = require("./matching.routes");
const documentRoutes = require("./document.routes");
const entrepriseRoutes = require("./entreprise.routes");
const litigeRoutes = require("./litige.routes");
const photoRoutes = require("./photo.routes");
const paiementRoutes = require("./paiement.routes");
const chatbotRoutes = require("./chatbot.routes");
const invoiceRoutes = require("./invoice.routes");
const adresseRoutes = require("./adresse.routes");
const trackingRoutes = require("./tracking.routes");

// === DEBUG (type vérification) ===
console.log("typeof userRoutes =", typeof userRoutes);
console.log("typeof vehiculeRoutes =", typeof vehiculeRoutes);
console.log("typeof commandeRoutes =", typeof commandeRoutes);
console.log("typeof matchingRoutes =", typeof matchingRoutes);
console.log("typeof documentRoutes =", typeof documentRoutes);
console.log("typeof entrepriseRoutes =", typeof entrepriseRoutes);
console.log("typeof litigeRoutes =", typeof litigeRoutes);
console.log("typeof photoRoutes =", typeof photoRoutes);
console.log("typeof paiementRoutes =", typeof paiementRoutes);
console.log("typeof chatbotRoutes =", typeof chatbotRoutes);
console.log("typeof invoiceRoutes =", typeof invoiceRoutes);
console.log("typeof adresseRoutes =", typeof adresseRoutes);
console.log("typeof trackingRoutes =", typeof trackingRoutes);

// === UTILISATION DES ROUTES ===
router.use("/users", userRoutes);
router.use("/vehicules", vehiculeRoutes);
router.use("/commandes", commandeRoutes);
router.use("/matchings", matchingRoutes);
router.use("/documents", documentRoutes);
router.use("/entreprises", entrepriseRoutes);
router.use("/litiges", litigeRoutes);
router.use("/photos", photoRoutes);
router.use("/paiements", paiementRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/adresses", adresseRoutes);
router.use("/tracking", trackingRoutes);
router.use("/signatures", require("./signature.routes"));
router.use("/workflows", require("./workflow.routes"));
router.use("/notifications", require("./notification.routes"));

// === ROUTE DE TEST RACINE ===
router.get("/", (req, res) => {
  res.send("API Application Livraison opérationnelle");
});

router.get("/ping", (req, res) => {
  res.json({ message: "✅ Backend opérationnel" });
});

module.exports = router;
