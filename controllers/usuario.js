'use strict'
var Usuario = require ('../models/usuarios');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const _= require('underscore');

var controller = {
    saveUser: function (req, res) {

        let params = req.body;
        let usuario = new Usuario({
            user : params.user,
            nombre : params.nombre,
            apellidos : params.apellidos,
            pass : bcrypt.hashSync(params.pass, 10),
            tipo : params.tipo
        });
        
        usuario.save((err, usuarioStored)=>{
            if (err) {
                return res.status(500).send({
                    message: "Error, no se guardo el usuario",
                    err
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
        let being = req.query.being || 0;
        being = Number (being);
        let end = req.query.end || 5;
        end = Number(end);
        /**
        *con el metodo find podemos hacer consultar como con where
        *por ejemplo Usuario.find({nombre: 'Rafael'})
        *regresaria los documentos donde nombre coincida con Rafael
        *Investigar en documentacion de Mongoose
        *---------------------------------------
        *el metodo short ordena la consulta
         */
        Usuario.find({estado: true}, 'nombre apellidos tipo')
                    .skip(being)
                    .limit(end)
                    .exec((err, usuarios)=>{
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
                        Usuario.countDocuments({estado: true}, (err, result)=>{
                            if (err) {
                                return res.status(500).json({message: 'El conteo fallo'});
                            }
                            return res.status(200).send({usuarios, conteo: result});
                        });
                    });
    },
    updateUser: function (req, res) {
        let usuarioId = req.params.id;
        let update = _.pick(req.body, ['tipo']);

        Usuario.findByIdAndUpdate(usuarioId, update, {new: true, runValidators: true}, (err, usuarioUpdate)=>{
            if (err) {
               return res.status(500).send({
                message: "Error interno",
                err
               });
            }
            if (!usuarioUpdate) {
                return res.status(404).json({
                    message: "Data error",
                    err
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
                    message: 'Error interno',
                    err
                });
            }
            if (!usuarioDelete) {
                return res.status(404).send({
                    message: 'Data Error: usuario no encontrado',
                    err
                });
            }
            return res.status(200).send({
                usuario: usuarioDelete
            });
        });
    },
    desactivedUser: function (req, res) {
        let userId = req.params.id;
        let update = _.pick(req.body, ['estado']);        

        Usuario.findByIdAndUpdate(userId, update, {new: true, runValidators: true}, (err, usuarioUpdate)=>{
            if (err) {
               return res.status(500).send({
                message: "Error interno",
                err
               });
            }
            if (!usuarioUpdate) {
                return res.status(404).json({
                    message: "Data error",
                    err
                });
            }
            return res.status(200).send({
                usuario: usuarioUpdate
            });
        });
    },
    login: function (req, res) {
        let userData = req.body;

        Usuario.findOne({user: userData.user}, (err, usuarioDB)=>{
            if (err) {
                return res.status(500).json({
                    message: 'Internal error', 
                    err
                });
            }
            if (!usuarioDB) {
                return res.status(404).json({
                    message: 'Data error: usuario no encontrado',
                    err
                });
            }
            if (!bcrypt.compareSync(userData.pass, usuarioDB.pass)) {
                return res.status(404).json({
                    message: 'Data error: pass no encontrado',
                    err
                })
            }

            let token = jwt.sign(
                {usuario: usuarioDB},
                process.env.SEED,
                {expiresIn: process.env.EXP_TOKEN}
            );

            return res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        });
    }
};

module.exports = controller;