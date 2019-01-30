'use strict'
var express = require ('express');
var router = express.Router();
var obraController = require('../controllers/obras');
const { verificarToken } = require('../server/middelwares/autenticacion');


router.post('/saveObra',verificarToken, obraController.saveObra);
router.put('/updateObra/:id', verificarToken, obraController.updateObra);
router.get('/getObras', verificarToken, obraController.getObras);
router.get('/getObra/:id', verificarToken, obraController.getObra);
router.get('/busqueda/:id', verificarToken, obraController.busquedaObra);

module.exports = router;