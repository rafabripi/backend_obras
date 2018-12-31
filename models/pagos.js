'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PagosSchema = Schema({
    clave_municipalExt: String,
    folio: {type: String, unique: true, required: [true, 'Campo requerido']},
    fecha: {type: Date, required: [true, 'Campo requerido']},
    cantidad: {type: Number, required: [true, 'Campo requerido']},
    tipo_pago: String
});

PagosSchema.plugin(uniqueValidator, {message: '{PATH} Este campo debe ser unico'});
module.exports = mongoose.model('Pago', PagosSchema);