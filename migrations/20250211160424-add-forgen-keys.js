'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a chave estrangeira de Cliente para Usuario
    await queryInterface.addColumn('Clientes', 'idUsuario', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // Certifique-se de que o nome está correto no banco de dados
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Adiciona a chave estrangeira de Enderecos_Entrega para Cliente
    await queryInterface.addColumn('Enderecos_Entrega', 'Cliente_idCliente', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Adiciona a chave estrangeira de Produto para Carrinho (relação muitos-para-muitos)
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

    // Adiciona a chave estrangeira de Produto para Pedido (relação muitos-para-muitos)
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
    await queryInterface.removeColumn('Clientes', 'idUsuario');
    await queryInterface.removeColumn('Enderecos_Entrega', 'Cliente_idCliente');
    await queryInterface.removeColumn('produtos_has_Carrinho', 'produtos_idproduto');
    await queryInterface.removeColumn('pedido_has_produtos', 'produto_idproduto');
  }
};
