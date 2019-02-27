'use strict'
var Pdf = require ('../models/pdf');
const fs = require ('fs');
const path = require ('path');

var controller = {
    delFile: function (req, res) {
        let params = req.query;
        let archivoName = params.nombre;
        let archivoId= params.id;

        let pathArchivoLocal = path.resolve(__dirname, `../uploads/pdfs/${archivoName}`);
        if (fs.existsSync(pathArchivoLocal)) {
            //si el archivo existe lo elimina 
            fs.unlink(pathArchivoLocal, (err) => {
                if (err) {
                    console.log('Error al borrar archivo', err);
                } else {
                    console.log('file was deleted');
                }
            });

            Pdf.findByIdAndRemove(archivoId, (err, archivoDel)=>{
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

    savePdf: function (req, res) {
        let pdf = new Pdf();
        let params = req.body;

        if (!req.files) {
            return res.status(404).json({
                ok: false,
                message: 'Data error: no se encontraron los archivos'
            });
        }

        let pdfUp = req.files.archivo;        
        let pdfNameSplit = pdfUp.name.split('.');
        let pdfExt = pdfNameSplit[(pdfNameSplit.length -1)];
        let extValidas = ['pdf', 'PDF'];

        if (extValidas.indexOf(pdfExt) < 0 ) {
            return res.status(400).json({
                ok: false,
                message: 'El archivo pdf no tiene un formato valido, las extensiones permitidas son: "' + extValidas.join(', ') + '", se recibio: ' + pdfExt
            });
        }

        //renombrar archivo para guardar, se puede usar el id de la obra o del checklist
        //para conformar el nombre del archivo

        //ajustar nombre de clave municipal: Se reemplazan las diagonales por guion medio
        //debido a que produce errores al guardar el pdf

        let newName = `${params.obraId}-${params.checklist}.${pdfExt}`

        pdfUp.mv(`uploads/pdfs/${newName}`, (err) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    message: "Error al guardar",
                    err
                });
            }

            //llenar parametros del modelo con la info del request
            pdf.nombre = newName;
            pdf.fecha = new Date();
            pdf.checklist = params.checklist;
            pdf.obraId = params.obraId;
            pdf.usuarioQuery = req.usuario;

            pdf.save((err, pdfStored)=>{
                if (err) {
                    return res.status(500).json({
                        message: "Error interno",
                        err
                    });
                }
                if (!pdfStored) {
                    controller.borrarArchivo(pdfStored.nombre);
                    return res.status(404).json({
                        message: "Data error"
                    });
                }
                res.status(201).json({
                    ok: true,
                    message: 'File uploaded!',
                    pdf: pdf
                });
            });
        });
    },

    getPdfsObra: function (req, res) {
        let obraId = req.params.id;
        Pdf.find({obraId: obraId}, 'checklist nombre')
            .exec( (err, pdfs) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "Error interno"
                    });
                }
                if (!pdfs) {
                    return res.status(404).json({
                        ok: false,
                        message: "Archivos no escontrados"
                    });
                }
                Pdf.countDocuments({obraId: obraId}, (err, result)=>{
                    if (err) {
                        return res.status(500).json({message: 'El conteo fallo'});
                    }
                    return res.status(200).json({pdfs, conteo: result});
                });
            });
    },

    downloadPdf: function (req, res) {
        let params = req.query;
        let pdfReq = params.nombre;
        let nombreCheck = pdfReq.split('-');
        let nombreFin = nombreCheck[1];

        ///////////Codigo de express 4.16.0 onwards///////////////////
        let pathArchivoLocal = path.resolve(__dirname, `../uploads/pdfs/${pdfReq}`);
        // console.log(pathArchivoLocal);
        res.download(pathArchivoLocal, nombreFin, function (err) {
            if (err) {
                console.log('false', err);
            } else {
                console.log('ok');
            }
        });
        //////////////////////////////////////////////////////////////
        
    }
}

module.exports = controller;
