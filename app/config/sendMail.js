/*
required files
*/
require('dotenv').config();

const nodemailer = require('nodemailer');

/**
 * sendEmailFunction
 * @param {String} url - Verification URL or reset password link
 */
exports.sendmailServices = (url, subject) => {
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST,
        address: process.env.ADDRESS,
        secureConnection: false,
        port: process.env.MAIL_PORT,
        /*
        email and password are hidden by using of env file
        */
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });

    // Define mail options
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_FROM,
        subject: subject,
        text: 'Please go through the email verification link provided in this mail:\n\n' + url
    };

    /*
    send mail from given mail id, by using authorization info
    */
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Error occurred while sending mail:", err);
        } else {
            console.log('Result of sending mail:', info);
        }
    });
};

