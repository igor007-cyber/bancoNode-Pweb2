'use strict';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default(sequelize, DataTypes) => {
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
          isEmail: true, // Validação para garantir q um e-mail válido
        },
      },
      tipo: {
        type: DataTypes.ENUM('admin', 'cliente'),
        defaultValue:'cliente',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: false,

      hooks: {
        beforeCreate: async (usuario) => {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed('senha')) {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
          }
        }
      }
    }
  );

  return Usuario;
};
