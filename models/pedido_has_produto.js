'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PedidoHasProduto extends Model {
    static associate(models) {
      this.belongsTo(models.Pedido, { foreignKey: 'idpedido', as: 'pedido' });
      this.belongsTo(models.Produto, { foreignKey: 'idproduto', as: 'produto' });
    }
  }

  PedidoHasProduto.init(
    {
      idpedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Pedidos', 
          key: 'id'
        }
      },
      idproduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Produtos',
          key: 'id'
        }
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1
        }
      },
      preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'PedidoHasProduto',
      tableName: 'pedido_has_produto',
      timestamps: false
    }
  );

  return PedidoHasProduto;
};
