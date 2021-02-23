const verifyToken = require("../helpers/jwtAuth").verifyToken;
const getChatsMessages = require("../chats/get-chat-messages").getChatsMessages

module.exports = {
    messagesGetRoute : ({app, connection, jsonParser}) => {
        app.get('/messages/:chat_id',jsonParser, (req, res) => {
            const id = req.headers.currentuserid;
            const chat_id = req.params.chat_id;
            const page = req.param("page");
            let tokenAccepted = id ? verifyToken(req) : false;

            console.log("page", page)

            if(tokenAccepted) {

                getChatsMessages({connection, chat_id, page})
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
