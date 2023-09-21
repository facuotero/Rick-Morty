const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("Favorite", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("Alive", "Dead", "unknown"),
      allowNull: false,
    },
    species: {
      type: DataTypes.ENUM("Femaile", "Male", "Genderless", "unknown"),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
