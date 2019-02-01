'use strict'
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/usuario');
const { verificarToken, verificarAdmin } = require('../server/middelwares/autenticacion');

router.post('/saveUser', verificarToken, UserController.saveUser);
router.get('/getUser/:id', verificarToken, UserController.getUser);
router.get('/getUsers', [verificarToken, verificarAdmin], UserController.getUsers);
router.put('/updateUser/:id', verificarToken, UserController.updateUser);
router.delete('/deleteUser/:id', verificarToken, UserController.deleteUser);
router.put('/desactivedUser/:id', verificarToken, UserController.desactivedUser);
router.get('/getSupervisores', verificarToken, UserController.getSupervisores);
router.post('/login', UserController.login);

module.exports = router;