const createUsers = (connection) => {
    const createUsersTable = `CREATE TABLE if NOT EXISTS users(
    id INT PRIMARY KEY auto_increment,
    name CHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    email CHAR(150) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    pass CHAR(80) NOT NULL COLLATE utf8_general_ci DEFAULT "Null")`;

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