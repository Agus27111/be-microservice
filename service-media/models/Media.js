"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Media",
      tableName: "media",
      timestamps: false, // Nonaktifkan timestamps
    }
  );

  return Media;
};
