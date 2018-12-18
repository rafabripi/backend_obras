'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var FotosSchema = Schema({
    nombre: {type: String, require: true, unique: true},
    fecha: Date,
    clave_municipalEx: String 
});

FotosSchema.plugin(uniqueValidator, {message: 'El archivo ya existe!'});
module.exports = mongoose.model('Fotos_avance', FotosSchema);