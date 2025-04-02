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
   