'use strict';
//var express = require('express');
//var router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


const ctrlProfile = require('./../controller/profile');
const ctrlAuth = require('./../controller/authentication');


// profile
module.exports = (app) => {
    app.route('/profile').get( auth, ctrlProfile.profileRead);

// authentication
    app.route('/register').post(ctrlAuth.register);
    app.route('/login').post(ctrlAuth.login);
}