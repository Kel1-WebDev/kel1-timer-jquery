const { request, response } = require('express');
const { pool } = require('../db/connect');

module.exports = function (app) {
    app.route('/timer')
        .post((request, response) => {
            const { timer_name, time, state } = request.body

            pool.query('INSERT INTO timer (timer_name, time, state) VALUES ($1, $2, $3)', [timer_name, time, state], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`timer tersimpan`)
            })
        })

        .get((request, response) => {
            pool.query('SELECT * FROM timer', (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(results.rows)
            })
        })
}
