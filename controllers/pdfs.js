'use strict'
var Pdfs = require ('../models/pdfs');

var controller = {
    savePdf: function (req, res) {
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
            pdfUp.mv(`uploads/pdfs/${pdfUp.name}`, (err) => {
                if (err){
                  return res.status(500).json({
                        ok: false,
                        message: "Error al guardar",
                        err
                    });
                }
                res.json({
                    ok: true,
                    message: 'File uploaded!'
                });
              });
        

    }
}
module.exports = controller;