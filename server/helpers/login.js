module.exports = {
    loginComponent : ({app, connection, jsonParser}) => {
        app.post('/login', jsonParser, (req, res) => {
            const email = req.body.email;
            const pass = req.body.pass;

            connection.query("SELECT * FROM users WHERE email = ? AND pass = ?", [email, pass], function (err, result, fields) {
                if (err) throw err;

                res.send(JSON.stringify({
                    result: result.length > 0
                }))
            });
        })
    }
}
