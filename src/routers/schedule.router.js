const express = require('express')
const routers = express.Router()
const controllers = require('../controllers/schedule.controller')
const {authentication} = require("../middleware/auth.middleware")
const {isAdmin} = require("../middleware/auth.middleware")

routers.get('/', authentication, controllers.getData)
routers.post('/', authentication, isAdmin, controllers.addData)
routers.put('/:id',authentication, isAdmin, controllers.updateData)
routers.delete('/:id',authentication, isAdmin, controllers.deleletData)

module.exports = routers