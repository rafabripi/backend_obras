'use strict'
var express = require('express');
var router = express.Router();

const { verificarToken } = require('../server/middelwares/autenticacion');



module.exports = router;