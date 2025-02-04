'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enderecos_entrega extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enderecos_entrega.init({
    Cliente_idCliente: DataTypes.INTEGER,
    endereco: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enderecos_entrega',
  });
  return Enderecos_entrega;
};