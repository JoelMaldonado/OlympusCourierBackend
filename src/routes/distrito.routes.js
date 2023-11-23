const express = require('express');
const destinoControllers = require('../controllers/destino.controllers.js');

const router = express.Router();

router.get('/destinos', destinoControllers.getAllDestinos);
router.post('/destinos', destinoControllers.insertDestino);
router.put('/destinos/:id', destinoControllers.updateDestino);
router.delete('/destinos/:id', destinoControllers.deleteDestino);

module.exports = router;