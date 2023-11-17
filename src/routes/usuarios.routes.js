const express = require('express');
const usuariosControllers = require('../controllers/usuarios.controllers.js');

const router = express.Router();

router.post('/usuarios/login', usuariosControllers.login)
router.get('/usuarios', usuariosControllers.getAllUsuarios);
router.get('/usuarios/get/:id', usuariosControllers.getUsuario);
router.post('/usuarios', usuariosControllers.insertUsuario);
router.put('/usuarios/:id', usuariosControllers.updateUsuario);
router.delete('/usuarios/:id', usuariosControllers.deleteUsuario);

module.exports = router;
