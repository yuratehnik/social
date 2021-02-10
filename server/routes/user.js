const verifyToken = require("../helpers/jwtAuth").verifyToken;

module.exports = {
    userComponent : ({app, connection, jsonParser}) => {
        app.get('/user/:id',jsonParser, (req, res) => {
            const id = req.params.id;
            let tokenAccepted = id ? verifyToken(req) : false;

            console.log("tokenAccepted",tokenAccepted)

            if (tokenAccepted) {
                connection.query("SELECT * FROM users WHERE id = ?", id, function (err, result, fields) {
                    if (err) {
                        res.status(404).send({message:"Error in request!"})
                        return
                    }

                    if(result.length) {
                        const {name, email, id} = result[0]
                        const dataForSending = {id, name, email}

                        res.send(JSON.stringify({
                            result: dataForSending
                        }))
                    } else {
                        res.status(404).send({message:"User not found!"})
                    }
                });
            } else {
                res.status(401).send({message:"Wrong token"})
            }
        })
    }
}
