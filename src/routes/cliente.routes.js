const express = require('express');
const clienteControllers = require('../controllers/cliente.controllers.js');

const router = express.Router();

router.get('/clientes', clienteControllers.getAllClientes);

router.get('/clientes/get/:id', clienteControllers.getCliente);

router.get('/clientes/search/:datos', clienteControllers.searchCliente)

router.post('/clientes', clienteControllers.insertCliente);


const ExcelJS = require('exceljs');
const fs = require('fs/promises');

router.post('/clientes/exportarCliente', async (req, res) => {
    try {

        const listClientes = req.body.listClientes;

        if (!Array.isArray(listClientes) || listClientes.length === 0) {
            return res.status(400).send('La lista de clientes es inválida o está vacía.');
        }
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 20 },
            { header: 'Tipo Documento', key: 'tipo_doc', width: 15 },
            { header: 'Documento', key: 'documento', width: 20 },
            { header: 'Nombres', key: 'nombres', width: 20 },
            { header: 'Telefono', key: 'telefono', width: 20 },
            { header: 'Correo', key: 'correo', width: 20 },
            { header: 'Genero', key: 'genero', width: 20 },
            { header: 'Distrito', key: 'distrito_id', width: 20 },
            { header: 'Dirección', key: 'direc', width: 20 },
            { header: 'Referencia', key: 'referencia', width: 20 },
            { header: 'Url Map', key: 'url_maps', width: 20 },
        ];

        worksheet.addRows(listClientes);
        const excelPath = 'temp.xlsx';
        await workbook.xlsx.writeFile(excelPath);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=informacion.xlsx');
        const excelBuffer = await fs.readFile(excelPath);
        res.send(excelBuffer);
        await fs.unlink(excelPath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.put('/clientes/:id', clienteControllers.updateCliente);

router.delete('/clientes/:id', clienteControllers.deleteCliente);

module.exports = router;