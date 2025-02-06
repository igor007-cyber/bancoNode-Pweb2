'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data_pedido: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        valor_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        data_envio: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        data_status: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Cliente_idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Pedido.associate = (models) => {
        Pedido.belongsTo(models.Cliente, { foreignKey: 'Cliente_idCliente' });
    }

    return Pedido;
}
