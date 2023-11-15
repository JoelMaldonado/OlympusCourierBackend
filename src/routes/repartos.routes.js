const express = require('express');
const repartosControllers = require('../controllers/repartos.controllers.js');

const router = express.Router();

router.get('/repartos', repartosControllers.listarTodos);
router.post('/repartos', repartosControllers.insertar);
router.put('/repartos/:id', repartosControllers.actualizar);
router.delete('/repartos/:id', repartosControllers.eliminar);

module.exports = router;