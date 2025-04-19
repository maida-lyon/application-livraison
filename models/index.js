const User = require("./User");
const Vehicule = require("./Vehicule");

// Associations
User.hasMany(Vehicule, { foreignKey: "UserId", onDelete: "CASCADE" });
Vehicule.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });

module.exports = {
  User,
  Vehicule,
};
