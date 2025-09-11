const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const { listingSchema } = require('../schema.js');
const listing = require('../models/listing.js');



//Validate listing

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}


//index route
router.get('/', wrapAsync(async (req, res) => {
    const allListing = await listing.find({});
    res.render('listings/index', { allListing });
}));

//new route
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})

//show route
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id).populate('reviews');
    res.render('listings/show', { listing: listingDetails })
})
);

// create new listings
router.post('/', validateListing, wrapAsync(async (req, res, next) => {
    let newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings')

}));


//edit route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    res.render('listings/edit.ejs', { listing: listingDetails })
}));

// update route
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// delete route

router.delete('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect('/listings');
}));

module.exports = router;