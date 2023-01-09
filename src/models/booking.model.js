const models = {}
const db = require('../database/connection')

models.getAll = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from bookings b inner join schedules s on b.schedule_id = s.schedule_id where user_id =$1 LIMIT $2 OFFSET $3`, [id, limit, offset]) // JOIN untuk mendapatkan data dari foreign key
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.addBooking = ({ schedule_id, user_id, seat, paid, ticket_used, qr_code}) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.bookings (schedule_id, user_id, seat, paid, ticket_used, qr_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING booking_id;`,
            [schedule_id, user_id, seat, paid, ticket_used, qr_code]
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.updateBooking = ({ schedule_id, user_id, seat , paid, ticket_used, qr_code ,id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.bookings SET schedule_id = $1, user_id = $2, seat= $3, paid = $4, ticket_used = $5, qr_code = $6, updated_at = now() WHERE booking_id = $7 RETURNING booking_id;`,
            [schedule_id, user_id, seat , paid, ticket_used, qr_code, id ]
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

models.deleteBooking = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM public.bookings WHERE booking_id = $1 RETURNING booking_id;`,
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
