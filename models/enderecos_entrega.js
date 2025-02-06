'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Enderecos_Entrega = sequelize.define('Enderecos_Entrega', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Cliente_idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Enderecos_Entrega.associate = (models) => {
        Enderecos_Entrega.belongsTo(models.Cliente, { foreignKey: 'Cliente_idCliente' });
    }

    return Enderecos_Entrega;
}
