const response = require("../helpers/response")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    authentication: async (req, res, next) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                return response(res, 400, {msg: "token required"})
            }
            const decoded = jwt.verify(token.split(" ")[2], process.env.JWT_SECRET)
            req.userData = decoded
            next()
        } catch (error) {
            console.log(error);
            return response(res, 500, error)
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const user = req.userData
            if (user.role === 1) {
                next()
                return
            }
            return response(res, 401, {msg: "only for admin"})
        } catch (error) {
            console.log(error);
            return response(res, 401, error)
        }
    },

    isUser: async (req, res, next) => {
        try {
            const user = req.userData
            if (user.role === 0) {
                next()
                return
            }
            return response(res, 401, {msg: "only for user"})
        } catch (error) {
            console.log(error);
            return response(res, 401, error)
        }
    }
}
