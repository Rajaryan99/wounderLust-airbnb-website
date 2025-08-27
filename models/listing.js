const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ddescription: String,
    image: {
        type: String,

    },
    price: Number,
    location: String,
    country: String,
});


const listing = mongoose.model('listing', listingSchema);
module.exports = listing;