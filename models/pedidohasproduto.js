'use strict';
import { Model}  from 'sequelize';

export default (sequelize, DataTypes) => {
  class PedidoHasProduto extends Model {
    static associate(models) {
      // Um PedidoHasProduto pertence a um Pedido
      PedidoHasProduto.belongsTo(models.Pedido, {
        foreignKey: 'idPedido',
        as: 'pedido'
      });

      // Um PedidoHasProduto pertence a um Produto
      PedidoHasProduto.belongsTo(models.Produto, {
        foreignKey: 'idProduto',
        as: 'produto'
      });
    }
  }

  PedidoHasProduto.init({
    idPedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProduto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PedidoHasProduto', 
    tableName: 'pedidohasprodutos',
    timestamps: true
  });
 
  return PedidoHasProduto;
};
