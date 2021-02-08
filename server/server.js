const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const Sequelize = require("sequelize");
const {loginComponent} = require("./helpers/login")
const {registrationComponent} = require("./helpers/registration")
const {userComponent} = require("./helpers/user")
const app = express()
const port = 3001
const dbConfig = require('./config/db.config')
const createTables = require('./helpers/create-tables').createTables;


const connection = mysql.createConnection(dbConfig);

app.use(cors());

const jsonParser = bodyParser.json()

createTables(connection);
loginComponent({app, connection, jsonParser})
registrationComponent({app, connection, jsonParser})
userComponent({app, connection, jsonParser})

app.listen(port, () => console.log(`Social app listening on port ${port}!`))