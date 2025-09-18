const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const listing = require('../models/listing.js');



//validate reviews

const validateReviews = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

const reviewController = require('../controllers/reviews.js');

//Reviews Post routes

router.post('/', validateReviews, wrapAsync(reviewController.createReview));


//delete review route
router.delete('/:reviewId', wrapAsync(reviewController.deleteReview));

module.exports = router;