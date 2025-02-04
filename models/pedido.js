'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedido.init({
    data_pedido: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    valor_total: DataTypes.FLOAT,
    data_envio: DataTypes.DATE,
    data_status: DataTypes.DATE,
    Cliente_idCliente: DataTypes.INTEGER,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pedido',
  });
  return pedido;
};