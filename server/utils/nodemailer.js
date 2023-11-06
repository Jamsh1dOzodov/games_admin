const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SUPPORT_FROM,
        pass: process.env.SUPPORT_PASS
    }
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.err(err);
        return info;
    })
}

module.exports = mailer;


