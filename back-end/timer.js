const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'cronometro',
    password: 'farrjess26',
    port: 5432,
})

const saveTimer = (request, response) => {
    const { timer_name, time, state } = request.body

    pool.query('INSERT INTO timer (timer_name, time, state) VALUES ($1, $2, $3)', [timer_name, time, state], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`timer tersimpan`)
    })
}

module.exports = {
    saveTimer
}