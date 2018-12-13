'use strict'
var express = require('express');
var UserController = require('../controllers/usuario');

var router = express.Router();

router.post('/saveUser', UserController.saveUser);
router.get('/getUser/:id', UserController.getUser);
router.get('/getUsers', UserController.getUsers);
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.put('/desactivedUser/:id', UserController.desactivedUser);
router.post('/login', UserController.login);

module.exports = router;