'use strict';
import { Model}  from 'sequelize';

export default (sequelize, DataTypes) =>{
  class Carrinho extends Model {
    static associate(models) {
      
      Carrinho.belongsToMany(models.Produto, {
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
