const {loginComponent} = require("./login")
const {registrationComponent} = require("./registration")
const {userComponent} = require("./user")

const createRoutes = ({app, connection, jsonParser}) => {
    // route "/login"
    loginComponent({app, connection, jsonParser})

    // route "/registration"
    registrationComponent({app, connection, jsonParser})

    // route "/user/:id"
    userComponent({app, connection, jsonParser})
}

module.exports = {
    createRoutes
}