'use strict';
import { Model}  from 'sequelize';

module.exports = (sequelize, DataTypes) => {
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
