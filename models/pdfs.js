'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PdfsSchema = Schema({
    nombre: {type: String, require: true, unique: true},
    tipo_checklist: String,
    numero_contrato: String,
    obraId: {type: Schema.Types.ObjectId,ref:'Obra', required: true},
    usuarioQuery:  {type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});

PdfsSchema.plugin(uniqueValidator, {message: 'El archivo ya existe!'});
module.exports = mongoose.model('Pdf', PdfsSchema);