var express = require('express');
var router = express.Router();
var express = require('bcryptjs');

var User = require('../models/user');

//create a user 
router.get('/', function (req, res, next) {
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
        if (!result) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: { message: "Message not found " }
            });
        }

        res.stauts(201).json({
            message: 'User created',
            obj: result
        });
    });

});

module.exports = router; 