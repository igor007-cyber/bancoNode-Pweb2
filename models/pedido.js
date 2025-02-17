'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      // Um Pedido pertence a um Cliente
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'idCliente',
        as: 'cliente'
      });

      // Um Pedido tem muitos Produtos através de PedidoHasProduto
      Pedido.hasMany(models.Produto, {
        through: models.PedidoHasProduto,
        foreignKey: 'idPedido',
        as: 'produtos'
      });

      // Um Pedido pode ter um EnderecoEntrega
      Pedido.hasOne(models.EnderecoEntrega, {
        foreignKey: 'idPedido',
        as: 'enderecoEntrega'
      });
    }
  }

  Pedido.init({
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    data_envio: DataTypes.DATE,
    data_status: DataTypes.DATE,
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false
  });

  return Pedido;
};
