const models = require('../models/auth.model')
const response = require('../helpers/response')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const fs = require("fs")
require('dotenv').config()
const sendMail = require("../helpers/sendEmail")
const crypto = require("crypto")

module.exports = {
    register: async(req, res) => {
        try {
            const {email, password, role, first_name, last_name, phone_number} = req.body // Input data email, password, role
            const saltRounds = 10 // The cost of processing data
            const salt = bcrypt.genSaltSync(saltRounds) // Random values, always different even if have same password ; $2b$04$fWAnVTR.nTIhaXIIekbM6.
            const hash = bcrypt.hashSync(password, salt) // Hash password with salt or number saltrounds
            const tokenEmail = crypto.randomBytes(10).toString("hex")
            const picture = req.file.filename
            const imageURL = `http://localhost:8000/public/${picture}`
            const link = `http://localhost:8000/auth/verify/${tokenEmail}`
            const checkEmail = await models.checkEmail(email)
            if (checkEmail[0]) {
                throw response(res, 400, {msg: "email already exist"})
            }
            const result = await models.register(email, hash, imageURL, role, first_name, last_name, phone_number, tokenEmail)
            sendMail(email, "email verification", link)
            return response(res, 200, result)
        } catch (error) {
            console.log(error);
            const picture = req.file.filename
            fs.unlinkSync(`public/${picture}`)
            return response(res, 500, error)
        }
    },

    verifyEmail: async(req, res) => {
        try {
            const token_verify = req.params.token
            const checkEmail = await models.verifyEmail(token_verify)
            if (!checkEmail) {
                return response(res, 401, {msg: "Email has not been registered"})
            }
            const user = checkEmail[0]
            if (user.email_verify === true) {
                return response(res, 401, {msg: "email has been verified"})
            }

            const result = await models.updateVerify(user.user_id)
            return response(res, 200, result)
        } catch (err) {
            return response(res, 500, err)
        }
    },

    login: async(req, res) => {
        try {
            const {email, password} = req.body
            const result = await models.checkEmail(email)
            const user = result[0]
            if (!user) {
                return response(res, 401, {msg: "Email or Password wrong"})
            }
            if (user.email_verify === false) {
                return response(res, 401, {msg: "Email must be verified"})
            }
            const compared = bcrypt.compareSync(password, user.password)
            if (!compared) {
                return response(res, 401, {msg: "Email or Password wrong"})
            }
            delete user.password

            const token = `Bearer ${jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'})}`
            const data = {user, token}
    
            return response(res, 200, data)
        } catch (error) {
            console.log(error);
            return response(res, 500, error)
        }
    }
    
}