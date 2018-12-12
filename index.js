'use strict'
require('./server/config');
var mongoose = require('mongoose');
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control_Obras')
        .then(() => {
        	console.log("Conexión a la base de datos Control_Obras...");

        	// Creacion del servidor
        	app.listen(process.env.PORT, () => {
        		console.log("Server engine at url: localhost:",process.env.PORT);
        	});
        })
        .catch(err => console.log(err));