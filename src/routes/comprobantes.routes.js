const express = require('express');
const comprobantesControllers = require('../controllers/comprobantes.controllers.js');

const router = express.Router();

router.get('/comprobantes', comprobantesControllers.listarTodos);
router.post('/comprobantes', comprobantesControllers.insertar);
router.put('/comprobantes/:id', comprobantesControllers.actualizar);
router.delete('/comprobantes/:id', comprobantesControllers.eliminar);

module.exports = router;