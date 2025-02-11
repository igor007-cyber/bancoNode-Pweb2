'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    // tabela intermediária entre Produtos e Carrinhos
    const ProdutosHasCarrinho = sequelize.define('ProdutosHasCarrinho', {
        // Chave estrangeira referenciando a tabela Produtos
        idproduto: {
            type: DataTypes.INTEGER,
            allowNull: false, // O produto deve sempre estar definido
            primaryKey: true, // Faz parte da chave primária composta
            references: {
                model: 'Produtos', 
                key: 'id'
            }
        },
        // Chave estrangeira referenciando a tabela Carrinhos
        idcarrinho: {
            type: DataTypes.INTEGER,
            allowNull: false, // O carrinho deve sempre estar definido
            primaryKey: true, // Faz parte da chave primária composta
            references: {
                model: 'Carrinhos', 
                key: 'id'
            }
        },
        // Quantidade do produto dentro do carrinho
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false, // A quantidade sempre deve ser informada
            defaultValue: 1, // Se não for informado, assume 1 como padrão
            validate: {
                min: 1 // Garante que a quantidade mínima seja 1
            }
        },
        // Preço unitário do produto no momento em que foi adicionado ao carrinho
        preco_unitario: {
            type: DataTypes.FLOAT, 
            allowNull: false, // O preço deve sempre estar definido
            validate: {
                min: 0 // Impede valores negativos
            }
        }
    }, {
        tableName: 'produtos_has_carrinho', // Nome da tabela no banco de dados
        timestamps: false 
    });

    // Definição das associações com os modelos Produto e Carrinho
    ProdutosHasCarrinho.associate = (models) => {
        // Associação com Produto (um produto pode estar em vários carrinhos)
        ProdutosHasCarrinho.belongsTo(models.Produto, {
            foreignKey: 'idproduto',
            as: 'produto'
        });

        // Associação com Carrinho (um carrinho pode conter vários produtos)
        ProdutosHasCarrinho.belongsTo(models.Carrinho, {
            foreignKey: 'idcarrinho',
            as: 'carrinho'
        });
    };

    return ProdutosHasCarrinho;
};
