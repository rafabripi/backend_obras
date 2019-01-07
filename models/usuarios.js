'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// Roles validos o tipos de usuarios validos para la creacion de usuarios
var tiposValidos = {
    values:['Normal', 'Administrador'],
    message: '{VALUE} NO es un tipo valido'
}

var UsuariosSchema = Schema({
    user: {type: String, required: [true, 'Usuario requerido'], unique: true},
    nombre: String,
    apellidos: String,
    pass: {type: String, required: [true, 'Contraseña requerida']},
    correo: String,
    // en enum se determina cuales seran los valores que se pueden guardar (Normal y Administrador)
    tipo: {type: String, required:[true, 'Tipo de usuario'], default: 'Normal', enum: tiposValidos},
    estado: {type: Boolean, default: true}
});

//metodo de seguridad para evitar que al regresar la informacion del usuario se muestre la pass.
UsuariosSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;

    return userObject;
}

UsuariosSchema.plugin(uniqueValidator, {message: '{PATH} Este campo debe ser unico'});
module.exports = mongoose.model('Usuario', UsuariosSchema);