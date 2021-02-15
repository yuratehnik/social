const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const {createRoutes} = require("./routes/routes")
const app = express()
const port = 3001
const dbConfig = require('./config/db.config')
const createTables = require('./helpers/create-tables').createTables;


const connection = mysql.createConnection(dbConfig);

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

const jsonParser = bodyParser.json()

createTables(connection);
createRoutes({app, connection, jsonParser})


app.listen(port, () => console.log(`Social app listening on port ${port}!`))