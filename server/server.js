const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const {loginComponent} = require("./helpers/login")
const {registrationComponent} = require("./helpers/registration")
const app = express()
const port = 3001

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '8889',
    user     : 'root',
    password : '1',
    database : 'social'
});

app.use(cors());

const jsonParser = bodyParser.json()

loginComponent({app, connection, jsonParser})
registrationComponent({app, connection, jsonParser})

//const urlencodedParser = bodyParser.urlencoded({ extended: false })
connection.connect();



app.listen(port, () => console.log(`Social app listening on port ${port}!`))