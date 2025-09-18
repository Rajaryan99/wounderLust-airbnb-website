const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const { listingSchema } = require('../schema.js');
const listing = require('../models/listing.js');
const { isLoggedIn } = require('../middleware.js');
const listingController = require('../controllers/listing.js');



//Validate listing

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


//index route
router.get('/', wrapAsync(listingController.index));

//new route
router.get('/new', isLoggedIn, listingController.renderNewFrom);

//show route
router.get('/:id', wrapAsync(listingController.showListing));


// create new listings
router.post('/', isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//edit route
router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));

// update route
router.put('/:id', isLoggedIn, validateListing, wrapAsync(listingController.updateListing));


// delete route
router.delete('/:id', isLoggedIn, wrapAsync(listingController.deleteListing));

module.exports = router;