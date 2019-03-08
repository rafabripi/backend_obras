'use strict'
var express = require('express');
var router = express.Router();
var MailController = require('../controllers/mail');
const { verificarToken } = require('../server/middelwares/autenticacion');

router.post('/sendMail', verificarToken, MailController.sendAnticipo);

module.exports = router;