var express = require('express');
var router = express.Router();
var bcrypty = require('bcryptjs');

var User = require('../models/user');

var jwt = require('jsonwebtoken');

//Sign up user
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        //salt the password as a one way encryption 
        password: bcrypty.hashSync(req.body.password, 10),
        email: req.body.email
    });

    User.findOne({ 'email': user.email }, function (err, foundUser) {
        if (foundUser !== null ) {
            if (foundUser.email == user.email) {
                return res.status(500).json({
                    title: 'Sign up error',
                    error: { message: 'Email already in use!' }
                });
            }
        }
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Sign up error',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });

});

//Sign in user 
router.post('/signin', function (req, res, next) {
    //find user based on email
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Error has occured in signIn',
                error: err
            });
        }
        if (!user) { //401 unauthorized
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }

        //compare passwords
        bcrypty.compareSync(req.body.password, user.password, function (err, match) {
            if (err) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: { message: 'Invalid login credentials' }
                });
            }
        });

        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router; 