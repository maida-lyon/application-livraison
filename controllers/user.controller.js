const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { nom, email, telephone, motdepasse, role } = req.body;
  if (!nom || !email || !telephone || !motdepasse || !role) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email déjà utilisé" });
  }

  const hashed = await bcrypt.hash(motdepasse, 10);
  const newUser = await User.create({
    nom,
    email,
    telephone,
    motdepasse: hashed,
    role,
  });

  res.status(201).json({ message: "✅ Utilisateur créé", user: newUser });
};

exports.loginUser = async (req, res) => {
  const { email, motdepasse } = req.body;
  if (!email || !motdepasse) {
    return res.status(400).json({ message: "Email ou mot de passe manquant" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Utilisateur inconnu" });

  const match = await bcrypt.compare(motdepasse, user.motdepasse);
  if (!match)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true si HTTPS
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Connexion OK", role: user.role, id: user.id });
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnecté" });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["motdepasse"] },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur getProfile", erreur: err.message });
  }
};
