'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var UsuariosSchema = Schema({
    user: {type: String, required: [true, 'Usuario requerido'], unique: true},
    nombre: String,
    apellidos: String,
    pass: {type: String, required: [true, 'Contraseña requerida']},
    tipo: {type: String, default: 'Normal', enum: {values:['Normal', 'Administrador'], message: '{VALUE} NO es un tipo valido'}},
    estado: {type: Boolean, default: true}
});

UsuariosSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;

    return userObject;
}

UsuariosSchema.plugin(uniqueValidator, {message: '{PATH} Hallo este campo debe ser unico'});
module.exports = mongoose.model('Usuario', UsuariosSchema);
//Clase219 crear modelos