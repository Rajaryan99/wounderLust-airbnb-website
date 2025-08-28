const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


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
app.get('/listings', async (req, res) => {
    const allListing = await listing.find({});
    res.render('listings/index', { allListing });
});

//new route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})

//show route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/show', { listing: listingDetails })
});

// create new listings
app.post('/listings', (req, res) => {
    let newListing = new listing(req.body.listing);
    newListing.save();
    res.redirect('/listings')

});

//edit route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/edit.ejs', { listing: listingDetails })
});

// update route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

// delete route

app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect('/listings');
})

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

app.listen(port, () => {
    console.log(`Server is running on http://localost:${port}`);
})