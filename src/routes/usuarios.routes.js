const express = require('express');
const usuariosControllers = require('../controllers/usuarios.controllers.js');

const router = express.Router();

router.get('/usuarios', usuariosControllers.getAllUsuarios);
router.post('/usuarios', usuariosControllers.insertUsuario);
router.put('/usuarios/:id', usuariosControllers.updateUsuario);
router.delete('/usuarios/:id', usuariosControllers.deleteUsuario);

module.exports = router;
