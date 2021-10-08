const { pool } = require('../db/connect');

module.exports = function (app) {
    app.route('/timer')
        .post((request, response) => {
            const { timer_name} = request.body

            pool.query('INSERT INTO timer (timer_name) VALUES ($1) RETURNING id', [timer_name], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`timer tersimpan dengan ID : ${results.rows[0].id}`)
            })
        });
}
