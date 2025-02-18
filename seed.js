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
        quantity: 5,
        category: "makeup",
        image: "/img/makeup/tinted-serum.png"
    },
    { 
        name: "Typology Tinted Concealer",
        details: "This medium-high coverage tinted concealer is enriched with caffeine, niacinamide, and cornflower hydrolate to reduce the appearance of dark circles and puffiness, instantly and long term. It can also be used to conceal blemishes or redness. 97% naturally derived. Vegan. Made in France.", 
        price: 34.50,
        quantity: 5,
        category: "makeup",
        image: "/img/makeup/tinted-concealer.png"
    },
    { 
        name: "Typology Lip Oil in Powder Pink", 
        details: "Enriched with squalane, jojoba oil, and vitamin E, this tinted oil subtly colors the lips, delivering nutrition and suppleness with a glossy, non-sticky finish. Formulated without mineral oils and silicones. 98% naturally derived. Vegan. Made in France.", 
        price: 29.90,
        quantity: 5,
        category: "makeup",
        image: "/img/makeup/lip-oil.png"
    },
    { 
        name: "Typology Mattifying Loose Powder", 
        details: "Enriched with Zinc PCA, this loose powder absorbs excess sebum for an immediate and long-lasting matte finish. Formulated without talc, silicones or nanoparticles. Suitable for all skin tones. 97% naturally derived. Vegan. Made in France.", 
        price: 33.40,
        quantity: 5,
        category: "makeup",
        image: "/img/makeup/matte-powder.png"
    },
    { 
        name: "PanOxyl Acne Foaming Wash", 
        details: "Maximum strength formula antimicrobial foaming wash kills acne-causing bacteria and lifts dirt from pores for a fresher, clearer you.", 
        price: 9.28,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/panoxyl.png"
    },
    { 
        name: "COSRX Calming Liquid Intensive", 
        details: "An intensive, fast-action liquid that refreshes and purifies acne skin. Cooling, clearing care for troubled skin.", 
        price: 26.00,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/cosrx.png"
    },
    { 
        name: "Tirtir Milk Skin Toner", 
        details: "A moisturizing toner designed to hydrate, brighten and strengthen your skin. This vegan formula delivers long-lasting hydration while enhancing your skin's natural glow and fortifying its protective barrier.", 
        price: 25.00,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/tirtir.png"
    },
    { 
        name: "Retinol Cica Moisture Recovery Serum", 
        details: "A gentle, effective daily retinol serum with soothing Centella Asiatica that visibly smooths away dead skin cells and build up from pores to help promote healthy skin turnover.", 
        price: 37.00,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/innisfree.png"
    },
    { 
        name: "Mario Badescu Oil Free Moisturizer", 
        details: "Oil-free, non-greasy lightweight and ultra absorbent moisturizer without any pore clogging oils, specifically designed to be safe for sensitive skin. The simple formula is infused with skin brightening Lemongrass Extract and soothing, calming and moisturizing allantoin, to promote optimal skin health and a hydrated, balanced complexion.", 
        price: 20.00,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/mariobadescu.png"
    },
    { 
        name: "PanOxyl Adapalene Gel", 
        details: "Treat and clear acne with the first FDA-approved over-the-counter topical retinoid for acne treatment. Help treat and clear acne, oil-free and fragrance-free formula.", 
        price: 9.49,
        quantity: 5,
        category: "skincare",
        image: "/img/skincare/adapalene.png"
    },
    { 
        name: "Tara V-Neck Long Sleeve Top - Spring Grey Mix", 
        details: "V-neck, rib knit, stretchy, fitted, cropped. Machine wash cold", 
        price: 29.95,
        quantity: 5,
        category: "loungewear",
        image: "/img/loungewear/taragrey.png"
    },
    { 
        name: "Tara V-Neck Long Sleeve Top - Jet Black", 
        details: "V-neck, rib knit, stretchy, fitted, cropped. Machine wash, cold", 
        price: 29.95,
        quantity: 5,
        category: "loungewear",
        image: "/img/loungewear/tarablack.png"
    },
    { 
        name: "UltraFleece Straight Leg Sweatpants - Spring Grey Mix", 
        details: "Drawstring at elasticized waistband, three-pocket styling, ultra-soft fleece interior, logo embroidered, relaxed fit, high rise. Machine wash, cold.", 
        price: 59.95,
        quantity: 5,
        category: "loungewear",
        image: "/img/loungewear/fleecegrey.png"
    },
    { 
        name: "UltraFleece Straight Leg Sweatpants - Iron Forged Grey", 
        details: "Drawstring at elasticized waistband, three-pocket styling, ultra-soft fleece interior, logo embroidered, relaxed fit, high rise. Machine wash, cold.", 
        price: 59.95,
        quantity: 5,
        category: "loungewear",
        image: "/img/loungewear/fleeceironforged.png"
    }
];

async function seedInventory() {
    try {
        // clear existing items
        await Inventory.deleteMany(); 
         // insert new items
        await Inventory.insertMany(seedItems);
        console.log('Inventory has been seeded!');
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
}

seedInventory();
