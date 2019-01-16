'use strict'
const Pagos = require ('../models/pagos');

var controller = {
    savePago: function (req, res) {
        let params = req.body;
        let pago = new Pagos({
            folio: params.folio,
            fecha: params.fecha,
            cantidad: params.cantidad,
            tipo_pago: params.tipo_pago,
            obraId: params.obraId,
            usuarioQuery : req.usuario
        });

        pago.save((err, pagoStored)=>{
            if (err) {
                return res.status(500).json({
                    message: "Error, no se guardo el pago",
                    err
                });
            }
            if (!pagoStored) {
                return res.status(404).json({
                    message: "Error data not found"
                });  
            }
            return res.status(201).json({
                pago: pagoStored
            });  
        });
    }
}

module.exports = controller;