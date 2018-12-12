'use strict'
require('./server/config');

var app = require('./app');


        	// Creacion del servidor
        	app.listen(process.env.PORT, () => {
        		console.log("Server engine at url: localhost:",process.env.PORT);
        	});
       