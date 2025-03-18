'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const senhaCriptografada = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Felipe',
        email: 'felipe@gmail.com',
        senha: senhaCriptografada,
        tipo: "admin"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
