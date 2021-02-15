const verifyToken = require("../helpers/jwtAuth").verifyToken;
const create_new_message = require("../chats/create-message").create_new_message;

module.exports = {
    chatPostMessageRoute : ({app, connection, jsonParser}) => {
        app.post('/chat/:id', jsonParser, (req, res) => {
            const user_id = req.headers.currentuserid;
            const chat_id = req.params.id;
            const text = req.body.text;
            let tokenAccepted = user_id ? verifyToken(req) : false;


            if(tokenAccepted) {

                create_new_message({connection, user_id, chat_id, text})
                    .then((result)=>{
                        res.status(200).send(JSON.stringify({
                            result
                        }))
                    })
                    .catch((err)=> {
                        console.error("cant get chats for this user",err)
                    })

            } else {
                res.status(401).send({message:"Wrong token"})
            }
        })
    }
}
