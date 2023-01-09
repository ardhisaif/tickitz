const express = require('express')
const routers = express.Router()
const {login} = require('../controllers/auth.controller')
const {register} = require('../controllers/auth.controller')
const {verifyEmail} = require('../controllers/auth.controller')
const {file} = require("../middleware/upload.middleware")

routers.post('/register', file, register)
routers.get('/verify/:token', verifyEmail)
routers.post('/login', login)

module.exports = routers