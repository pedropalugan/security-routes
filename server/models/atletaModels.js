// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const gestorModels = require('./gestorModels')


const atletaModels = database.define('atletas', {
    idatleta:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome : Sequelize.STRING(50),
    cpf : Sequelize.CHAR(11),
    email : Sequelize.STRING(100),
    senha : Sequelize.STRING(100),
    d_nasc : Sequelize.DATEONLY,
    sexo : Sequelize.ENUM('F', 'M'),
    categoria : Sequelize.STRING(30),
    posicao : Sequelize.STRING(40),
    cargo : Sequelize.STRING(30),
    modalidade : Sequelize.STRING(30),
    solicitacao : {
        type: Sequelize.ENUM('SOLICITADO', 'NÃO SOLICITADO'),
        defaultValue: 'NÃO SOLICITADO'
    },
    situacao : Sequelize.ENUM('APROVADO', 'EM ANÁLISE', 'REPROVADO'),
    id_gestor_atl : {
        type : Sequelize.INTEGER(4),
        references : {
            model : gestorModels,
            key : 'idgestor'
        }
    }
})

database.sync()

// Exportação do módulo
module.exports = atletaModels