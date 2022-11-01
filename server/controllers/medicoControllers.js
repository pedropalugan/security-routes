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

    static async recuperarSenha(req, res) {
        let y = 0;
        let email = req.body.email
        await database.sync()
        let request = await medicoModels.findAll({
            where: {
                email: email
            }
        })
        if (request.length === 1) {
            let array = []
            for (let x = 0; x < 6; x++) {
                let numero = Math.floor(Math.random() * 10) //cria o código aletório
                array.push(numero)
            }
            array = array.join("") //transforma em string
            let testAccount = {
                user: 'pedro.palugan@outlook.com',
                pass: 'Peppalugan12'
            }


            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });

            let info = await transporter.sendMail({ //manda o email com o código gerado randomicamente
                from: testAccount.user,
                to: email,
                subject: "Verificação de código",
                text: "",
                html: `<p>Esse eh o codigo de verificacao: </p>
            <br/>
            <b>${array}</b>    
    `,
            }).then(async () => { //criar um registro com o email e o codigo para fazer a verificação na função abaixo 'verifyCode'
                let request = await recoverModels.create({
                    codigo: array,
                    email: email
                })
            })
        }
        else {
            res.status(200).json("Email não encontrado")
        }
    }
    static async verifyCode(req, res) {

        await database.sync()
        let request = await recoverModels.findAll({ raw: true })
        const salt = bcrypt.genSaltSync(18)
        const hash = bcrypt.hashSync(req.body.senha.toString(), salt)
        req.body.senha = hash


        for (let x = 0; x < request.length; x++) { //andar por todos os campos até que a condição abaixo seja satisfeita
            if (req.body.email === request[x]['email']) {
                if (req.body.codigo === request[x]['codigo']) { // se o código mandado for igual ao gerado na função acima, a senha será atualizada.
                    let update = await medicoModels.update(req.body, {
                        where: {
                            email: req.body.email
                        }
                    })
                    res.status(200).json('Senha atualizada com sucesso')
                    let deleteRegister = await recoverModels.destroy({
                        where: {
                            email: req.body.email
                        }
                    })
                }
                else {
                    res.status(200).json('O codigo nao eh o mesmo enviado')
                }
            }
            else {
                res.status(200).json('O email digitado nao foi encontrado')
            }
        }
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

}



// Exportar módulos 
module.exports = medicoControllers;
