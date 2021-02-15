const checkCrossingForChat = ({connection, chat_id, user1_id, user2_id}) => {
    console.log("AWJKDHKUAWHDUKWA")
    console.log("user1_id",user1_id)
    console.log("user2_id",user2_id)
    connection.query("SELECT * FROM messages_cross WHERE chat_id = ? AND user_id IN ?", [[[chat_id]],[[user1_id, user2_id]]], (err, result, fields)=>{
        if(err) {
            res.status(404).send({message:"Error in request!"})
            console.error(err)
            return
        }

        return new Promise((resolve)=>{
            resolve(!result.length < 2)
        })

       /* create_new_chat({connection, user1_id, user2_id, chat_name})
            .then((chat_id)=>{
                console.log("new chat id",chat_id);
                checkCrossingForChat({chat_id, user2_id, user1_id})
            })
            .catch((err)=>{
                console.error(err)
            })*/
    })

};

module.exports = {
    checkCrossingForChat
}