const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,
    details: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
