// seeder.js (run once with node seeder.js -i or node seeder.js -d)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected for seeding'))
    .catch(err => {
        console.error('DB connection error:', err);
        process.exit(1);
    });

// Sample data - 15 products
const products = [
    {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound.',
        price: 249.99,
        countInStock: 18,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        category: 'Electronics',
        brand: 'Sony',
        rating: 4.7,
        numReviews: 142,
        isFeatured: true,
    },
    {
        name: '4K Smart TV 55-inch',
        description: 'Ultra HD LED TV with built-in streaming apps, AI picture optimization, and voice control.',
        price: 549.00,
        countInStock: 7,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f69d1f',
        category: 'Electronics',
        brand: 'LG',
        rating: 4.5,
        numReviews: 89,
    },
    {
        name: 'Air Max Running Shoes Men',
        description: 'Lightweight, breathable running shoes with excellent cushioning and stylish design.',
        price: 129.99,
        countInStock: 45,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        category: 'Sports',
        brand: 'Nike',
        rating: 4.8,
        numReviews: 210,
    },
    {
        name: 'Organic Skincare Set',
        description: 'Natural face cream, serum, and cleanser bundle – suitable for all skin types.',
        price: 64.50,
        countInStock: 22,
        image: 'https://images.unsplash.com/photo-1570194066981-617ac1bc49b3',
        category: 'Beauty',
        brand: 'The Ordinary',
        rating: 4.6,
        numReviews: 67,
    },
    {
        name: 'Stainless Steel Kitchen Knife Set',
        description: '8-piece professional knife set with ergonomic wooden handles – includes chef, paring, and carving knives.',
        price: 89.99,
        countInStock: 14,
        image: 'https://images.unsplash.com/photo-1556911220-b0b895fafb40',
        category: 'Home & Kitchen',
        brand: 'Sabatier',
        rating: 4.4,
        numReviews: 53,
    },
    {
        name: 'RGB Wireless Gaming Mouse',
        description: 'Rechargeable honeycomb design gaming mouse with adjustable DPI and vibrant RGB lighting.',
        price: 39.99,
        countInStock: 38,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39d7',
        category: 'Electronics',
        brand: 'VEGCOO',
        rating: 4.3,
        numReviews: 112,
    },
    {
        name: 'Fitness Smartwatch',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery.',
        price: 149.00,
        countInStock: 19,
        image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e',
        category: 'Sports',
        brand: 'Fitbit',
        rating: 4.5,
        numReviews: 98,
    },
    {
        name: 'Summer Floral Maxi Dress',
        description: 'Lightweight, flowy summer dress with ruffle sleeves and vibrant floral print – perfect for casual outings.',
        price: 52.99,
        countInStock: 31,
        image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1',
        category: 'Fashion',
        brand: 'CM.YAYA',
        rating: 4.6,
        numReviews: 74,
    },
    {
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof, 20W portable speaker with deep bass, 12-hour playtime, and built-in microphone.',
        price: 59.99,
        countInStock: 26,
        image: 'https://images.unsplash.com/photo-1605640840602-14ac0a8b55b7',
        category: 'Electronics',
        brand: 'JBL',
        rating: 4.7,
        numReviews: 156,
    },
    {
        name: 'Drip Coffee Maker 5-Cup',
        description: 'Compact stainless steel coffee maker with programmable timer and keep-warm function.',
        price: 44.99,
        countInStock: 12,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        category: 'Home & Kitchen',
        brand: 'Krups',
        rating: 4.4,
        numReviews: 48,
    },
    {
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches, anti-ghosting, and durable aluminum frame.',
        price: 79.99,
        countInStock: 21,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        category: 'Electronics',
        brand: 'Redragon',
        rating: 4.5,
        numReviews: 92,
    },
    {
        name: 'Yoga Mat Non-Slip',
        description: 'Extra thick, eco-friendly yoga mat with alignment lines and carrying strap.',
        price: 29.99,
        countInStock: 55,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b881f144',
        category: 'Sports',
        brand: 'Gaiam',
        rating: 4.6,
        numReviews: 134,
    },
    {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated 1L bottle keeps drinks cold for 24 hours or hot for 12 hours – leak-proof.',
        price: 24.99,
        countInStock: 68,
        image: 'https://images.unsplash.com/photo-1602488289407-91a70d9826e7',
        category: 'Sports',
        brand: 'Hydro Flask',
        rating: 4.8,
        numReviews: 187,
    },
    {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with noise cancellation, touch controls, and 28-hour total battery life.',
        price: 89.99,
        countInStock: 15,
        image: 'https://images.unsplash.com/photo-1605640840602-14ac0a8b55b7',
        category: 'Electronics',
        brand: 'Anker Soundcore',
        rating: 4.5,
        numReviews: 103,
    },
    {
        name: 'Adjustable Dumbbell Set (Pair)',
        description: 'Quick-adjust dumbbells from 5-52.5 lbs each – space-saving home gym solution.',
        price: 299.99,
        countInStock: 9,
        image: 'https://images.unsplash.com/photo-1586401100292-0d7fea46ccce',
        category: 'Sports',
        brand: 'Bowflex',
        rating: 4.7,
        numReviews: 65,
    },
];

// For simplicity, use an existing admin user (find by email)
const seedDB = async () => {
    try {
        // Optional: clear existing products
        // await Product.deleteMany({});

        const adminUser = await User.findOne({ email: 'admin@example.com' }); // ← change to your admin email

        if (!adminUser) {
            console.log('No admin user found. Create one first.');
            process.exit(1);
        }

        // Helper to generate slug from name (same logic as your pre-save hook)
        function generateSlug(name) {
            return name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        const productsWithCreator = products.map(p => ({
            ...p,
            slug: generateSlug(p.name),
            createdBy: adminUser._id,
        }));

        await Product.insertMany(productsWithCreator);
        console.log('15 products seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await Product.deleteMany({});
        console.log('Products deleted!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    seedDB();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Use: node seeder.js -i  (import)  or  node seeder.js -d  (delete)');
}