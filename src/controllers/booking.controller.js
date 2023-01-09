const controllers = {}
const models = require('../models/booking.model')
const response = require('../helpers/response')

controllers.getData = async (req, res) => {
    try {
        const {user_id} = req.userData
        const {limit, page} = req.query
        const pageInt = page ? parseInt(page) : 1 //
        const limitInt = limit ? parseInt(limit) : 3
        const offset = pageInt === 1 ? 0 :(pageInt - 1) * limitInt
        const result = await models.getAll(user_id, limitInt, offset)
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.addData = async (req, res) => {
    try {
        const {schedule_id, seat, paid, ticket_used, qr_code} = req.body
        const {user_id} = req.userData
        const result = await models.addBooking({schedule_id, user_id, seat, paid, ticket_used, qr_code})
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.updateData = async (req, res) => {
    try {
        const {schedule_id, seat, paid, ticket_used, qr_code} = req.body
        const id = req.params.id
        const {user_id} = req.userData
        const result = await models.updateBooking({schedule_id, user_id, seat, paid, ticket_used, qr_code, id})
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.deleletData = async (req, res) => {
    try {
        const {user_id} = req.userData
        const result = await models.deleteBooking( user_id )
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

module.exports = controllers
