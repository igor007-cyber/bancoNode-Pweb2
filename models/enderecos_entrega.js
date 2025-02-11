'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const EnderecoEntrega = sequelize.define('EnderecoEntrega', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clienteId: { 
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
    }, {
        sequelize,
        modelName: 'EnderecoEntrega',
        tableName: 'enderecos_entrega', // Define o nome correto da tabela no BD
        timestamps: true, 
    });

    EnderecoEntrega.associate = (models) => {
        EnderecoEntrega.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
    };

    return EnderecoEntrega;
};
