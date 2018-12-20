'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// cargar archivos rutas
var usuario_routes = require('./routes/usuario');
var pdf_routes = require('./routes/pdf');
var img_routes = require('./routes/fotos_avances');
var obra_rutas = require('./routes/obras');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/usuario', usuario_routes);
app.use('/pdf', pdf_routes);
app.use('/img', img_routes);
app.use('/obra', obra_rutas);

// exportar
module.exports = app;