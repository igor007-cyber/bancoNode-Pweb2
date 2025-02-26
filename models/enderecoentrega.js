'use strict';
import { Model}  from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class EnderecoEntrega extends Model {
    static associate(models) {

      EnderecoEntrega.belongsTo(models.Cliente, {
        foreignKey: 'idCliente', 
        as: 'cliente'
      });
    }
  }

  EnderecoEntrega.init({
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    idCliente: { 
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EnderecoEntrega',
    tableName: 'EnderecoEntregas', 
    timestamps: false
  });

  return EnderecoEntrega;
};
