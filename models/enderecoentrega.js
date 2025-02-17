'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EnderecoEntrega extends Model {
    static associate(models) {
      // Um EnderecoEntrega pertence a um Cliente
      EnderecoEntrega.belongsTo(models.Cliente, {
        foreignKey: 'idCliente', // Alterado de 'idPedido' para 'idCliente'
        as: 'cliente'
      });
    }
  }

  EnderecoEntrega.init({
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    idCliente: { // Alterado de 'idPedido' para 'idCliente'
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EnderecoEntrega',
    tableName: 'EnderecoEntregas', // Certifique-se de que o nome da tabela está correto
    timestamps: false
  });

  return EnderecoEntrega;
};
