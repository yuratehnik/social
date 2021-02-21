const verifyToken = require("../helpers/jwtAuth").verifyToken;
const getChatsMessages = require("../chats/get-chat-messages").getChatsMessages

module.exports = {
    messagesGetRoute : ({app, connection, jsonParser}) => {
        app.get('/messages/:chat_id',jsonParser, (req, res) => {
            const id = req.headers.currentuserid;
            const chat_id = req.params.chat_id;
            let tokenAccepted = id ? verifyToken(req) : false;

            if(tokenAccepted) {

                getChatsMessages({connection, user_id: id})
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
