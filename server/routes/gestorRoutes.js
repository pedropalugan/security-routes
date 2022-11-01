// Importacão das bibliotecas 
const express = require('express'); // Recebe o express

// Importação dos módulos
const gestorControllers = require('../controllers/gestorControllers'); // Armazena o aquivo do controller 

const router = express.Router(); // Armazena o "Router" do express

router
  .get("/", gestorControllers.listData) // Rota que pega o controller onde lista os dados dos atletas

  .post("/cadastro", gestorControllers.createUser) // Rota que pega o controller que cria usuário

  .put("/alterar", gestorControllers.changeUser) // Rota que pega o controller que altera o usuário

  .delete("/deletar", gestorControllers.deleteUser) // Rota que pega o controller que deleta usuário

  .put('/solicitarAtleta', gestorControllers.requestAthlete)

// Exportação do módulo
module.exports = router  
