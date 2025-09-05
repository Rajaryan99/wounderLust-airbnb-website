const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require('./schema.js');

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')))


main().then(() => {
    console.log('connected successfully');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wounderLust');
}

app.get('/', (req, res) => {
    res.send('hi, this is root')
});

//index route
app.get('/listings', wrapAsync(async (req, res) => {
    const allListing = await listing.find({});
    res.render('listings/index', { allListing });
}));

//new route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})

//show route
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/show', { listing: listingDetails })
}));

// create new listings
app.post('/listings', wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
        throw new ExpressError(400, result.error);
    }
    let newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings')

}));


//edit route
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/edit.ejs', { listing: listingDetails })
}));

// update route
app.put('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// delete route

app.delete('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect('/listings');
}));

// app.get('/testListing', (req, res) => {
//     let sampleListing = new listing({
//         title: 'My new Villa',
//         description: "Above the sky...",
//         price: 1200,
//         location: 'Banglore',
//         country: 'India'
//     });

//     sampleListing.save();
//     console.log(sampleListing);
//     res.send('data saved successfully');
// });

// app.all('*', (req, res, next) => {
//     next(new ExpressError(404, 'Page Not Found!'));
// });

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.render('error.ejs', { message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});