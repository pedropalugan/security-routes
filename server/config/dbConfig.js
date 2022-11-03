// Importar biblioteca
const Sequelize = require('sequelize'); // Vai receber o sequelize

// Conectar com banco de dados
const database = new Sequelize('SESI','root','',{
    dialect: 'mysql',
    host:'localhost',
    port: 3308,
});

// Exportar módulo
module.exports = database;
