const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

const shopItem = require('./models/shopItem.js')


//=== middleware ========================================

app.use(express.urlencoded({ extended: false }));
//override using a query value
app.use(methodOverride('_method'));
app.use(morgan('dev'));

//=== GETS ============================================== 

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});