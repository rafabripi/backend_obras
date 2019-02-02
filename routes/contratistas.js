'use strict'
const express = require('express');
var router = express.Router();
const ContratistaController = require('../controllers/contratistas');
const  {verificarToken} = require('../server/middelwares/autenticacion');

router.post('/saveContratista', verificarToken, ContratistaController.saveContratista);
router.get('/getContratistas', verificarToken, ContratistaController.getContratistas);
router.get('/getContratista/:id', verificarToken, ContratistaController.getContratista);
router.put('/updateContratista/:id', verificarToken, ContratistaController.updateContratista);

module.exports = router;