const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Inventory = require('./models/inventory.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

const seedItems = [
    { 
        name: "Typology Tinted Serum", 
        details: "A silicone-free, non-clogging tinted serum for light coverage and a natural, no-makeup finish. Formulated with vitamin C for radiance and squalane & aloe vera for deep, long-lasting hydration. 99% naturally derived. Vegan. Made in France.", 
        price: 44.90,
        quantity: 3,
        category: "makeup",
        image: "/img/makeup/tinted-serum.png"
    },
    { 
        name: "Typology Tinted Concealer",
        details: "This medium-high coverage tinted concealer is enriched with caffeine, niacinamide, and cornflower hydrolate to reduce the appearance of dark circles and puffiness, instantly and long term. It can also be used to conceal blemishes or redness. 97% naturally derived. Vegan. Made in France.", 
        price: 34.50,
        quantity: 3,
        category: "makeup",
        image: "/img/makeup/tinted-concealer.png"
    },
    { 
        name: "Typology Lip Oil in Powder Pink", 
        details: "Enriched with squalane, jojoba oil, and vitamin E, this tinted oil subtly colors the lips, delivering nutrition and suppleness with a glossy, non-sticky finish. Formulated without mineral oils and silicones. 98% naturally derived. Vegan. Made in France.", 
        price: 29.90,
        quantity: 3,
        category: "makeup",
        image: "/img/makeup/lip-oil.png"
    },
    { 
        name: "Typology Mattifying Loose Powder", 
        details: "Enriched with Zinc PCA, this loose powder absorbs excess sebum for an immediate and long-lasting matte finish. Formulated without talc, silicones or nanoparticles. Suitable for all skin tones. 97% naturally derived. Vegan. Made in France.", 
        price: 33.40,
        quantity: 3,
        category: "makeup",
        image: "/img/makeup/matte-powder.png"
    }
];

async function seedInventory() {
    try {
        await Inventory.deleteMany(); // Clear existing items
        await Inventory.insertMany(seedItems); // Insert new items
        console.log('Inventory has been seeded!');
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
}

seedInventory();
