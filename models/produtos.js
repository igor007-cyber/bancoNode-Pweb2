'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        idProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qtd_estoque: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Produto.associate = (models) => {
        Produto.hasMany(models.Carrinho, {
            through: models.produtos_has_Carrinho,
            foreignKey: 'produtos_idproduto'
        });        
        Produto.hasMany(models.Pedido, {
            through: models.pedido_has_produtos,
            foreignKey: 'produto_idproduto'
        });
    };

    return Produto;
};
