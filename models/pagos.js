'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagosSchema = Schema({
    clave_municipalExt: String,
    fecha: Date,
    cantidad: Number,
    tipo_pago: String
});

module.exports = mongoose.model('Pago', PagosSchema);
//Clase219 crear modelos