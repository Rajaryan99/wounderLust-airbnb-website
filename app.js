const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require('path');

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


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

//show route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/show', { listing: listingDetails })
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