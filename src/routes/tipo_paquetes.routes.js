const express = require('express');
const tipoPaquetesControllers = require('../controllers/tipo_paquetes.controllers.js');

const router = express.Router();

router.get('/paquetes', tipoPaquetesControllers.listarTodos);
router.post('/paquetes', tipoPaquetesControllers.insertar);
router.put('/paquetes/:id', tipoPaquetesControllers.actualizar);
router.delete('/paquetes/:id', tipoPaquetesControllers.eliminar);

module.exports = router;
