'use strict'
var Contratista = require ('../models/contratistas');

var controller = {
    saveContratista: function (req, res) {
        let params = req.body;
        let contratista = new Contratista({
            razon_social: params.razon_social,
            representante: params.representante,
            estado: params.estado,
            ciudad: params.ciudad,
            codigo_postal: params.codigo_postal,
            colonia: params.colonia,
            calle: params.calle,
            numero: params.numero,
            numero_int: params.numero_int,
            rfc: params.rfc,
            telefono: params.telefono,
            contacto: params.contacto,
            usuarioQuery : req.usuario
        });

        contratista.save((err, contratistaStored)=>{
            if (err) {
                return res.status(500).json({
                    message: "Error, no se guardo el contratista",
                    err
                });
            }
            if (!contratistaStored) {
                return res.status(404).json({
                    message: "Error data not found"
                });  
            }
            return res.status(201).json({
                contratista: contratistaStored
            }); 
        });
    },
    getContratistas: function (req, res) {
        Contratista.find((err, contratistas) => {
            if (err) {
                return res.status(500).json({
                    message: "Error interno"
                });
            }
            if (!contratistas) {
                return res.status(404).json({
                    message: "Contratistas no encontrados"
                });
            }
            Contratista.countDocuments((err, result)=>{
                if (err) {
                    return res.status(500).json({message: 'El conteo fallo'});
                }
                return res.status(200).json({contratistas, conteo: result});
            });
        });
    },
    getContratista: function (req, res) {
        let contratistaId = req.params.id;
        Contratista.findById(contratistaId, (err, contratista)=> {
            if (err) {
                return res.status(500).json({message: 'Error interno'});
            }
            if (!contratista) {
                return res.status(404).json({message: 'No se encontro'});
            }
            return res.status(200).json({
                ok: true,
                contratista
            });
        });
    },
    updateContratista: function (req, res) {
        let contratistaId = req.params.id;
        let update = req.body;

        Contratista.findByIdAndUpdate(contratistaId, update, {new: true}, (err, contratista)=> {
            if (err) {
                return res.status(500).json({
                 message: "Error interno al buscar contratista",
                 err
                });
             }
             if (!contratista) {
                 return res.status(404).json({
                     message: "Data error"
                 });
             }
             
             return res.status(200).json({
                contratista: contratista
             });
        });
    }
}

module.exports = controller;