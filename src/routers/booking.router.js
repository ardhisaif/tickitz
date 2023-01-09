const express = require('express')
const routers = express.Router()
const controllers = require('../controllers/booking.controller')
const {authentication} = require("../middleware/auth.middleware")
const {isUser} = require("../middleware/auth.middleware")

routers.get('/', authentication, isUser, controllers.getData)
routers.post('/', authentication, isUser, controllers.addData)
routers.put('/:id', authentication, isUser, controllers.updateData)
routers.delete('/:id', authentication, isUser, controllers.deleletData)

module.exports = routers