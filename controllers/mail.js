'use strict'
var transporter = require('../server/mailConfig');
require('../server/config');

var controller = {
     sendAnticipo: function (req, res) {
        let data = req.body;
        
        const mailOptions = {
            from: `Control de obras municipales <${process.env.USER_MAIL}>`,
            to: data.target,
            subject: data.subject,
            html: `
            <H3>Aviso de anticipo en nueva obra</H3> <br/>
            <p><strong>Se ha generado un nuevo anticipo en la obra ${data.obraNombre}</strong>
                puede seguir <a href=" ${data.link}"> este link</a>  para ir a esta obra.
            </p>
            <i>Nota: </i><br>
            <p> ${data.nota} </p>
            `
         };
         
        transporter.sendMail(mailOptions, function (err, info) {
            if (err){
                return res.status(500).json({
                    message: 'Error al enviar correo',
                    err
                });
            }
            else{
                return res.status(200).json({
                    message: 'Correo enviado'
                });
            }
        });

     }
}

module.exports = controller;