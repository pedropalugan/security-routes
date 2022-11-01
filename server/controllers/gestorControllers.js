// Importar módulos
const bcrypt = require('bcrypt'); // Variável que vai pegar a criptografia
const database = require('../config/dbConfig'); // Variável que vai receber as configurações do "dbConfig"

// Módulo Gestor Admin
const gestorAdminModels = require('../models/gestorAdminModels'); // Variável que vai receber o model "gestorAdminModels"

// Módulo Gestor Padrão
const gestorModels = require('../models/gestorModels'); // Variável que vai receber o model "gestorModels"

// Módulo Médico
const medicoModels = require('../models/medicoModels'); // Variável que vai armazenar o model: "medicoModels"
const telMedicoModels = require('../models/telMedicoModels'); // Variável que vai armazenar o model: "telMedicoModels"
const enderecoMedicoModels = require('../models/enderecoMedicoModels'); // Variável que vai armazenar o model: "enderecoMedicoModels"

// Módulo Médico Convidade
const medicoConvModels = require('../models/medicoConvModels'); // Variável que vai armazenar o model do Médico convidado
const telMedConvModels = require('../models/telMedicoConvModels'); // Variável que vai armazenar o model telefone do Médico convidado
const endMedConvModels = require("../models/enderecoMedicoConvModels"); // Variável que vai armazenar o model endereço do Médico convidado

// Módulo Atleta
const atletaModels = require('../models/atletaModels'); // Variável que vai receber o model "atletaModels"
const enderecoAtletaModels = require("../models/enderecoAtletaModels"); // Variável que vai receber o model: "enderecoAtletaModels"
const telAtletaModels = require("../models/telAtletaModels"); // Variável que vai receber o model: "telAtletaModels"


const {Op} = require('sequelize');
const examesModels = require('../models/exameModels');

// Armazenar os Models
const perfil = {
    'Atleta' : [atletaModels, enderecoAtletaModels, telAtletaModels],
    'Gestor-Admin' : [gestorAdminModels],
    'Gestor': [gestorModels],
    'Médico': [medicoModels, telMedicoModels, enderecoMedicoModels],
    'Médico-Convidado' : [medicoConvModels, telMedConvModels, endMedConvModels],
}; // A const "perfil" vai armazenar todos os models. Com isso, conseguiremos diminuir a repetição do código 

// Criando class "gestorControllers" para fazer o CRUD
class gestorControllers{

    // -------------------------- LISTAR USUÁRIO --------------------------
    static async listData(req, res){

        let array = perfil[req.body.cargo]; 
        let array2 = [];

        (async function(){
            for (const elemento of array) {
                array2.push(await elemento.findAll({raw : true}))
            };
            res.status(201).json(array2);
        })();
    };  

    // -------------------------- CRIAR USUÁRIO --------------------------
    static async createUser(req, res){ // função "createUser" é uma função para criar usuário 

        let verification = true; // Vai verificar se o programa pode dar continuidade

        Object.keys(req.body).forEach(function eachKey(key) {  
            // Validação de todos os campos 
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null){
                verification = false // Vai atribuir o valor "false" para a variável
            };
        });

        if(verification == false){ // Se a variável "verification" for falsa
            return res.status(422).json({msg: 'Preencha todos os campos!'}); //  422 - O servidor entende a requisição mas os dados não estão corretos para processar
        }
        else{ // Caso a variável "verification" seja verdadeira 

            const {cpf, email} = req.body; // Essa const vai facilitar o chamado. Não precisaremos usar o req.body.campo para pegar o valor

            // Validação específica para o campo CPF
            if(!cpf || typeof cpf == undefined || cpf == null || cpf.toString().length != 11 || typeof cpf != 'number'){ 
                return res.status(422).json({msg: 'CPF inválido'}); // Retorna a resposta para o usuário
            };
    
            // Realizar a query para verificar se existe um usuário com esse cpf cadastrado 
            const managerAdminExists = await gestorAdminModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}}); // Gestor Admin
            const managerExists = await gestorModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Gestor
            const medicExists = await medicoModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Médico
            const medicConvExists = await medicoConvModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}}); //Médico Convidado
            const athleteExists = await atletaModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Atleta

            // Realizar query 

            if(medicConvExists || medicExists){
                try{
                    const crm = req.body.crm;
                    let user = await medicoModels.findOne({where: {crm: crm}});
                    if(user){
                        return res.status(422).json({msg: 'CRM já cadastrado!'}); // Caso já tenha um usuário com esse cpf cadastrado
                    };
                }
                catch{
                    return res.status(422).json({msg: 'Email ou CPF já cadastrado!'});
                }
            };

            if(managerAdminExists || managerExists || medicExists || medicConvExists || athleteExists){
                return res.status(422).json({msg: 'Email ou CPF já cadastrado!'}); // Caso já tenha um usuário com esse cpf cadastrado
            }
            else{
                await database.sync();
            
                // Criar a senha
                const salt = await bcrypt.genSalt(2); // Vai dificultar sua senha
                const passwordHash = await bcrypt.hash(req.body.senha.toString(), salt); // Vai receber a senha do usuário e vai adicionar o "Salt"
                
                req.body.senha = passwordHash; // Passando a senha criptografada
            
                // Tenta salvar o usuário no banco de dados
                try{
                    let array = perfil[req.body.cargo]; // Array que vai selecionar o Model
                    array.forEach((elemento) =>{ // Esse array pega todos os models e adiciona em os dados em cada tabela
                        elemento.create(req.body); // Realiza a query para criar o usuário
                    })
                    res.status(200).json({msg: req.body.cargo + ' cadastrado com sucesso!!'}); // Retorna a resposta para o usuário
                }
                // Caso não tenha conseguido salvar o usuário
                catch(err){
                    res.status(500).json({msg: 'Erro interno, tente novamente mais tarde!'});
                };
            };
        };
    };

    // -------------------------- ALTERAR USUÁRIO --------------------------
    static async changeUser(req, res){ // Função criada para alterar usuário no banco de dados

        let cpf = req.body.cpf; // Variável que vai armazenar o id
        
        let dadoAtualizado = req.body; // Variável que vai receber os dados novos 
       
        await database.sync(); 

        let verification = true; // Vai verificar se o programa pode dar continuidade

        Object.keys(req.body).forEach(function eachKey(key) {  
            // Validação de todos os campos 
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null){
                verification = false // Vai atribuir o valor "false" para a variável
            };
        });

        if(verification == false){ // Se a variável "verification" for falsa
            return res.status(422).json({msg: 'Preencha todos os campos!!'}); //  422 - O servidor entende a requisição mas os dados não estão corretos para processar
        }
        else{

            // Verifica se o cargo do usuário é Gestor Admin
            if(req.body.cargo == "Gestor-Admin"){

                // Criar a senha
                const salt = await bcrypt.genSalt(2); // Vai dificultar sua senha
                const passwordHash = await bcrypt.hash(req.body.senha.toString(), salt); // Vai receber a senha do usuário e vai adicionar o "Salt"
                
                req.body.senha = passwordHash; // vai passar a senha criptografada

                try{
                    await gestorAdminModels.update(dadoAtualizado, ({where: {[Op.or]: [{cpf: cpf},{email: email}]}})); // Query de alteração
                    res.status(200).json('Gestor Admin alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            }

            // Verifica se o cargo do usuário é Gestor
            if(req.body.cargo == "Gestor"){
                try{
                    // Criar a senha
                    const salt = await bcrypt.genSalt(2); // Vai dificultar sua senha
                    const passwordHash = await bcrypt.hash(req.body.senha.toString(), salt); // Vai receber a senha do usuário e vai adicionar o "Salt"
                    
                    req.body.senha = passwordHash; // vai passar a senha criptografada

                    await gestorModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Gestor alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            // Verifica se o cargo do usuário é Médico
            if(req.body.cargo == "Médico"){
                try{
                    let user = await medicoModels.findOne({where: {cpf: cpf}});
                    await enderecoMedicoModels.update(dadoAtualizado, {where: {id_end_med: user.idmedico}}); // Altera o endereço do atleta no banco de dados
                    await telMedicoModels.update(dadoAtualizado, {where: {id_tel_med: user.idmedico}}); // Altera o telefone do atleta no banco de dados
                    await medicoModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Médico alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            if(req.body.cargo == "Médico-Convidado"){
                try{
                    let user = await medicoConvModels.findOne({where: {cpf: cpf}});
                    await endMedConvModels.update(dadoAtualizado, {where: {id_end_conv: user.id_med_conv}}); // Altera o endereço do atleta no banco de dados
                    await telMedConvModels.update(dadoAtualizado, {where: {id_tel_conv: user.id_med_conv}}); // Altera o telefone do atleta no banco de dados
                    await medicoConvModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Médico Convidado alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            // Verifica se o cargo do usuário é Atleta
            if(req.body.cargo == "Atleta"){
                try{ // Tentar salvar usuário no banco de dados
                    let user = await atletaModels.findOne({where: {cpf: cpf}})
                    console.log(user)
                    await enderecoAtletaModels.update(dadoAtualizado, {where: {id_end_atl: user.idatleta}}); // Altera o endereço do atleta no banco de dados
                    await telAtletaModels.update(dadoAtualizado, {where: {id_tel_atl: user.idatleta}}); // Altera o telefone do atleta no banco de dados
                    await atletaModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Altera o atleta no banco de dados
                    res.status(200).json('Atleta alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){ // Caso não consiga salvar no banco de dados
                    console.log(err)
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };
        };
    };  


    // -------------------------- DELETAR USUÁRIO --------------------------
    static async deleteUser(req, res){

        let cpf = req.body.cpf; // Variável que vai receber o cpf inserido pelo usuário
        let cargo = req.body.cargo; // Variável que vai pegar o cargo

        await database.sync(); // Conexão com o banco de dados

        if(cargo == "Gestor-Admin"){ 
            // Tentar deletar usuário
            try{
                await gestorAdminModels.destroy({where: {cpf: cpf}}); // Query para apagar 
                res.status(200).send("Gestor Admin deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                console.log(err)
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Gestor"){ 
            // Tentar deletar usuário
            try{
                await gestorModels.destroy({where: {cpf: cpf}}); // Query para apagar 
                res.status(200).send("Gestor deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };


        if(cargo == "Médico"){ 
            try{
                let user =  await medicoModels.findOne({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                telMedicoModels.destroy({where: {id_tel_med: user.idmedico}}); // Deletar telefone do médico no banco de dados
                enderecoMedicoModels.destroy({where: {id_end_med: user.idmedico}}); // Deletar o endereço do médico cadastrado no banco de dados
                medicoModels.destroy({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                res.status(200).send("Médico deletado com sucesso!"); // Resposta final
            }
            catch(err){
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Médico-Convidado"){ 
            try{
                let user =  await medicoModels.findOne({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                telMedConvModels.destroy({where: {id_tel_conv: user.id_med_conv}}); // Deletar telefone do médico no banco de dados
                endMedConvModels.destroy({where: {id_end_conv: user.id_med_conv}}); // Deletar o endereço do médico cadastrado no banco de dados
                medicoConvModels.destroy({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                res.status(200).send("Médico deletado com sucesso!"); // Resposta final
            }
            catch(err){
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Atleta"){ 
            // Tentar deletar usuário
            try{
                let user = await atletaModels.findOne({where: {cpf: cpf}}); 
                enderecoAtletaModels.destroy({where: {id_end_atl: user.idatleta}}); // Deletar o endereço do atleta cadastrado no banco de dados
                telAtletaModels.destroy({where: {id_tel_atl: user.idatleta}}); // Deletar telefone do atleta no banco de dados
                examesModels.destroy({where: {id_exame_atl}})
                atletaModels.destroy({where: {cpf: cpf}}); // Deletar o atleta do banco de dados
                res.status(200).send("Atleta deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };
    };

    // -------------------------- SOLICITAR EXAME PARA O ATLETA --------------------------
    static async requestAthlete(req, res){
        await database.sync();
        try{        
            await atletaModels.update({solicitacao : "SOLICITADO"}, {
            where:{cpf : req.body.cpf}
        });
        res.status(200).json({msg : "Exame solicitado com sucesso!!"});
    }
    catch(err){
        res.send({msg : "Houve um erro interno, tente novamente mais tarde"});
    };
};
};

// Exportar módulos
module.exports = gestorControllers;
