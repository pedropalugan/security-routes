const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')

const database = require('../config/dbConfig')

const examesModels = require('../models/exameModels')
const atletaModels = require('../models/atletaModels')

class medicoConvControllers {

    static async verExame(req, res) {
        let idMedConv = req.params.idMedConv
        await database.sync()
        let request = await examesModels.findAll({
            raw: true,
            where: { id_exame_med: idMedConv }
        })
        try {
            await examesModels.update({
                situacao: "ANALISE",
            }, { where: { id_exame_med: idMedConv } })
            fs.writeFileSync(path.join(__dirname, '../download/' + request[0]['idexame'] + '.pdf'), request[0]['pdf'])
            res.status(200).json({ msg: `http://localhost:3000/${request[0]['idexame']}.pdf` })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessaor o servidor" })
        }
    }

    static async avaliarExame(req, res) {
        let idMedConv = req.params.idMedConv
        await database.sync()
        let request = await examesModels.findOne({ where: { id_exame_med: idMedConv } })
        try {
            await examesModels.update({ situacao: "CONCLUIDO" }, { where: { id_exame_med: idMedConv } })
            await atletaModels.update(req.body, { where: { idatleta: request.id_exame_atl } })
            res.status(200).json({ msg: "Exame avaliado com sucesso" })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessar o servidor" })
        }
    }

}

module.exports = medicoConvControllers