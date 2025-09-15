const express = require('express');
const router = express.Router();
const User = require('../models/user.auth.js');
const wrapAsync = require('../utils/wrapAsync');

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash('success', "Welcome to WounderLust!");
        res.redirect('/listings');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/signup');
    }

}));

router.get('/login', (req, res) => {
    res.render('users/login.ejs');
});



module.exports = router;