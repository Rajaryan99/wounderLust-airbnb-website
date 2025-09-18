const Review = require('../models/review.js');
const listing = require('../models/listing.js');

module.exports.createReview = async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let { id } = req.params;
    let newReview = new Review(req.body.review);

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    console.log('new review Saved');
    res.redirect(`/listings/${id}`);
};


module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Review Deleted");

    res.redirect(`/listings/${id}`)
};
