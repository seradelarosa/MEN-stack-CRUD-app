const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const UserCart = require('./models/userCart.js');
const Inventory = require('./models/inventory.js');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

//=== middleware ========================================

app.use(express.urlencoded({ extended: false }));
//override using a query value
app.use(methodOverride('_method'));
app.use(morgan('dev'));
//for styling
const path = require('path');
//for inventory images
app.use(express.static(path.join(__dirname, 'public')));

//=== GETS ============================================== 

// home page
app.get('/', async (req, res) => {
    //fetch all inventory items
    const allItems = await Inventory.find();
    res.render('index.ejs', { inventory: allItems });

    if (!allItems) {
        console.log(err);
        res.status(500).send('Error fetching items');
    };
});

//GET specific item
app.get('/item/:id', async (req, res) => {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
        return res.status(404).send('Item not found');
    }

    res.render('item/details.ejs', { item });
});

// GET cart
app.get('/cart', async (req, res) => {
    // pull all items from the userCart collection
    const cartItems = await UserCart.find();

    res.render('cart/cart.ejs', { cartItems });
});

// GET filter by categories
app.get('/category/:category', async (req, res) => {
    const category = req.params.category;

    const inventory = await Inventory.find({ category: category });
    res.render('index.ejs', { inventory });
});


//=== POST ======================================================

// add item to cart
app.post('/add-to-cart/:id', async (req, res) => {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
        return res.status(404).send('Item not found');
    }

    // if quantity is not a number or empty, default to 1
    const quantity = parseInt(req.body.quantity) || 1;

    // Create and save the cart item in one step
    await UserCart.create({
        name: item.name,
        details: item.details,
        price: item.price,
        quantity: quantity,
        category: item.category,
        image: item.image
    });

    // now fetch all cart items from UserCart collection
    const cartItems = await UserCart.find();

    // redirect to the cart page and pass all cart items
    res.render('cart/cart.ejs', { cartItems });
});

//update quantity of an item in cart
app.post('/cart/update/:id', async (req, res) => {
    const itemId = req.params.id;
    // default to 1 if invalid
    const newQuantity = parseInt(req.body.quantity) || 1;

    await UserCart.findByIdAndUpdate(itemId, { quantity: newQuantity });

    // refresh cart page
    res.redirect('/cart');
});


//=== DELETE =====================================================

app.delete('/cart/:id', async (req, res) => {
    const itemId = req.params.id;
    console.log('Deleting item with ID:', itemId);

    await UserCart.findByIdAndDelete(itemId);
    res.redirect('/cart');
});

//=======================================================

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});

module.exports = app; 