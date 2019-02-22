'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PdfSchema = Schema({
    nombre: {type: String, require: true, unique: true},
    fecha: Date,
    checklist: String,
    obraId: {type: Schema.Types.ObjectId,ref:'Obra', required: true},
    usuarioQuery:  {type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});

PdfSchema.plugin(uniqueValidator, {message: 'El archivo ya existe!'});
module.exports = mongoose.model('Pdf', PdfSchema);