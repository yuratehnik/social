const verifyToken = require("../helpers/jwtAuth").verifyToken;
const getChatsList = require("../chats/get-chats-list").getChatsList

module.exports = {
    chatGetRoute : ({app, connection, jsonParser}) => {
        app.get('/chats',jsonParser, (req, res) => {
            const id = req.headers.currentuserid;
            let tokenAccepted = id ? verifyToken(req) : false;





            if(tokenAccepted) {

                getChatsList({connection, user_id: id})
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
