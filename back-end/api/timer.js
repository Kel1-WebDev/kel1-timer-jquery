const { request, response } = require('express');
const { pool } = require('../db/connect');

module.exports = function (app) {
    app.route('/timer')
        .post((request, response) => {
            const { timer_name} = request.body

            pool.query('INSERT INTO timer (timer_name) VALUES ($1) RETURNING id', [timer_name], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send({id:results.rows[0].id})
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

    app.route('/timer/:id')
        .delete((request, response) => {
            const id = parseInt(request.params.id)
            
            pool.query('DELETE FROM timer WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Timer deleted with ID: ${id}`)
            })
        })
}
