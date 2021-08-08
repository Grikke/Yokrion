const jwt = require("jsonwebtoken")

module.exports = {
    generateToken: function(id, status) {
        return jwt.sign({id, status}, process.env.SECRET)
    },
    readToken: function(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}