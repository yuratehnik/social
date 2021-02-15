const getChatsList = ({connection, user_id}) => {
    return new Promise((resolve, reject)=> {
        connection.query("SELECT * FROM messages_cross WHERE user_id = ?", [[[user_id]]], (err, result, fields)=>{
            if(err) {
                res.status(404).send({message:"Error in request!"})
                console.error(err)
                reject(err)
                return
            }


            resolve(result)

            /* create_new_chat({connection, user1_id, user2_id, chat_name})
                 .then((chat_id)=>{
                     console.log("new chat id",chat_id);
                     checkCrossingForChat({chat_id, user2_id, user1_id})
                 })
                 .catch((err)=>{
                     console.error(err)
                 })*/
        })
    })
}

module.exports = {
    getChatsList
}