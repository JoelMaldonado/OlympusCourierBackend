const { db } = require('../mysql.js');

const getAllUsuarios = async (req, res) => {
    try {
        const query = 'SELECT * FROM usuarios';
        const destinos = await db.query(query);
        res.json(destinos);
    } catch (error) {
        console.error('Error al recuperar datos de la tabla Usuarios:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la tabla Usuarios' });
    }
};

const insertUsuario = async (req, res) => {
    try {


        const { documento, nombres, ape_materno, ape_paterno, telefono, correo, fecha_nacimiento, clave, rol } = req.body;
        const valores = [
            documento,
            nombres,
            ape_materno || '',
            ape_paterno || '',
            telefono || '',
            correo || '',
            fecha_nacimiento || '1900-01-01',
            clave || '1234',
            rol || 'U'
        ];
        const query = 'INSERT INTO usuarios (documento, nombres, ape_materno, ape_paterno, telefono, correo, fecha_nacimiento, clave, rol) VALUES (?,?,?,?,?,?,?,?,?)'
        const result = await db.query(query, valores);

        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Usuario insertado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo insertar' });
        }
    } catch (error) {
        console.error('Error al insertar un usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al insertar el usuario' });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const destinoId = req.params.id;
        const { documento, nombres, ape_materno, ape_paterno, telefono, correo, fecha_nacimiento, clave, rol } = req.body;
        const query = 'UPDATE usuarios SET documento = ?, nombres = ?, ape_materno = ?, ape_paterno = ?, telefono = ?, correo = ?, fecha_nacimiento = ?, clave = ?, rol = ? WHERE id = ?';
        const result = await db.query(query, [documento, nombres, ape_materno, ape_paterno, telefono, correo, fecha_nacimiento, clave, rol, destinoId]);

        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Usuario actualizado correctamente' });
        } else {
            res.status(500).json({ error: 'No se pudo actualizar' });
        }
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
    }
};

const deleteUsuario = async (req, res) => {
    const id = req.params.id;

    const rows = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    if (rows.length === 0) {
        res.status(404).json({ error: `El registro con ID ${id} no existe` });
        return;
    }

    const result = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result.affectedRows === 1) {
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
        res.status(500).json({ error: 'No se pudo actualizar' });
    }
}


module.exports = { getAllUsuarios, insertUsuario, updateUsuario, deleteUsuario }