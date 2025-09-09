const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1000&auto=format&fit=crop&q=60",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1000&auto=format&fit=crop&q=60"
                    : v,
        },
    },

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});


const listing = mongoose.model('listing', listingSchema);
module.exports = listing;