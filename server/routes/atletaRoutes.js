const express = require('express')
const multer = require('multer')
const path = require("path")

const atletaControllers = require('../controllers/atletaControllers')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve("./uploads"))
    },
    filename: function(res, file, cb){
        cb(null, file.originalname)
    }
})


const upload = multer({storage})

const router = express.Router()

router
    .get('/', atletaControllers.listUsers)
    .put('/atualizarAtleta', atletaControllers.changeUser)
    .get('/verExamesSolicitados/:id_atleta', atletaControllers.viewFile)
    .put('/enviarPdf/:id_atleta', upload.single('pdf'), atletaControllers.sendPdf)


module.exports = router