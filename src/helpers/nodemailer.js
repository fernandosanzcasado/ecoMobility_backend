const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.LESS_SECURE_APP_PASSWORD,
  },
  port: 465,
  host: "smtp.gmail.com",
});

module.exports = transporter;
