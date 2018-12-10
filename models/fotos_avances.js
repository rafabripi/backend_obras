'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FotosSchema = Schema({
    nombre: String,
    fecha: Date,
    clave_municipalEx: String 
});

module.exports = mongoose.model('Fotos_avance', FotosSchema);
//Clase219 crear modelos