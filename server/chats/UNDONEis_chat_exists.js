const isChatExists = ({connection, user1_id, user2_id}) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM messages_cross WHERE chat_id = ? AND user_id IN ?", [[[chat_id]],[[user1_id, user2_id]]], (err, result, fields)=>{
            if(err) {
                console.error(err)
                reject(err)
                return
            }

            resolve(result)
        })
    })

}