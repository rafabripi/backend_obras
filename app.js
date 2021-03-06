'use strict'

var express = require('express');
const bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas
var usuario_routes = require('./routes/usuario');
var pdf_routes = require('./routes/pdf');
var img_routes = require('./routes/fotos_avances');
var obra_routes = require('./routes/obras');
var avance_routes = require('./routes/avance_obras');
var contratista_routes = require('./routes/contratistas');
var pago_routes = require ('./routes/pagos');
var mail = require('./routes/mail');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token, responseType');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/usuario', usuario_routes);
app.use('/pdf', pdf_routes);
app.use('/img', img_routes);
app.use('/obra', obra_routes);
app.use('/avance', avance_routes);
app.use('/contratista', contratista_routes);
app.use('/pago', pago_routes);
app.use('/mail', mail);

// exportar
module.exports = app;