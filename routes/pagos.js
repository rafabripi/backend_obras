'use strict'

var express = require ('express');
var router = express.Router();
var PagoController = require('../controllers/pagos');
const {verificarToken} = require('../server/middelwares/autenticacion');

router.post('/savePago', verificarToken, PagoController.savePago);

module.exports = router;