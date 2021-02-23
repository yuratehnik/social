const getChatsMessages = ({connection, chat_id, page}) => {
    return new Promise((resolve, reject)=> {
        const range = 5;
        const offset = (Number(page) - 1) * range;


        //TODO need to check is user already in chat for security reason
//LIMIT ${start_point}, ${offset}

        connection.query('SELECT * FROM messages WHERE chat_id = ? LIMIT ? OFFSET ?', [[chat_id], [range], [offset]], (err, res, fields)=>{
            if(err) {
                /*res.status(404).send({message:"Error in request!"})*/
                console.error(err)
                reject(err)
                return
            }

            resolve(res)

            console.log("get chat messages result:", res)
        })
    })
}

module.exports = {
    getChatsMessages
}