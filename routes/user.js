var express = require('express');
var router = express.Router();
var bcrypty = require('bcryptjs');

var User = require('../models/user');

//create a user 
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        //salt the password as a one way encryption 
        password: bcrypty.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

module.exports = router; 