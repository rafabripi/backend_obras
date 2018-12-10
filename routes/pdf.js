'use strict'
var express = require ('express');
var PdfController = require ('../controllers/pdfs');
var router = express.Router();
//variables para ulsar multiparty
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './pdfs' });


router.post('/savePdf', multipartMiddleware, PdfController.savePdf);

module.exports = router;