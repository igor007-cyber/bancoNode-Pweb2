'use strict';
import { Model}  from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
     
      Produto.hasMany(models.Pedido, {
        through: models.PedidoHasProduto,
        foreignKey: 'idProduto',
        as: 'pedidos'
      });

      
      Produto.hasMany(models.Carrinho, {
        through: models.ProdutoHasCarrinho,
        foreignKey: 'idProduto',
        as: 'carrinhos'
      });
    }
  }

  Produto.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoria: DataTypes.STRING,
    qtd_estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    timestamps: false
  });

  return Produto;
};
