require('dotenv').config();
const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;



const oauth2Client = new OAuth2(
     process.env.OAUTH_CLIENTID, // ClientID
     process.env.OAUTH_CLIENT_SECRET, // Client Secret
     process.env.REDIRECT_URL // Redirect URL
);


oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

const mailOptions = {
    from: 'ecomobilityupc@gmail.com',
    to: 'marc.fonseca@estudiantat.upc.edu',
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project \n pta'
  };

transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
    console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
});



