'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('produtos_has_carrinhos', 'produtos_idproduto', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Produtos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('pedido_has_produtos', 'produto_idproduto', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Produtos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('produtos_has_carrinhos', 'produtos_idproduto');
    await queryInterface.removeColumn('pedido_has_produtos', 'produto_idproduto');
  }
};
