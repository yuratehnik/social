const {loginComponent} = require("./login")
const {registrationComponent} = require("./registration")
const {userComponent} = require("./user")
const {chatCreateRoute} = require("./chat_create")
const {chatGetRoute} = require("./chats_get")
const {chatPostMessageRoute} = require("./message_send")

const createRoutes = ({app, connection, jsonParser}) => {
    // route "/login" POST
    loginComponent({app, connection, jsonParser})

    // route "/registration" POST
    registrationComponent({app, connection, jsonParser})

    // route "/user/:id" GET
    userComponent({app, connection, jsonParser})

    // route "/chats/" POST
    chatCreateRoute({app, connection, jsonParser})

    //route "/chats/" GET
    chatGetRoute({app, connection, jsonParser})

    //route "/chat/:id" POST
    chatPostMessageRoute({app, connection, jsonParser})
}

module.exports = {
    createRoutes
}