'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ContratistasSchema = Schema({
    razon_social: {type: String, required: [true, 'Razón social requerida'], unique: true},
    representante: String,
    estado: String,
    ciudad: String,
    codigo_postal: String,
    colonia: String,
    calle: String,
    numero: String,
    numero_int: String,
    rfc: {type: String, required: [true, 'El RFC es requerido']},
    telefono: String,
    contacto: String,
    usuarioQuery:  {type: Schema.Types.ObjectId,ref:'Usuario', required: true}
});

ContratistasSchema.plugin(uniqueValidator, {message: '{PATH} Este campo debe ser unico'});
module.exports = mongoose.model('Contratista', ContratistasSchema);
//Clase219 crear modelos