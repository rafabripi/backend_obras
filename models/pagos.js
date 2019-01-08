'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PagosSchema = Schema({
    folio: {type: String, unique: true, required: [true, ' folio es un campo requerido']},
    fecha: {type: Date, required: [true, 'fecha  es un campo requerido']},
    cantidad: {type: Number, required: [true, 'cantidad  es un campo requerido']},
    tipo_pago: String,
    clave_municipalExt: {type: Schema.Types.ObjectId,ref:'Obra', required: true},
    usuarioQuery:  {type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});

PagosSchema.plugin(uniqueValidator, {message: '{PATH} Este campo debe ser unico'});
module.exports = mongoose.model('Pago', PagosSchema);