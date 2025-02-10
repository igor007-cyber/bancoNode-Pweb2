'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
      },
      rua: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'cliente',
      timestamps: true,
    }
  );

  Cliente.associate = (models) => {
    Cliente.belongsTo(models.Usuario, { foreignKey: 'idUsuario' });
    Cliente.hasMany(models.Pedido, { foreignKey: 'Cliente_idCliente' });
  };

  return Cliente;
};
