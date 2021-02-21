const create_new_chat = ({connection,user1_id, user2_id, chat_name = ""}) => {
    /*let new_chat_id = null;*/
    if (user1_id && user2_id) {

        return new Promise((resolve) => {
            connection.query('INSERT INTO chats (chat_name) VALUES ?', [[[chat_name]]], function(err, result, fields) {
                if (err) {
                    console.error(err)
                    return
                }

                console.log("result.insertId", result.insertId)

                resolve(result.insertId);
            });
        })
    }
}

module.exports = {
    create_new_chat
}