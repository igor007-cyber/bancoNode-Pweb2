'use strict';
import { Model}  from 'sequelize';

export default (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      
      Cliente.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });

      
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
      // validate: {
      //   is: /^[0-9]{10,11}$/i, // Apenas números (10 ou 11 dígitos)
      // },
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //   is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, // Formato XXX.XXX.XXX-XX
        // },
      },
      rua: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, 
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
      timestamps: false,
      hooks: {
        beforeCreate: (cliente) => {
          // Remove traços e pontos do CPF antes de salvar
          cliente.cpf = cliente.cpf.replace(/\D/g, '');
        },
      },
    });
  
    return Cliente;
  };
  