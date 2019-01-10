'use strict'
var express = require ('express');
var router = express.Router();
var AvanceController = require ('../controllers/avance_obras');
const {verificarToken} = require('../server/middelwares/autenticacion');

router.post('/saveAvance', verificarToken, AvanceController.saveAvance);
router.get('/getAvance/:id', verificarToken, AvanceController.getAvance);

module.exports = router;