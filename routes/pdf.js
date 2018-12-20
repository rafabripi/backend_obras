'use strict'
var express = require ('express');
var PdfController = require ('../controllers/pdfs');
var router = express.Router();

//middelware de subida de archivos
const fileUpload = require('express-fileupload');
var fileUploadMiddleware = fileUpload()

router.put('/savePdf', fileUploadMiddleware, PdfController.savePdf);
router.delete('/delFile/:nombre', PdfController.delFile);

module.exports = router;