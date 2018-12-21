'use strict'
const express = require('express');
var router = express.Router();
const ContratistaController = require('../controllers/contratistas');
const  {verificarToken} = require('../server/middelwares/autenticacion');

router.post('saveContratista', verificarToken, ContratistaController.saveContratista);

module.exports = router;