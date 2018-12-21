'use strict'
const Pagos = require ('../models/pagos');

var controller = {
    savePago: function (req, res) {
        let params = req.body;
        let pago = new Pagos({
            clave_municipalExt: params.clave_municipalExt,
            folio: params.folio,
            fecha: params.fecha,
            cantidad: params.cantidad,
            tipo_pago: params.tipo_pago
        });

        pago.save((err, pagoStored)=>{
            if (err) {
                return res.status(500).send({
                    message: "Error, no se guardo el pago",
                    err
                });
            }
            if (!pagoStored) {
                return res.status(404).send({
                    message: "Error data not found"
                });  
            }
            return res.status(200).send({
                pago: pagoStored
            });  
        });
    }
}

module.exports = controller;