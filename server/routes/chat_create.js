const verifyToken = require("../helpers/jwtAuth").verifyToken;
const create_new_chat = require("../chats/create_new_chat").create_new_chat
const create_crossing = require("../chats/create-crossing").createCrossing

module.exports = {
    chatCreateRoute : ({app, connection, jsonParser}) => {
        app.post('/chats',jsonParser, (req, res) => {
            const id = req.headers.currentuserid;
            let tokenAccepted = id ? verifyToken(req) : false;





            if(tokenAccepted) {
                const user1_id = 5;
                const user2_id = 6;
                const chat_name = "test name";

                create_crossing({connection, chat_id: 2, user1_id, user2_id})
                    .then((res)=> {
                        console.log("chat crossing has been created",res)
                    })

                /*checkCrossingForChat({chat_id, user1_id, user2_id, chat_name})*/


            } else {
                res.status(401).send({message:"Wrong token"})
            }


            /*if (tokenAccepted) {
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
            }*/
        })
    }
}
