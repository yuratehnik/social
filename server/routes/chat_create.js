const verifyToken = require("../helpers/jwtAuth").verifyToken;
const create_new_chat = require("../chats/create_new_chat").create_new_chat
const create_crossing = require("../chats/create-crossing").createCrossing

module.exports = {
    chatCreateRoute : ({app, connection, jsonParser}) => {
        app.post('/chats',jsonParser, (req, res) => {
            const id = req.headers.currentuserid;
            let tokenAccepted = id ? verifyToken(req) : false;

            if(tokenAccepted) {
                const user1_id = req.body.user1_id;
                const user2_id = req.body.user2_id;
                const chat_name = req.body.chat_name !== "" ? req.body.chat_name : user2_id;

                create_new_chat({connection, user1_id, user2_id, chat_name})
                    .then(id => {
                        create_crossing({connection, chat_id: id, user1_id, user2_id})
                            .then((data)=> {
                                console.log("chat crossing has been created",data)
                                res.status(200).send(JSON.stringify({
                                    result: {
                                        new_chat_id: id,
                                        is_crossing_created: data
                                    },
                                    message: "chat crossing has been created"
                                }))
                            })
                    });
                //checkCrossingForChat({chat_id, user1_id, user2_id, chat_name})

            } else {
                res.status(401).send({message:"Wrong token"})
            }
        })
    }
}
