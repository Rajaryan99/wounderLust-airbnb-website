const listing = require('../models/listing');


module.exports.index = async (req, res) => {
    const allListing = await listing.find({});
    res.render('listings/index', { allListing });
};