'use strict'
var express = require ('express');
var PdfController = require ('../controllers/pdfs');

//middleware para comprobar archivos
const {  } = require('../server/middelwares/')
var router = express.Router();

//variables para ulsar multiparty QUITAAAAAR!!!!!!!1
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './pdfs' });


router.post('/savePdf', multipartMiddleware, PdfController.savePdf);

module.exports = router;