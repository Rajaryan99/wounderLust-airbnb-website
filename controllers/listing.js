const listing = require('../models/listing');


module.exports.index = async (req, res) => {
    const allListing = await listing.find({});
    res.render('listings/index', { allListing });
};

module.exports.renderNewFrom = (req, res) => {
    res.render('listings/new.ejs')
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id).populate('reviews').populate('owner');
    if (!listingDetails) {
        req.flash('error', "Page Not Found '_'");
        return res.redirect('/listings');
    }
    res.render('listings/show', { listing: listingDetails })
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename)
    let newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', "New Listing Created!");
    res.redirect('/listings');

};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listingDetails = await listing.findById(id);
    if (!listingDetails) {
        req.flash('error', "Page Not Found '_'");
        return res.redirect('/listings');
    }
    res.render('listings/edit.ejs', { listing: listingDetails })
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash('success', "Listing Deleted");
    res.redirect('/listings');
};