const verifyToken = require("../helpers/jwtAuth").verifyToken;

module.exports = {
    userComponent : ({app, connection, jsonParser}) => {
        app.get('/user/:id',jsonParser, (req, res) => {
            const id = req.params.id;

            connection.query("SELECT * FROM users WHERE id = ?", id, function (err, result, fields) {
                if (err) {
                    res.status(404).send({message:"Error in request!"})
                    return
                }

                if(result.length) {
                    const {name, email, id} = result[0]
                    const dataForSending = {id, name, email}
                    let tokenAccepted = verifyToken(req);

                    console.log("tokenAccepted",tokenAccepted)

                    res.send(JSON.stringify({
                        result: dataForSending
                    }))
                } else {
                    res.status(404).send({message:"User not found!"})
                    return
                }
            });
        })
    }
}
