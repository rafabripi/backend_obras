'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvanceSchema = Schema({
    clave_municipalEx: String,
    fecha: Date,
    avance: String,
    comentarios: String
});

module.exports = mongoose.model('Avance_obra', AvanceSchema);
//Clase219 crear modelos