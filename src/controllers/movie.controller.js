const controllers = {}
const models = require('../models/movie.model')
const response = require('../helpers/response')

controllers.getData = async (req, res) => {
    try {
        const {limit, page, filter} = req.query
        const filterVal = filter ? filter : "name" // untuk menjalankan fungsi sort by name, by created_at, by id etc; default name
        const pageInt = page ? parseInt(page) : 1 //
        const limitInt = limit ? parseInt(limit) : 3
        const offset = pageInt === 1 ? 0 :(pageInt - 1) * limitInt
        const result = await models.getAll(filterVal, limitInt, offset)
        const meta = {page: pageInt}
        return response(res, 200, result, meta)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.getDataByID = async (req, res) => {
    try {
        const {id} = req.params // untuk mendapatkan query params id
        console.log(+id);
        const result = await models.getDetail(+id)
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.getDataByName = async (req, res) => { // untuk menjalankan funsi search by name
    try {
        const {limit, page, name} = req.query
        const pageInt = page ? parseInt(page) : 1
        const limitInt = limit ? parseInt(limit) : 3
        const offset = pageInt === 1 ? 0 :(pageInt - 1) * limitInt
        const meta = {page: pageInt}
        console.log("masuk", name);
        const result = await models.getByName(name, limitInt, offset)
        return response(res, 200, result, meta)
    } catch (error) {
        console.log("masuk");
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.addData = async (req, res) => {
    try {
        const { name, directed_by, casts, genres , release_date , duration, synopsis, image } = req.body
        console.log(name, directed_by, casts, genres , release_date , duration, synopsis, image);
        const result = await models.addMovie({ name, directed_by, casts, genres , release_date , duration, synopsis, image })
        return response(res, 200, result, {message: "movie successfully created"})
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.updateData = async (req, res) => {
    try {
        const { name, directed_by, casts, genres , release_date , duration, synopsis, image } = req.body
        const id = req.params.id
        console.log(id);
        const result = await models.updateMovie({ name, directed_by, casts, genres , release_date , duration, synopsis, image, id })
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

controllers.deleletData = async (req, res) => {
    try {
        const {id} = req.params
        const result = await models.deleteMovie({ id })
        return response(res, 200, result)
    } catch (error) {
        console.log(new Error(error).message)
        return response(res, 500, error)
    }
}

module.exports = controllers
