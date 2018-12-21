'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvanceSchema = Schema({
    clave_municipalEx: {type: String, required: true},
    fecha: {type: Date, required: true},
    avance: {type: String, required: true},
    comentarios: String
});

module.exports = mongoose.model('Avances_obra', AvanceSchema);