const async = require('async');
const crypto = require('crypto');
const levelup = require('levelup');
const rpc = require('node-json-rpc');
const util = require('./util.js');

// Get config
const config = require('./config.js');

// Set leveldb
const db = levelup('./mydb')

// web3 host
const web3_client = util.web3_client;

//Given an email address, send a verification email with a hash.
// The hash is generated and stored locally.
// req.body = {
//    email: <string>
// }
exports.send_email = function(req,res) {
    //var salt = bcrypt.genSaltSync(config.secrets.hash_rounds);
    //var hash = bcrypt.hashSync(req.body.email, salt);
    var hash = crypto.createHash('sha256').update(req.body.email).digest("hex");
    db.put(hash, req.body.email, function(err){
        if (err) { res.send(500, {error: err}) }
        else {
            util.send_email(req.body.email, hash, function(err){
                if (err) { res.send(500, {error: err}) }
                else { res.send(200, {msg: "success"}) }
            });
        };
    });
}


// Find a provided hash in the local LevelDB. If it exists, register
//  the email on the Ethereum blockchain.
// req.params = {
//    hash: <string>
// }
exports.validate_email = function(req, res){
    db.get(req.params.hash, function (err, value) {
        if (err) { res.send(500, {error: err}) }
        else {
            res.send(200, {msg: value})
        }
    })
}


// Generate a new pair of keys if a key was provided. Otherwise, Generate
// a new keychain and return it.
exports.get_keys = function(req, res){
    if (req.body.password){
        util.generate_wallet(req.body.password, function(wallet){
            res.send(200, {data: wallet});
        });
    }
    else {
        res.send(500, {msg: "Please provide a password."})
    }
};

// Check the latest block
exports.block = function(req, res){
    util.latest_block(web3_client, function(err, block){
        if (err) { res.send(500, {error: err}) }
        else { res.send(200, {block: block}) }
    });
};
