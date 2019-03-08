const nodemailer = require('nodemailer');
require('../server/config');

var transporter = nodemailer.createTransport({
    host: 'a2plcpnl0258.prod.iad2.secureserver.net',
    port: 465,
    secure: true,
    logger : true,
    debug : true,
    auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL
    },
    tls:{
        ciphers: 'SSLv3',
    }
 });

module.exports = transporter;