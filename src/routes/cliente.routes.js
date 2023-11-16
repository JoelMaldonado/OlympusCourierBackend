const express = require('express');
const clienteControllers = require('../controllers/cliente.controllers.js');

const router = express.Router();

router.get('/clientes', clienteControllers.getAllClientes);

router.get('/clientes/:id', clienteControllers.getCliente);

router.get('/clientes/search/:datos', clienteControllers.searchCliente)

router.post('/clientes', clienteControllers.insertCliente);

router.put('/clientes/:id', clienteControllers.updateCliente);

router.delete('/clientes/:id', clienteControllers.deleteCliente);

module.exports = router;