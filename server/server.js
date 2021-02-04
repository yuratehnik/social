const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(cors());

const jsonParser = bodyParser.json()

//const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', jsonParser, (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    res.send(JSON.stringify({
        data: 'Hello World!',
        params: [email, pass]
    }))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))