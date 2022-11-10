// Importar módulos
const database = require('../config/dbConfig'); // "database" é uma variável que vai receber as configurações do "dbConfig"
const atletaModels = require('../models/atletaModels'); // "atletaModels" é uma variável que vai receber o model "atletaModels"
const medicoModels = require('../models/medicoModels')
const recoverModels = require('../models/recoverPswdModels')
const examesModels = require('../models/exameModels')
const bcrypt = require('bcrypt'); // Variável que vai pegar a criptografia
const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')


// Criando class "atletaControllers" para fazer o CRUD
class medicoControllers {

    static async listAtlhetePending(req, res) {
        await database.sync()
        let request = await atletaModels.findAll({
            where: {
                situacao: 'PENDENTE'
            }
        },)
        res.status(200).json(request)
    }

    static async listAtlheteSolicited(req, res) {
        await database.sync()
        let request = await atletaModels.findAll({
            where: {
                solicitacao: 'SOLICITADO'
            }
        },)
        res.status(200).json(request)
    }

    static async solicitarExame(req, res) {
        let x = 0
        await database.sync()
        try {
            for (let x = 0; x < Object.values(req.body).length; x++) {
                if (Object.values(req.body)[x] === null | Object.values(req.body)[x] === undefined | Object.values(req.body)[x] === "") {
                    res.status(200).json("Favor preencher todos os campos")
                    x = 1
                }
            }
            if (x === 0) {
                await examesModels.create(req.body)
                res.status(200).json({ msg: "Exame solicitado" })
            }
        }
        catch (err) {
            res.send({ msg: 'Não foi possível acessar o servidor' })
        }
    }

    static async verExameEnviado(req, res) {
        let id_atleta = req.params.id_atleta
        await database.sync()
        try {
            let request = await examesModels.findAll({ where: { id_exame_atl: id_atleta } })
            let updt = await examesModels.update({
                situacao: "ANALISE"
            }, {
                where: {
                    id_exame_atl: id_atleta
                }
            })
            fs.writeFileSync(path.join(__dirname, '../download/' + request[0]['idexame'] + '.pdf'), request[0]['pdf'])
            res.status(200).json({ msg: `http:localhost:3000/${request[0]['idexame']}.pdf` })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessar o servidor" })
        }


    }

    static async avaliarExame(req, res) {
        let idexame = req.params.idexame
        await database.sync()
        let request = await examesModels.findOne({ where: { idexame: idexame } })
        try {
            await examesModels.update({
                situacao: "CONCLUIDO"
            }, {
                where: {
                    idexame: idexame
                }
            })
            await atletaModels.update(req.body, {
                where: {
                    idatleta: request['id_exame_atl']
                }
            })
            res.status(200).json({ msg: 'Exame avaliado com successo' })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessar o servidor" })
        }
    }

    static async verMedico(req, res){
        let email = req.params.email
        await database.sync()
        await medicoModels.findOne({where : {email: email}})
        .then((response) => res.status(200).json(response))
        .catch((err) => res.send(err))
    }

}



// Exportar módulos 
module.exports = medicoControllers;
