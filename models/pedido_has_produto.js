'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido_has_produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedido_has_produto.init({
    idpedido: DataTypes.INTEGER,
    idproduto: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco_unitario: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'pedido_has_produto',
  });
  return pedido_has_produto;
};