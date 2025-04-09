// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: "Awesome Lamp",
    category: "Lighting",
    brand: "Poliform",
    price: 200,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Cool Flower",
    category: "Decoration",
    brand: "Edra",
    price: 400,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Cozy Sofa",
    category: "Furniture",
    brand: "Kartell",
    price: 1300,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Awesome Candle",
    category: "Lighting",
    brand: "Roche Bobois",
    price: 1200,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Fancy Chair",
    category: "Furniture",
    brand: "Poliform",
    price: 1000,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Chinese Teapot",
    category: "Decoration",
    brand: "Edra",
    price: 900,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Bathroom Mirror",
    category: "Bath & Shower",
    brand: "Kartell",
    price: 800,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Kids Toy Car",
    category: "Toys",
    brand: "Roche Bobois",
    price: 705,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  },
  {
    name: "Luxury Curtains",
    category: "Curtains",
    brand: "Poliform",
    price: 500,
    image: "https://flatlogic-ecommerce-backend.herokuapp.com/images/products/2.png"
  }
];
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected.');

    // await Product.deleteMany({});
    await Product.insertMany(products);
    // console.log('Data deleted successfully!');
    console.log('Data seeded successfully!');

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });