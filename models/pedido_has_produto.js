'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PedidoHasProduto = sequelize.define('PedidoHasProduto', {
        idpedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Pedidos', 
                key: 'id'
            }
        },
        idproduto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Produtos',
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
        tableName: 'pedido_has_produto',
        timestamps: false
    });

    PedidoHasProduto.associate = (models) => {
        // Associação com Pedido (Muitos para Muitos)
        PedidoHasProduto.belongsTo(models.Pedido, {
            foreignKey: 'idpedido',
            as: 'pedido'
        });

        // Associação com Produto (Muitos para Muitos)
        PedidoHasProduto.belongsTo(models.Produto, {
            foreignKey: 'idproduto',
            as: 'produto'
        });
    };

    return PedidoHasProduto;
};
