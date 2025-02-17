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
    console.log(item);
});

//=======================================================

app.listen(3000, () => {
    console.log('listening on port 3000');
});