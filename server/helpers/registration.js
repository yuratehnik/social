module.exports = {
    registrationComponent : ({app, connection, jsonParser}) => {
        app.post('/registration', jsonParser, (req, res) => {
            const email = req.body.email;
            const pass = req.body.pass;
            const name = req.body.name;

            connection.query("SELECT * FROM users WHERE email = ?", email, function (err, result, fields) {
                if (err) throw err;

                if(result.length === 0) {
                    console.log("empty email, we can register");

                    connection.query("INSERT INTO users (name, email, pass) VALUES ?", [[[name, email, pass]]], function (err, result, fields) {
                        if (err) throw err;


                        res.send(JSON.stringify({
                            result: !!result
                        }))
                    });
                } else {
                    console.log("Email already in use!")
                }
            });
        })
    }
}
