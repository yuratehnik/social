const createUsers = (connection) => {
    const createUsersTable = `CREATE TABLE if NOT EXISTS users(
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    email VARCHAR(150) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    pass VARCHAR(80) NOT NULL COLLATE utf8_general_ci DEFAULT "Null")`;

    connection.query(createUsersTable, function(err) {
        if (err) {
            console.error(err.message);
        }
    })
}

const createChats = (connection) => {
    const createChatsTable = `CREATE TABLE if NOT EXISTS chats(
    chat_id INT PRIMARY KEY auto_increment,
    chat_name VARCHAR(50) COLLATE utf8_general_ci DEFAULT "")`

    connection.query(createChatsTable, function(err) {
        if (err) {
            console.error(err.message);
        }
    })
}


const createMessages = (connection) => {
    const createMessagesTable = `CREATE TABLE if NOT EXISTS messages(
    id INT PRIMARY KEY auto_increment,
    text VARCHAR(4097) NOT NULL COLLATE utf8_general_ci DEFAULT "",
    chat_id INT NOT NULL COLLATE utf8_general_ci DEFAULT 0,
    publish_date TIMESTAMP NOT NULL COLLATE utf8_general_ci DEFAULT "2021-01-21 01:01:01",
    user_id INT NOT NULL DEFAULT 1)`;

    connection.query(createMessagesTable, function(err) {
        if (err) {
            console.error(err.message);
        }
    })
}


const createMessagesCross = (connection) => {
    const createMessagesCrossTable = `CREATE TABLE if NOT EXISTS messages_cross(
    user_id INT NOT NULL DEFAULT 1,
    chat_id INT NOT NULL DEFAULT 1)`
    connection.query(createMessagesCrossTable, function(err) {
        if (err) {
            console.error(err.message);
        }
    })
}


//include all functions to this module for complex export and execution
const createTables = (connection) => {
    createUsers(connection);
    createChats(connection);
    createMessages(connection);
    createMessagesCross(connection);
}

module.exports = {
    createTables
}