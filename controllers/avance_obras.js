'use strict'
const Avance = require('../models/avance_obras');

var controller = {
    saveAvance: function (req, res) {
        let params = req.body;
        let avance = new Avance({
            fecha: params.fecha,
            avance: params.avance,
            comentarios: params.comentarios,
            obraId: params.obraId,
            usuarioQuery: params.usuarioQuery
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
        let obraId = req.params.id;

        Avance.find( {obraId: obraId}, null, {limit: 1, sort:{ fecha: -1 }}, (err, avanceDB) => {
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
