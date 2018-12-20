'use strict'
const express = require ('express');
var router = express.Router();
const obraController = require('../controllers/obras');
const { verificarToken } = require('../server/middelwares/autenticacion');


router.post('/saveObra',verificarToken, obraController.saveObra);
router.put('/updateObra/:id', verificarToken, obraController.updateObra);

module.exports = router;