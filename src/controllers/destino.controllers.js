const { db } = require('../mysql.js');

const getAllDestinos = async (req, res) => {
    try {
        const query = 'SELECT * FROM destinos';
        const destinos = await db.query(query);
        res.json(destinos);
    } catch (error) {
        console.error('Error al recuperar datos de la tabla Destinos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la tabla Destinos' });
    }
};

const insertDestino = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await db.query('INSERT INTO destinos (nombre) VALUES (?)', [nombre]);

        if (result.affectedRows === 1) {
            res.json({ message: 'Destino insertado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo insertar el destino' });
        }
    } catch (error) {
        console.error('Error al insertar un destino:', error);
        res.status(500).json({ error: 'Ocurrió un error al insertar el destino' });
    }
};

const updateDestino = async (req, res) => {
    try {
        const destinoId = req.params.id;
        const { nombre } = req.body;

        const query = 'UPDATE destinos SET nombre = ? WHERE id = ?';
        const result = await db.query(query, [nombre, destinoId]);

        if (result.affectedRows === 1) {
            res.json({ message: 'Destino actualizado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el destino' });
        }
    } catch (error) {
        console.error('Error al actualizar un destino:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el destino' });
    }
};

const deleteDestino = async (req, res) => {
    const id = req.params.id;

    const rows = await db.query('SELECT * FROM destinos WHERE id = ?', [id]);
    
    if (rows.length === 0) {
        res.status(404).json({ error: `El registro con ID ${id} no existe` });
        return;
    }

    const result = await db.query('DELETE FROM destinos WHERE id = ?', [id]);

    res.json(result);
}


module.exports =  { getAllDestinos, insertDestino, updateDestino, deleteDestino }