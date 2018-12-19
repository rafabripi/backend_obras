'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObrasSchema = Schema({
    clave_municipal: String,
    nombre_obra: String,
    localidad: String,
    meta: String,
    beneficiarios_directos: Number,
    direccion_responsable: String,
    numero_contrato: String,
    fecha_contrato: Date,
    supervisor: String,
    tipo_ejecucion: String,
    programa: String,
    inversion_aprovada: Number,
    contratista: String,
    estado: String
});

module.exports = mongoose.model('Obra', ObrasSchema);