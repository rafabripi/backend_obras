'use strict'
const Obra = require('../models/obras');
const _= require('underscore');

var controller = {
    saveObra: function (req, res) {
        let params = req.body;

        let obra = new Obra({
            clave_municipal : params.clave_municipal,
            nombre_obra : params.nombre_obra,
            localidad : params.localidad,
            meta : params.meta,
            beneficiarios_directos : params.beneficiarios_directos,
            direccion_responsable : params.direccion_responsable,
            numero_contrato : params.numero_contrato,
            fecha_contrato : params.fecha_contrato,
            supervisor : params.supervisor,
            tipo_ejecucion : params.tipo_ejecucion,
            programa : params.programa,
            inversion_aprobada : params.inversion_aprobada,
            contratista : params.contratista,
            estado : params.estado,
        });

        obra.save((err, obraStored)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al guardar',
                    err
                });
            }
            if (!obraStored) {
                return res.status(404).json({
                    ok: false,
                    message: 'No se encontro el elemento a guardar'
                });
            }
            return res.status(200).json({
                ok: true,
                obra: obra
            });
        });
    },

    updateObra: function (req, res) {
        let id= req.body.id;
        let update = req.body;
        //en el reques podemos obtener informacion del usuario
        //console.log(req.usuario.tipo);

        Obra.findByIdAndUpdate(id, update, {new: true, runValidators: true}, (err, resObraUpdate)=>{
            if (err) {
                return res.status(500).send({
                    message: "Error interno",
                    err
                });            
            }
            
            if (!resObraUpdate) {
                return res.status(404).json({
                    message: "Data error",
                    data: resObraUpdate
                });
            }
            return res.status(200).send({
                obra: resObraUpdate
            });
        });
    }
}

module.exports = controller;