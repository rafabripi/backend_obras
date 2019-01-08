'use strict'
var Img = require('../models/fotos_avances');
const fs = require ('fs');
const path = require ('path');

var controller = {
    delFile: function (req, res) {
        let params = req.body;
        let archivoName = params.nombre;
        let archivoId= params.id;
        let pathArchivoLocal = path.resolve(__dirname, `../uploads/imgs/${archivoName}`);

        if (fs.existsSync(pathArchivoLocal)) {
            //si el archivo existe elimina el archivo
            fs.unlink(pathArchivoLocal);

            //una vez eliminado el archivo se elimina el registro de la DB
            Img.findByIdAndRemove(archivoId, (err, archivoDel)=>{
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error interno',
                        err
                    });
                }
                if (!archivoDel) {
                    return res.status(404).json({
                        message: 'Data Error: archivo no encontrado',
                        err
                    });
                }
                return res.status(200).json({
                    archivo: archivoDel
                });
            });
        }else{
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el archivo'
            });
        }
    },

    saveImg: function (req, res) {
        let img = new Img();
        let params = req.body;

        if (!req.files) {
            return res.status(404).json({
                ok: false,
                message: 'Data error: no se encontraron los archivos'
            });
        }
        
        let imgUp = req.files.archivo;
        let imgNameSplit = imgUp.name.split('.');
        let imgExt = imgNameSplit[(imgNameSplit.length -1)].toLowerCase();
        let extValidas = ['jpg', 'jpeg', 'png', 'gif'];

        if (extValidas.indexOf(imgExt) < 0) {
            return res.status(400).json({
                ok: false,
                message: 'El archivo pdf no tiene un formato valido, las extensiones permitidas son: "' + extValidas.join(', ') + '", se recibio: ' + imgExt
            });
        }

        //renombrar archivo para guardar, se puede usar el id de la obra o del checklist
        //para conformar el nombre del archivo

        //ajustar nombre de clave municipal: Se reemplazan las diagonales por guion medio
        //debido a que produce errores al guardar el pdf
        let nombreImg_ClaveM = params.clave_municipalEx.replace('/', '-');
        let nombreImg_CheckL = params.checklist.replace('/', '-');

        let newName = `${nombreImg_ClaveM}-${nombreImg_CheckL}-${ new Date().getMilliseconds()}.${imgExt}`

        imgUp.mv(`uploads/imgs/${newName}`, (err)=>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al guardar',
                    err
                });
            }

            //llenar parametros del modelo con la info que llega del request
            img.nombre = newName;
            img.fecha = params.fecha;
            img.checklist = params.checklist;
            img.clave_municipalEx = params.clave_municipalEx;

            img.save((err, imgStored)=>{
                if (err) {
                    return res.status(500).json({
                        message: "Error interno",
                        err
                    });
                }
                if (!imgStored) {
                    controller.borrarArchivo(imgStored.nombre);
                    return res.status(404).json({
                        message: "Data error"
                    });
                }
                res.status(201).json({
                    ok: true,
                    message: 'File uploaded',
                    img: img
                });
            });
        });
    },

    getImgs: function (req, res) {
        let checklist = req.body.checklist;
        let clave_municipalEx = req.body.clave_municipalEx;

        //metodos para query de mongoose: find, findOne, where,
        Img.find({'clave_municipalEx': clave_municipalEx, 'checklist': checklist}, 'nombre', function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'Error query',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                result: result
            });
        });
    },

    getImg: function (req, res) {
        let params = req.body;
        let imgReq = params.nombre;
        let imgPath = path.resolve(__dirname, `../uploads/imgs/${imgReq}`);
        if (fs.existsSync(imgPath)) {
            res.jsonFile(imgPath);
        }else{
            let noImg = path.resolve(__dirname, `../server/assets/no-image.jpg`);
            res.jsonFile(noImg);
        }
    }
}

module.exports = controller;