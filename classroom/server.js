const express = require('express');
const session = require('express-session');
const expressSession = require('express-session');

const app = express();

app.use(session({
    secret: 'mySessionCode',
    resave: false,
    saveUninitialized: true,
})
);


app.get('/test', (req, res) => {
    res.send('test Successful');
})

app.get('/reqCount', (req, res) => {
    if (req.session.count) {
        req.session.count++
    } else {
        req.session.count = 1;
    }

    res.send(`You semd request ${req.session.count} times..`)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

