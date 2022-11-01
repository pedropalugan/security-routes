const express = require('express');
const router = express.Router();
const passport = require("passport");
const loginControllers = require('../controllers/loginControllers')


router
    .post('/', loginControllers.login)


module.exports = router
