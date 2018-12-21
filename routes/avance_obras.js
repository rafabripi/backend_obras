'use strict'
var express = require ('express');
var router = express.Router();
var AvanceController = require ('../controllers/avance_obras');
const {verificarToken} = require('../server/middelwares/autenticacion');

router.post('/saveAvance', verificarToken, AvanceController.saveAvance);

module.exports = router;