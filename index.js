'use strict'
require('./server/config');
var mongoose = require('mongoose');
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control_Obras', { useNewUrlParser: true })
        .then(() => {
        	console.log("Conexión a la base de datos Control_Obras...");

        	// Creacion del servidor
        	app.listen(process.env.PORT, () => {
				// la siguiente instruccion (\x1b[32m%s\x1b[0m") es para que en 
				//consola aparesca un texto resaltado en otro color
        		console.log("Server \x1b[32m%s\x1b[0m", "engine", "at url: localhost:",process.env.PORT);
        	});
        })
        .catch(err => console.log(err));