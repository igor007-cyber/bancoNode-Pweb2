'use strict';
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Cliente, {
        foreignKey: 'idUsuario',
        as: 'clientes'
      });
    }
  }

  Usuario.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validação para garantir que seja um e-mail válido
        },
      },
      tipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: false,

      hooks: {
        beforeCreate: async (usuario) => {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('senha')) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
          }
        }
      }
    }
  );

  return Usuario;
};
