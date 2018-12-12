'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control_Obras')
        .then(() => {
        	console.log("Conexión a la base de datos Control_Obras...");

        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Server engine at url: localhost:3900");
        	});
        })
        .catch(err => console.log(err));