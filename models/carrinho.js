'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Carrinho = sequelize.define('Carrinho', {
        idCarrinho: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data_criacao: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Carrinho.associate = (models) => {
        Carrinho.hasMany(models.Produto, {
            through: models.produtos_has_Carrinho,
            foreignKey: 'idCarrinho'
        });
    };

    return Carrinho;
};