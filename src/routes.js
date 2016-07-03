var async = require('async');
var crypto = require('crypto');
var levelup = require('levelup');
var rpc = require('node-json-rpc');
var bcrypt = require('bcrypt');

// Get config
var config = require('./config.js');

// Set leveldb
var db = levelup('./mydb')


//Given an email address, send a verification email with a hash.
// The hash is generated and stored locally.
// req.body = {
//    email: <string>
// }
exports.send_email = function(req,res) {
    //var salt = bcrypt.genSaltSync(config.secrets.hash_rounds);
    //var hash = bcrypt.hashSync(req.body.email, salt);
    var hash = crypto.createHash('sha256').update(req.body.email).digest("hex");
    console.log("hash", hash);
    db.put(hash, req.body.email, function(err){
        if (err) { res.send(500, {error: err}) }
        else { res.send(200, {msg: "success"}) };
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
    if (req.body.keys){
        res.send(200, {msg: "The keys are here!"})
    }
    else {
        res.send(200, {msg: "Keys generated!"})
    }
}
