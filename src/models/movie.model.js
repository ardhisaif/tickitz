const models = {}
const db = require('../database/connection')

models.getAll = async (filter, limit, offset) => {
    try {
        const res = await db.query(`SELECT * FROM movies ORDER BY ${filter} LIMIT $1 OFFSET $2`, [limit, offset]) // sort data by filter dan memberikan pagination
        return res.rows
    } catch (err) {
        throw err
    }
}

models.getByName = (name, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM movies WHERE name LIKE '%${name}%' LIMIT $1 OFFSET $2`, [limit, offset]) // mengunakan LIKE untuk search by name 
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.getDetail = async (id) => {
    try {
        const res = await db.query(`SELECT * FROM movies WHERE movie_id=${id}`) 
        return res.rows
    } catch (err) {
        throw err
    }
}


models.addMovie = ({ name, directed_by, casts, genres , release_date , duration, synopsis, image }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.movies (name, directed_by, casts, genres , release_date , duration, synopsis, image ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING movie_id, name;`,
            [name, directed_by, casts, genres , release_date , duration, synopsis, image ]
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.updateMovie = ({ name, directed_by, casts, genres , release_date , duration, synopsis, image, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.movies SET name = $1, directed_by = $2, casts = $3, genres =$4, release_date = $5, duration = $6, synopsis = $7, image =$8, updated_at = now() WHERE movie_id = $9 RETURNING movie_id;`,
            [name, directed_by, casts, genres , release_date , duration, synopsis, image, id ]
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.deleteMovie = ({id}) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM public.movies WHERE movie_id = $1 RETURNING movie_id;`,
            [id]
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


module.exports = models
