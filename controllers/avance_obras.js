'use strict'
const Avance = require('../models/avance_obras');

var controller = {
    saveAvance: function (req, res) {
        let params = req.body;
        let avance = new Avance({
            clave_municipalEx: params.clave_municipalEx,
            fecha: params.fecha,
            avance: params.avance,
            comentarios: params.comentarios
        });

        avance.save((err, avanceStored)=>{
            if (err) {
                return res.status(500).json({
                    message: "Error, no se guardo el avance",
                    err
                });
            }
            if (!avanceStored) {
                return res.status(404).json({
                    message: "Error data not found"
                });  
            }
            return res.status(201).json({
                avance: avanceStored
            });
        });
    },

    getAvance: function (req, res) {
        let avanceId = req.params.id;

        Avance.findById(avanceId, (err, avanceDB) => {
            if (err) {
                return res.status(500).json({message: 'Error interno'});
            }
            if (!avanceDB) {
                return res.status(404).json({message: 'No se encontro'});
            }
            return res.status(200).json({
                ok: true,
                avanceDB,
                usuarioToken: req.usuario
            });
        });
    }
}

module.exports = controller;