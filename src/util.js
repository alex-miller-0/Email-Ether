var nodemailer = require('nodemailer');
var config = require('./config.js')

/*
EMAIL SETUP
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: config.email.user,
  	  pass: config.email.password
    }
});

exports.send_email = send_email;
function send_email(email, hash, callback){
    var url = "http://emailether.info/register/"+hash
    var mailtext = "Hello and welcome to the blockchain!"
          +" Please click on the link, set up your wallet address, "
          +" and you're done!\n\n" + url

    var mailOptions = {
        to: email,
        subject: "Registration with Email Ether",
        text: mailtext
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
      if (error) { callback(error) }
      else { callback(null) }
    });
};
