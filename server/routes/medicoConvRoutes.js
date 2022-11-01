const express = require('express')
const Router = express.Router()

const medicoConvControllers = require('../controllers/medicoConvControllers')

Router
    .get("/verExames/:idMedConv", medicoConvControllers.verExame)
    .put("/avaliarExames/:idMedConv", medicoConvControllers.avaliarExame)

module.exports = Router