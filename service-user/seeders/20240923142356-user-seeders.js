"use strict";

const bycrypt = require("bcryptjs");
// @type {import('sequelize-cli').Migration}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "agus",
          profession: "Admin Micro",
          role: "admin",
          email: "admin@example.com",
          password: bycrypt.hashSync("agus123", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "setiawan",
          profession: "frontend developer",
          role: "student",
          email: "student@example.com",
          password: bycrypt.hashSync("agus1234", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
