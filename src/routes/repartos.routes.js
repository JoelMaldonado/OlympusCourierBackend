const express = require('express');
const repartosControllers = require('../controllers/repartos.controllers.js');

const router = express.Router();

router.get('/repartos', repartosControllers.listarTodos);
router.get('/repartos/get/:id', repartosControllers.getReparto);
router.post('/repartos', repartosControllers.insertar);
router.put('/repartos/:id', repartosControllers.actualizar);
router.delete('/repartos/:id', repartosControllers.eliminar);

router.post('/repartos/darConformidad', repartosControllers.darConformidad)

module.exports = router;