require('dotenv').config();

const Pool = require('pg').Pool;

exports.pool = new Pool ({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'cronometro',
    password: process.env.DB_PASSWORD,
    port: 5432,
})
