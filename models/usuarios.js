'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    user: String,
    nombre: String,
    apellidos: String,
    pass: String,
    tipo: String
});

module.exports = mongoose.model('Usuario', UsuariosSchema);
//Clase219 crear modelos