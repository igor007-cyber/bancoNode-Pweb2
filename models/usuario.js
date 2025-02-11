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
          type: DataTypes.TINYINT, 
          allowNull: false,
          defaultValue: 0, 
        },
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuario', 
        timestamps: true,
      }
    );

    Usuario.associate = (models) => {
      Usuario.hasOne(models.Cliente, { foreignKey: 'idUsuario' });
    };

    return Usuario;
  };
