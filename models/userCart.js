const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
    name: String,
    details: String,
    price: Number,
    quantity: Number,
    category: String
});

const userCart = mongoose.model('userCart', userCartSchema);

module.exports = userCart;