const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    loginComponent : ({app, connection, jsonParser}) => {
        app.post('/login', jsonParser, (req, res) => {
            const email = req.body.email;
            const pass = req.body.pass;

            connection.query("SELECT * FROM users WHERE email = ?", email, function (err, result, fields) {
                if (err) throw err;

                if(result.length > 0) {
                    const user = result[0];

                    const passwordIsValid = bcrypt.compareSync(
                        pass,
                        user.pass
                    );

                    if(!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }

                    const token = jwt.sign({ id: user.id }, config.secret)


                    res.status(200).send({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            accessToken: token
                        },
                        message: "Auth succesfull"
                    });

                } else {
                    res.status(404).send({
                        accessToken: null,
                        message: "User Not found.",
                    });
                }
            });
        })
    }
}
