const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const UserCart = require('./models/userCart.js');
const inventory = require('./data/inventory.js');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

const shopItem = require('./models/userCart.js')


//=== middleware ========================================

app.use(express.urlencoded({ extended: false }));
//override using a query value
app.use(methodOverride('_method'));
app.use(morgan('dev'));
//for styling
const path = require('path');
//for static inventory
app.use(express.static(path.join(__dirname, 'public')));



//=== GETS ============================================== 

// home page
app.get('/', (req, res) => {
    res.render('index.ejs', { inventory: inventory } );
});

//=======================================================

app.listen(3000, () => {
    console.log('listening on port 3000');
});