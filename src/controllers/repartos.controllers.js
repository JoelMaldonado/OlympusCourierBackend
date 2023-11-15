const { db } = require('../mysql.js');

const listarTodos = async (req, res) => {
    try {
        const queryRepartos = 'SELECT * FROM repartos';
        const repartos = await db.query(queryRepartos);
        const repartosConItems = await Promise.all(
            repartos.map(async (reparto) => {
                const queryItems = 'SELECT * FROM item_reparto WHERE id_reparto = ?';
                const items = await db.query(queryItems, [reparto.id]);
                return { ...reparto, items, total: parseFloat(reparto.total) };
            })
        );

        res.json(repartosConItems);
    } catch (error) {
        console.error('Error al recuperar datos de las tablas Repartos e item_reparto:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de las tablas Repartos e item_reparto' });
    }
};

const insertar = async (req, res) => {
    try {
        const { anotacion, clave, id_cliente, id_usuario, items } = req.body;

        if (!Array.isArray(items) || items.some(item => typeof item !== 'object')) {
            return res.status(400).json({ mensaje: 'El campo "items" debe ser una lista de objetos.' });
        }

        if (items.length === 0) {
            return res.json({ mensaje: 'No se puede ingresar sin items' });
        }

        const total = items.reduce((acumulador, item) => {
            if (typeof item.precio === 'number') {
                return acumulador + item.precio;
            } else {
                throw new Error('Cada objeto en "items" debe tener una propiedad "precio" numérica.');
            }
        }, 0);

        const query = 'INSERT INTO repartos (anotacion, clave, id_cliente, id_usuario, total) VALUES (?,?,?,?,?)'
        const result = await db.query(query, [anotacion, clave, id_cliente, id_usuario, total]);

        if (result.affectedRows === 1) {
            for (const item of items) {
                const { num_guia, detalle, cant, precio, id_tipo_paquete } = item
                const query2 = 'INSERT INTO item_reparto (num_guia, detalle, cant, precio, id_reparto, id_tipo_paquete) VALUES (?,?,?,?,?,?)'
                const result2 = await db.query(query2, [num_guia, detalle, cant, precio, result.insertId, id_tipo_paquete]);

                if (result2.affectedRows !== 1) {
                    return res.status(500).json({ error: 'No se pudo insertar' });
                }
            }
            res.json({ mensaje: 'Reparto insertado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo insertar' });
        }
    } catch (error) {
        console.error('Error al insertar un reparto:', error);
        res.status(500).json({ error: 'Ocurrió un error al insertar el reparto' });
    }
};

const actualizar = async (req, res) => {
    const id = req.params.id;
    const { anotacion, clave, id_cliente, id_usuario, items } = req.body;

    try {
        const repartoRows = await db.query('SELECT * FROM repartos WHERE id = ?', [id]);
        if (repartoRows.length === 0) {
            return res.status(404).json({ error: `El reparto con ID ${id} no existe` });
        }
        const actualizarRepartoQuery = 'UPDATE repartos SET anotacion = ?, clave = ?, id_cliente = ?, id_usuario = ? WHERE id = ?';
        const repartoResult = await db.query(actualizarRepartoQuery, [anotacion, clave, id_cliente, id_usuario, id]);

        if (items && items.length > 0) {
            await db.query('DELETE FROM item_reparto WHERE id_reparto = ?', [id]);
            for (const item of items) {
                const { num_guia, detalle, cant, precio, id_tipo_paquete } = item;
                const insertarItemQuery = 'INSERT INTO item_reparto (num_guia, detalle, cant, precio, id_reparto, id_tipo_paquete) VALUES (?,?,?,?,?,?)';
                await db.query(insertarItemQuery, [num_guia, detalle, cant, precio, id, id_tipo_paquete]);
            }
        }

        if (repartoResult.affectedRows === 1) {
            res.json({ mensaje: 'Reparto actualizado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el reparto' });
        }
    } catch (error) {
        console.error('Error al intentar actualizar el reparto:', error);
        res.status(500).json({ error: 'Ocurrió un error al intentar actualizar el reparto' });
    }
};

const eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM item_reparto WHERE id_reparto = ?', [id]);
        const repartoRows = await db.query('SELECT * FROM repartos WHERE id = ?', [id]);

        if (repartoRows.length === 0) {
            return res.status(404).json({ error: `El reparto con ID ${id} no existe` });
        }

        const repartoResult = await db.query('DELETE FROM repartos WHERE id = ?', [id]);

        if (repartoResult.affectedRows === 1) {
            res.json({ mensaje: 'Reparto y elementos relacionados eliminados correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo eliminar el reparto y sus elementos relacionados' });
        }
    } catch (error) {
        console.error('Error al intentar eliminar el reparto y sus elementos relacionados:', error);
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el reparto y sus elementos relacionados' });
    }
};
module.exports =  { listarTodos, insertar, actualizar, eliminar }