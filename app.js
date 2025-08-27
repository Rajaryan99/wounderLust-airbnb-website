const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 8080;


main().then(() => {
    console.log('connected successfully');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.get('/', (req, res) => {
    res.send('hi, this is root')
})

app.listen(port, () => {
    console.log(`Server is running on http://localost:${port}`);
})