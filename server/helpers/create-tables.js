const createUsers = (connection) => {
    const createUsersTable = `CREATE TABLE if NOT EXISTS users(
    id INT PRIMARY KEY auto_increment,
    name CHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    email CHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null",
    pass CHAR(100) NOT NULL COLLATE utf8_general_ci DEFAULT "Null")`;

    connection.query(createUsersTable, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    })
}


const createTables = (connection) => {
    createUsers(connection);
}





module.exports = {
    createTables
}