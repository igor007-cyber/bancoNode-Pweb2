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

  