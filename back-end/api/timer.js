const { pool } = require('../db/connect');

module.exports = function (app) {
    app.route('/timer')
        .post((request, response) => {
            const { timer_name } = request.body

            pool.query('INSERT INTO timer (timer_name) VALUES ($1) RETURNING id', [timer_name], (error, results) => {
                if (error) {
                    throw error
                }

                response.status(201).send({ id: results.rows[0].id })
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

        .put((request, response) => {
            let body = request.body.key
            body = body.map((value) => { return "(" + value.id + ",\'" + value.timer_name + "\'," + value.time + ",\'" + value.state + "\')"; });
            body = body.join(",");

            const query = 'UPDATE timer SET timer_name=tmp.timer_name, time=tmp.time, state=tmp.state FROM (VALUES ' + body + ') AS tmp (id,timer_name,time,state) WHERE timer.id=tmp.id'
            pool.query(query, (error, results) => {
                if (error) {
                    throw error
                }

                response.status(200).send("Timer Updated")
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