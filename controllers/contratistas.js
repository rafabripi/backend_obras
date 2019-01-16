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
    }
}

module.exports = controller;