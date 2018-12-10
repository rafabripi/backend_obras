'use strict'
var Pdfs = require ('../models/pdfs');
var fs = require('fs');

var controller = {
    savePdf: function (req, res) {
        let pdf = new Pdfs();
        let params = req.body;
        var fileName = 'Archivo no guardado...';

        if (req.files) {
            let filePath = req.files.archivo.path;
            let fileSplit = filePath.split('\\');
            fileName =  fileSplit[1];
            let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];

            if (fileExt == 'pdf') {
                pdf.nombre = fileName;
                pdf.tipo_checklist = params.tipo_checklist;
                pdf.subido = params.subido;
                pdf.numero_contrato = params.numero_contrato;
                pdf.clave_municipalEx = params.clave_municipalEx;

                pdf.save((err, pdfStored)=>{
                    if (err) {
                        return res.status(500).send({
                            message: "Error interno"
                        });
                    }
                    if (!pdfStored) {
                        return res.status(404).send({
                            message: "Data error"
                        });
                    }
                    return res.status(200).send({
                        pdf: pdf
                    });
                });

            } else {
                fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
            }
        }else{
            return res.status(200).send({
				message: fileName
			});
        }

    }
}
module.exports = controller;