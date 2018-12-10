'use strict'
var Usuario = require ('../models/usuarios');

var controller = {
    saveUser: function (req, res) {
        let usuario = new Usuario();
        let params = req.body;

        usuario.user = params.user;
        usuario.nombre = params.nombre;
        usuario.apellidos = params.apellidos;
        usuario.pass = params.pass;
        usuario.tipo = params.tipo;

        usuario.save((err, usuarioStored)=>{
            if (err) {
                return res.status(500).send({
                    message: "Error, no se guardo el usuario"
                });
            }
            if (!usuarioStored) {
                return res.status(404).send({
                    message: "Error data not found"
                });  
            }
            return res.status(200).send({
                usuario: usuario
            });   
        });
    },
    getUser: function (req, res) {
        let usuarioId = req.params.id;
        Usuario.findById(usuarioId, (err, usuario)=>{
            if (err) {
                return res.status(500).send({message: 'Error interno'});
            }
            if (!usuario) {
                return res.status(404).send({message: 'Error interno'});
            }
            return res.status(200).send({usuario});
        });
    },
    getUsers: function (req, res) {
        /**
        *con el metodo find podemos hacer consultar como con where
        *por ejemplo Usuario.find({nombre: 'Rafael'})
        *regresaria los documentos donde nombre coincida con Rafael
        *Investigar en documentacion de Mongoose
        *---------------------------------------
        *el metodo short ordena la consulta
         */
        Usuario.find({}).sort('').exec((err, usuarios)=>{
            if (err) {
                return res.status(500).send({
                    message: "Error interno"
                });
            }
            if (!usuarios) {
                return res.status(404).send({
                    message: "usuarios no encontrados"
                });
            }
            return res.status(200).send({usuarios});
        });
    },
    updateUser: function (req, res) {
        let usuarioId = req.params.id;
        let update = req.body;

        Usuario.findByIdAndUpdate(usuarioId, update, {new: true}, (err, usuarioUpdate)=>{
            if (err) {
               return res.status(500).send({
                message: "Error interno"
               });
            }
            if (!usuarioUpdate) {
                return res.status(404).send({
                    message: "Data error"
                });
            }
            return res.status(200).send({
                usuario: usuarioUpdate
            });
        });
    },
    deleteUser: function (req, res) {
        let usuarioId = req.params.id;
        Usuario.findByIdAndRemove(usuarioId, (err, usuarioDelete)=>{
            if (err) {
                return res.status(500).send({
                    message: 'Error interno'
                });
            }
            if (!usuarioDelete) {
                return res.status(404).send({
                    message: 'Data Error'
                });
            }
            return res.status(200).send({
                usuario: usuarioDelete
            });
        });
    }
};

module.exports = controller;