require('dotenv').config()
const express = require("express")
const server = express()
const router = require("./src/routers/index")
const db = require("./src/database/connection")
const {PORT} = process.env
const cors = require('cors')

server.use(cors())
server.use(express.json()) //untuk menangkap req json
server.use(express.urlencoded({extended: true}))
server.use(router)
server.use("/public", express.static("public"))

db.connect()
    .then(() => {
        console.log('database connected')
        server.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })