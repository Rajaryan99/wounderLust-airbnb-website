const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const { listingSchema } = require('../schema.js');
const listing = require('../models/listing.js');
const { isLoggedIn } = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); //temp



//Validate listing

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


router
    .route('/')
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(upload.single('listing[image]'), (req, res) => {
        res.send(req.file);
    });


//new route
router.get('/new', isLoggedIn, listingController.renderNewFrom);


router
    .route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.deleteListing));

//edit route
router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;