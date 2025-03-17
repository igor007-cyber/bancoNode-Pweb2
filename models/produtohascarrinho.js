'use strict';
import { Model}  from 'sequelize';

export default (sequelize, DataTypes) => {
  class ProdutoHasCarrinho extends Model {
    static associate(models) {
      // Um ProdutoHasCarrinho pertence a um Produto
      ProdutoHasCarrinho.belongsTo(models.Produto, {
        foreignKey: 'idProduto',
        as: 'produto'
      });

      // Um ProdutoHasCarrinho pertence a um Carrinho
      ProdutoHasCarrinho.belongsTo(models.Carrinho, {
        foreignKey: 'idCarrinho',
        as: 'carrinho'
      });
    }
  }

  ProdutoHasCarrinho.init({
    idProduto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idCarrinho: {
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
    modelName: 'ProdutoHasCarrinho',
    tableName: 'produtos_has_carrinhos',
    timestamps: false
  });

  return ProdutoHasCarrinho;
};
