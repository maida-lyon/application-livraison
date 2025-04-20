const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commande.controller"); // ✅ obligatoire

router.post("/", commandeController.creerCommande);
router.get("/", commandeController.getAll);
router.get("/user/:id", commandeController.getByUser); // ✅ OK

module.exports = router;
