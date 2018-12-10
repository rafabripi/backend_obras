'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PdfsSchema = Schema({
    archivo: String,
    nombre: String,
    tipo_checklist: String,
    subido: Boolean,
    numero_contrato: String,
    clave_municipalEx: String
});

module.exports = mongoose.model('Pdf', PdfsSchema);
//Clase219 crear modelos