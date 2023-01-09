const express = require('express')
const routers = express.Router()

const movie = require('./movie.router')
const schedule = require('./schedule.router')
const booking = require('./booking.router')
const auth = require('./auth.router')

routers.get("/", (req, res) => {
    res.send("masuk")
})

routers.use("/movie", movie)
routers.use("/schedule", schedule)
routers.use("/booking", booking)
routers.use("/auth", auth)

module.exports = routers
