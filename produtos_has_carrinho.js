'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProdutosHasCarrinho extends Model {
    static associate(models) {
      
      this.belongsTo(models.Produto, {
        foreignKey: 'idproduto',
        as: 'produto'
      });

      
      this.belongsTo(models.Carrinho, {
        foreignKey: 'idcarrinho',
        as: 'carrinho'
      });
    }
  }

  ProdutosHasCarrinho.init(
    {
      idproduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos', 
          key: 'id'
        }
      },
      idcarrinho: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carrinhos',
          key: 'id'
        }
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ProdutosHasCarrinho',
      tableName: 'produtos_has_carrinho',
      timestamps: false
    }
  );

  return ProdutosHasCarrinho;
};
