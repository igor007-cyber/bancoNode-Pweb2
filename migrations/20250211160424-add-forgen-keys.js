'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('enderecos_entrega', 'Cliente_idCliente', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('produtos_has_Carrinho', 'produtos_idproduto', {
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
    await queryInterface.removeColumn('enderecos_entrega', 'Cliente_idCliente');
    await queryInterface.removeColumn('produtos_has_Carrinho', 'produtos_idproduto');
    await queryInterface.removeColumn('pedido_has_produtos', 'produto_idproduto');
  }
};
