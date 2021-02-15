const create_new_message = ({connection, user_id, chat_id, text = "DELETED"}) => {
    return new Promise((resolve) => {
        const publish_date = new Date();

        connection.query('INSERT INTO messages (text, chat_id, publish_date, user_id) VALUES ?', [[[text, chat_id, publish_date, user_id]]], function(err, result, fields) {
            if (err) {
                console.error(err)
                return
            }

            resolve(result.insertId);
        });
    })
}

module.exports = {
    create_new_message
}