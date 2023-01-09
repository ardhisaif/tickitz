const nodemailer = require("nodemailer")

const sendEmail = async (email, subject, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
          })

          transporter.sendMail({
            from: "noreply.gmail.com",
            to: email,
            subject: subject,
            text: `link verify email \n ` + link, 
            html: `<a href=${link}> Verify email <a>` 
          })
    } catch (error) {
        
    }
}

module.exports = sendEmail