'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carrinho extends Model {
    static associate(models) {
      // Um Carrinho tem muitos Produtos através de ProdutoHasCarrinho
      Carrinho.hasMany(models.Produto, {
        through: models.ProdutoHasCarrinho,
        foreignKey: 'idCarrinho',
        as: 'produtos'
      });
    }
  }

  Carrinho.init({
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Carrinho',
    tableName: 'carrinhos',
    timestamps: false
  });

  return Carrinho;
};
