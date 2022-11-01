// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const atletaModels = require('./atletaModels')
const medicoModels = require('./medicoModels')

const examesModels = database.define('exames', {
    idexame:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    pdf : Sequelize.BLOB('long'),
    tipo : Sequelize.STRING(100),
    descricao : Sequelize.TEXT,
    data_ex : Sequelize.DATE,
    situacao : Sequelize.ENUM('CONCLUIDO', 'EM ANALISE', 'PENDENTE'),
    observacao : Sequelize.TEXT,
    id_exame_atl : {
        type : Sequelize.INTEGER(4),
        references : {
            model : atletaModels,
            key : 'idatleta'
        }
    },
    id_exame_med : {
        type : Sequelize.INTEGER(4),
        references : {
            model : medicoModels,
            key : 'idmedico'
        }
    }
})

database.sync()

module.exports = examesModels