const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.auth.js');

const app = express();

const port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')))

// Connecting Database  MONGODB
main().then(() => {
    console.log('connected successfully');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wounderLust');
}

app.get('/', (req, res) => {
    res.redirect('/listings')
});


//express sessions
const sessionOption = {
    secret: "mySuperSecretCode",
    resave: false,
    saveUninitialized: true,
    Cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption)); //passing sessionOption
app.use(flash()); //connect-flash to show message once

// User Authentication 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


//for storing the user auth (serializing) aand (deserialize)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// creating a fake user
app.get('/demouser', async(req, res) => {
    let fakeUser = new User({
        email: "fakeuser@gmail.com",
        username: "fake-user",
    });

   let registerUser = await User.register(fakeUser, "helloWorld") //pass the user and passWord
   res.send(registerUser);
});

// Listing routes
app.use('/listings', listings);

//reviews routes
app.use('/listings/:id/reviews', reviews);



app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.render('error.ejs', { message });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on http://localhost:${port}`);
});