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


//Reviews Post routes

router.post('/', validateReviews, wrapAsync(async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let { id } = req.params;
    let newReview = new Review(req.body.review);

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    console.log('new review Saved');
    res.redirect(`/listings/${id}`);
}));


//delete review route
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
})
);

module.exports = router;