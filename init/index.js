const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');


main().then(() => {
    console.log('connected successfully');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wounderLust');
}

const intiDB = async () => {
    await listing.deleteMany({});
      initData.data =   initData.data.map((obj) => ({...obj, owner: '68c9bdae52c89d9217735a5c'}));
    await listing.insertMany(initData.data);
    console.log('data was initialized')
}

intiDB();