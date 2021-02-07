const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req) => {
    const id = parseInt(req.headers.currentuserid);
    const token = req.headers.authorization.split(" ")[1];

    return jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err)
            //throw new Error(err)
        }

        const response = {
            ok: !err,
        }
        return decoded.id === id;
    });
};

module.exports = {
    verifyToken,
}