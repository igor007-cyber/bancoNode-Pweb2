'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // Um Cliente pertence a um Usuario
      Cliente.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });

      // Um Cliente pode ter muitos Pedidos
      Cliente.hasMany(models.Pedido, {
        foreignKey: 'idCliente',
        as: 'pedidos'
      });
    }
  }

  Cliente.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};
