'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    // tabela intermediária entre Pedido e Produto
    const PedidoHasProduto = sequelize.define('PedidoHasProduto', {
       
        idpedido: {
            type: DataTypes.INTEGER,
            allowNull: false, // Não pode ser nulo, pois faz parte da chave primária composta
            primaryKey: true, // Chave primária composta
            references: {
                model: 'Pedidos', 
                key: 'id'
            }
        },
        
        idproduto: {
            type: DataTypes.INTEGER,
            allowNull: false, // Não pode ser nulo, pois faz parte da chave primária composta
            primaryKey: true, // Chave primária composta
            references: {
                model: 'Produtos', 
                key: 'id'
            }
        },
        // Quantidade de um determinado produto dentro de um pedido
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 1, // Se não for informado, assume 1
            validate: {
                min: 1 
            }
        },
        // Preço unitário do produto no momento do pedido
        preco_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false, // O preço deve sempre estar definido
            validate: {
                min: 0 
            }
        }
    }, {
        tableName: 'pedido_has_produto', 
        timestamps: false 
    });

    // Definição das associações com os modelos Pedido e Produto
    PedidoHasProduto.associate = (models) => {  
        // Associação com Pedido (um pedido pode conter vários produtos)
        PedidoHasProduto.belongsTo(models.Pedido, {
            foreignKey: 'idpedido',
            as: 'pedido'
        });

        // Associação com Produto (um produto pode estar em vários pedidos)
        PedidoHasProduto.belongsTo(models.Produto, {
            foreignKey: 'idproduto',
            as: 'produto'
        });
    };

    return PedidoHasProduto;
};
