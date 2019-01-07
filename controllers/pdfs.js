'use strict'
var Pdfs = require ('../models/pdfs');
const fs = require ('fs');
const path = require ('path');

var controller = {
    delFile: function (req, res) {
        let params = req.body;
        let archivoName = params.nombre;
        let pathArchivoLocal = path.resolve(__dirname, `../uploads/pdfs/${archivoName}`)
        if (fs.existsSync(pathArchivoLocal)) {
            //si el archivo existe elimina el archivo
            fs.unlink(pathArchivoLocal);

            Pdfs.findByIdAndRemove(archivoId, (err, archivoDel)=>{
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
        let pdf = new Pdfs();
        let params = req.body;

        if (!req.files) {
            return res.status(404).json({
                ok: false,
                message: 'Data error: no se encontraron los archivos'
            });
        }

        let pdfUp = req.files.archivo;        
        let pdfNameSplit = pdfUp.name.split('.');
        let pdfExt = pdfNameSplit[1];
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
        let nombrePdf_claveM = params.clave_municipalEx.replace('/', '-');

        let newName = `${nombrePdf_claveM}-${params.tipo_checklist}.${pdfExt}`

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
            pdf.tipo_checklist = params.tipo_checklist;
            pdf.numero_contrato = params.numero_contrato;
            pdf.clave_municipalEx = params.clave_municipalEx;

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
    }
}

module.exports = controller;