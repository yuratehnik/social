const createCrossing = ({connection, chat_id, user1_id, user2_id}) => {
    return new Promise((resolve) => {
        connection.query('INSERT INTO messages_cross (user_id, chat_id) VALUES ?', [[[[user1_id], [chat_id]],[[user2_id], [chat_id]]]], function(err, result, fields) {
            if (err) {
                console.error(err)
                return
            }

            resolve(true);
        });
    })
}

module.exports = {
    createCrossing
}