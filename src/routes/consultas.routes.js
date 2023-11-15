const express = require('express');
const consultasController = require('../controllers/consultas.controller.js');

const router = express.Router();

router.post('/consultas', consultasController.consultarDoc);

module.exports = router;