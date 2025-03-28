'use strict';
import { Model}  from 'sequelize';

export default (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
     
      Produto.belongsToMany(models.Pedido, {
        through: models.PedidoHasProduto,
        foreignKey: 'idProduto',
        as: 'pedidos'
      });

      
      Produto.belongsToMany(models.Carrinho, {
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
  
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos',
    timestamps: false
  });

  return Produto;
};
