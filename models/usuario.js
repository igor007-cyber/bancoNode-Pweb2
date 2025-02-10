'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario',
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
      senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      tipo: {
        type: DataTypes.TINYINT, // Melhor para representar booleano em MySQL
        allowNull: false,
        defaultValue: 0, // 0 = usuário comum, 1 = admin
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuario', // Garante o nome correto da tabela
      timestamps: true, // createdAt e updatedAt
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Cliente, { foreignKey: 'idUsuario' });
  };

  return Usuario;
};
