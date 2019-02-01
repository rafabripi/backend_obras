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
            nota : params.nota,
            usuarioQuery : req.usuario
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
            return res.status(201).json({
                ok: true,
                obra: obra
            });
        });
    },

    updateObra: function (req, res) {
        let obraId= req.params.id;
        let update = _.pick(req.body,
            [ 'nombre_obra', 'meta', 'beneficiarios_directos', 'supervisor', 'estado']);
        //en el reques podemos obtener informacion del usuario
        //console.log(req.usuario.tipo);

        Obra.findByIdAndUpdate(obraId, update, {new: true, runValidators: true}, (err, resObraUpdate)=>{
            if (err) {
                return res.status(500).json({
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
            return res.status(200).json({
                obra: resObraUpdate
            });
        });
    },

    getObra: function (req, res) {
      let idObra = req.params.id;
      
      Obra.findById(idObra, (err, obra)=>{
        if (err) {
            return res.status(500).json({message: 'Error interno'});
        }
        if (!obra) {
            return res.status(404).json({message: 'No se encontro'});
        }
        return res.status(200).json({obra});
      });
    },

    getObras: function(req, res) {
        Obra.find()
        .exec((err, obras)=>{
            if (err) {
                return res.status(500).json({
                    message: "Error interno"
                });
            }
            if (!obras) {
                return res.status(404).json({
                    message: "obras no encontrados"
                });
            }
            Obra.countDocuments({estado: true}, (err, result)=>{
                if (err) {
                    return res.status(500).json({message: 'El conteo fallo'});
                }
                return res.status(200).json({obras, conteo: result});
            });
        });
    },

    busquedaObra: function (req, res) {
        var busqueda = req.params.id;
        var reg = new RegExp( busqueda, 'i' );
        Obra.find({ $or: [{clave_municipal: reg}, {nombre_obra: reg}] }, (err, obras)=> {
            res.status(200).json({
                ok: true,
                obras: obras
            });
        } )
    }
}

module.exports = controller;