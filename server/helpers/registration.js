const bcrypt = require("bcryptjs");

module.exports = {
    registrationComponent : ({app, connection, jsonParser}) => {
        app.post('/registration', jsonParser, (req, res) => {
            const email = req.body.email;
            const pass = bcrypt.hashSync(req.body.pass, 8);
            const name = req.body.name;

            connection.query("SELECT * FROM users WHERE email = ?", email, function (err, result, fields) {
                if (err) throw err;

                if(result.length === 0) {
                    connection.query("INSERT INTO users (name, email, pass) VALUES ?", [[[name, email, pass]]], function (err, result, fields) {
                        if (err) throw err;


                        res.send(JSON.stringify({
                            result: !!result
                        }))
                    });
                } else {
                    res.status(403).send({message:"Email already in use"})
                }
            });
        })
    }
}
