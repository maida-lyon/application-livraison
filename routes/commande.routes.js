const express = require("express");
const router = express.Router();
const { creerCommande } = require("../controllers/commande.controller");

router.post("/", creerCommande);

module.exports = router;
