const createUsers = (connection) => {
    const createUsersTable = `CREATE TABLE if NOT EXISTS users(
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    email VARCHAR(150) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    pass VARCHAR(80) NOT NULL COLLATE utf8_general_ci DEFAULT "Null")`;

    connection.query(createUsersTable, function(err) {
        if (err) {
            console.log(err.message);
        }
    })
}


const createMessages = (connection) => {
    const createUsersTable = `CREATE TABLE if NOT EXISTS messages(
    id INT PRIMARY KEY auto_increment,
    text VARCHAR(4097) NOT NULL COLLATE utf8_general_ci DEFAULT "",
    chat_id int(150) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    pass VARCHAR(80) NOT NULL COLLATE utf8_general_ci DEFAULT "Null")`;

    connection.query(createUsersTable, function(err) {
        if (err) {
            console.log(err.message);
        }
    })
}


//include all functions to this module for complex export and execution
const createTables = (connection) => {
    createUsers(connection);
}

module.exports = {
    createTables
}