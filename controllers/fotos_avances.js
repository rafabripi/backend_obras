'use strict'
var Img = require('../models/fotos_avances');

var controller = {
    saveImg: function (req, res) {
        if (!req.files) {
            return res.status(404).json({
                ok: false,
                message: 'Data error: no se encontraron los archivos'
            });
        }
        
        let imgUp = req.files.archivo;
        let imgNameSplit = imgUp.name.split('.');
        let imgExt = imgNameSplit[1].toLowerCase();
        let extValidas = ['jpg', 'jpeg', 'png', 'gif'];

        if (extValidas.indexOf(imgExt)) {
            imgUp.mv(`uploads/imgs/${imgUp.name}`, (err)=>{
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error al guardar',
                        err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    message: 'File uploaded'
                });
            });
        }
    }
}

module.exports = controller;