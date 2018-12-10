'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContratistasSchema = Schema({
    razon_social: String,
    representante: String,
    estado: String,
    ciudad: String,
    codigo_postal: String,
    colonia: String,
    calle: String,
    numero: String,
    numero_int: String,
    rfc: String,
    telefono: String,
    contacto: String
});

module.exports = mongoose.model('Contratista', ContratistasSchema);
//Clase219 crear modelos