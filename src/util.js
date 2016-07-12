const keythereum = require('keythereum');
const nodemailer = require('nodemailer');
const Web3 = require('web3');
const config = require('./config.js')

/*
 * EMAIL SETUP
 *
 * Given a hash, send an email with a URL that can be used to verify
 * the email address.
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
    const url = "http://emailether.info/register/"+hash
    const mailtext = "Hello and welcome to the blockchain!"
          +" Please click on the link, set up your wallet address, "
          +" and you're done!\n\n" + url

    const mailOptions = {
        to: email,
        subject: "Registration with Email Ether",
        text: mailtext
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
      if (error) { callback(error) }
      else { callback(null) }
    });
};

/*
 * KEY SETUP
 *
 * Create a new set private/public key set and a new address.
 *
 * TODO: Investigate potential security risk. This data will be
 * sent over the wire and without https, this will be bad.
 * Need to either encrypt this before res.send or get https
 * (or perhaps both).
 */

exports.generate_wallet = generate_wallet;
function generate_wallet(pass, callback){
    const params = { keyBytes: 256, ivBytes: 16 };
    keythereum.create(params, function(dk){
        const options = {
            kdf: "pbkdf2",
            cipher: "aes-128-ctr",
            kdfparams: {
                c: 262144,
                dklen: 32,
                prf: "hmac-sha256"
            }
        };
        keythereum.dump(pass, dk.privateKey, dk.salt, dk.iv, options, function(keyObj){
            callback(keyObj);
        });
    });

}


/*
 * WEB3 SETUP
 *
 * Hook in a geth process with web3.js
 */

function setup_web3(){
    const web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.web3_host));
    return web3;
}
exports.web3_client = setup_web3();


/*
 * WEB3 FUNCTIONS
 *
 * Functions to interact with web3 host.
 */

// Get latest block for making sure a connection exists.
exports.latest_block = latest_block;
function latest_block(client, callback){
    client.eth.getBlock("latest", function(err, result){
        if (err) { callback(err); }
        else { callback(null, result); }
    });
};

