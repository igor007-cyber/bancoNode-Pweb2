'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const ProdutosHasCarrinho = sequelize.define('ProdutosHasCarrinho', {
        idproduto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Produtos', 
                key: 'id'
            }
        },
        idcarrinho: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Carrinhos',
                key: 'id'
            }
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        preco_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    }, {
        tableName: 'produtos_has_carrinho',
        timestamps: false
    });

    ProdutosHasCarrinho.associate = (models) => {
        // Associação com Produto (Muitos para Muitos)
        ProdutosHasCarrinho.belongsTo(models.Produto, {
            foreignKey: 'idproduto',
            as: 'produto'
        });

        // Associação com Carrinho (Muitos para Muitos)
        ProdutosHasCarrinho.belongsTo(models.Carrinho, {
            foreignKey: 'idcarrinho',
            as: 'carrinho'
        });
    };

    return ProdutosHasCarrinho;
};
