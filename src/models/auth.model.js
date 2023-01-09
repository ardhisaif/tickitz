const db = require("../database/connection");

module.exports = {
    register: (email, password, picture, role, first_name, last_name, phone_number, token_verify) => {
        return new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO users
                ( first_name, last_name, phone_number, email, password, picture, role, token_verify)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING email, role, picture
            `, [ first_name, last_name, phone_number, email, password, picture, role, token_verify])
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },

    checkEmail : (email) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT * FROM users 
                WHERE email=$1
            `, [email])
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },

    verifyEmail : (token_verify)=> {
        return new Promise((resolve, reject) => {
            db.query(`
                select * from users where token_verify=$1 
            `, [token_verify])
            .then((res)=> {
                resolve(res.rows)
            })
            .catch((err)=> {
                reject(err)
            })
        })
    },

    updateVerify : (user_id)=> {
        return new Promise((resolve, reject) => {
            db.query(`
                update users set email_verify=true where user_id=$1 RETURNING email_verify
            `, [user_id])
            .then((res)=> {
                resolve(res.rows)
            })
            .catch((err)=> {
                reject(err)
            })
        })
    },

}
