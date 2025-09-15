const express = require('express');
const session = require('express-session');
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOption = {
    secret: 'mySessionCode',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOption));
app.use(flash());

app.get('/register', (req, res) => {
    let { name = 'anonymous' } = req.query;
    req.session.name = name;
    req.flash('success', 'user registerd successfully')
    res.redirect('/hello');
});

app.get('/hello', (req, res) => {
    res.render('page.ejs', { name: req.session.name, msg: req.flash("success") })
})

app.get('/test', (req, res) => {
    res.send('test Successful');
});

// app.get('/reqCount', (req, res) => {
//     if (req.session.count) {
//         req.session.count++
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`You semd request ${req.session.count} times..`)
// })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

