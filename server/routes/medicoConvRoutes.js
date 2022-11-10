const express = require('express')
const Router = express.Router()

const medicoConvControllers = require('../controllers/medicoConvControllers')

Router
    .get("/verExames/:idMedConv", medicoConvControllers.verExame)
    .put("/avaliarExames/:idMedConv", medicoConvControllers.avaliarExame)
    .get("/verMedicoConv/:email", medicoConvControllers.verMedicoConv)

module.exports = Router