const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

class Database {
    constructor(config) {
        this.config = config;
    }

    async connect() {
        this.connection = await mysql.createConnection(this.config);
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.end();
        }
    }

    async query(sql, values = []) {
        if (!this.connection) {
            throw new Error('La conexión a la base de datos no está establecida.');
        }

        const [rows, fields] = await this.connection.execute(sql, values);
        return rows;
    }
}

const db = new Database(dbConfig);

module.exports = { db };