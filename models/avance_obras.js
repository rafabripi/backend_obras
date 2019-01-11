'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvanceSchema = Schema({
    fecha: {type: Date, required: true},
    avance: {type: String, required: true},
    comentarios: String,
    obraId: {type: Schema.Types.ObjectId,ref:'Obra', required: true},
    usuarioQuery:  {type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});

module.exports = mongoose.model('Avances_obra', AvanceSchema);