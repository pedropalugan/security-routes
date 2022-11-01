// Importar bibliotecas
const fs = require('fs'); // Variável que vai pegar o "fs"
const path = require('path'); // Variável que vai pegar a "path"
const bcrypt = require('bcrypt'); // Variável que vai pegar a criptografia

// Importar módulos
const database = require('../config/dbConfig'); // "database" é uma variável que vai receber as configurações do "dbConfig"
const atletaModels = require('../models/atletaModels'); // "atletaModels" é uma variável que vai receber o model do atleta
const examesModels = require("../models/exameModels"); // "exameModels" é uma variável que vai receber o model do exame


// Criando class "atletaControllers" para fazer o CRUD
class atletaControllers{

    // -------------------------- LISTAR DADOS DO USUÁRIO --------------------------
    static async listUsers(req, res){
        await database.sync(); // Conexão com o banco de dados
        let data = await atletaModels.findAll({raw : true}); // Listar dados sobre ele mesmo
        res.status(200).json(data); // Resposta para o usuário
    };

    // -------------------------- ALTERAR USUÁRIO --------------------------
    static async changeUser(req, res){
        let cpf = req.body.cpf; // Variável que vai armazenar o CPF

        // Criar a senha
        const salt = await bcrypt.genSalt(12); // Vai dificultar sua senha
        const passwordHash = await bcrypt.hash(req.body.password.toString(), salt); // Vai receber a senha do usuário e vai adicionar o "Salt"

        req.body.password = passwordHash; // vai passar a senha criptografada

        let dataUpdated = req.body; // Variável que vai receber os dados novos 

        await database.sync(); // Conexão com o banco de dados
        await atletaModels.update(dataUpdated, {where: {cpf: cpf}}); // Query de alteração
        res.status(200).send("Dados Atualizado!!"); // Resposta final
    };

    // -------------------------- VISUALIZAR EXAMES SOLICITADOS --------------------------
    static async viewFile(req, res){
        let id_atleta = req.params.id_atleta; // Pega o id do atleta
        await database.sync(); // Conexão com o banco de dados
        let request = await examesModels.findAll({
            raw : true,
            where:{
                id_exame_atl : id_atleta
            }
        }); // Request que vai permitir a visualização dos exames
        res.status(200).json({request}); // Resposta Final
    };

    // -------------------------- ENVIAR EXAMES --------------------------
    static async sendPdf(req, res){
        let id_atleta = req.params.id_atleta; // Pega o id do atleta

        let pdf = fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)); // Variável que pega o arquivo
        
        await database.sync(); // Conexão com o banco de dados
        await examesModels.update( // Realiza a alteração no banco de dados
            {pdf : pdf}, 
            {where:{id_exame_atl:id_atleta}}
        ); // Alterar dados do banco de dados
        res.status(200).json({msg:"Exame enviado com sucesso"}); // Retorno final
        fs.unlinkSync(path.join(__dirname, '../uploads/' + req.file.filename));
    };
};

// Exportar módulos 
module.exports = atletaControllers;
