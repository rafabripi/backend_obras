'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ObrasSchema = Schema({
    clave_municipal: {type: String, required: [true, 'Clave municipal es un campo requerido'], unique: true},
    nombre_obra: {type: String, required: [true, 'El nombre es un campo requerido']},
    localidad: {type: String, required: [true, 'La localidad es un campo requerido']},
    meta: String,
    beneficiarios_directos: Number,
    direccion_responsable: String,
    numero_contrato: String,
    fecha_contrato: Date,
    supervisor: String,
    tipo_ejecucion: {type: String, required: [true, 'El tipo de ejecución es un campo requerido']},
    programa: String,
    inversion_aprobada: Number,
    contratista: String,
    estado: {type: String, required: [true, 'El estado de la obra es un campo requerido']}
});

ObrasSchema.plugin(uniqueValidator, {message: '{PATH} Este campo debe ser unico'});
module.exports = mongoose.model('Obra', ObrasSchema);