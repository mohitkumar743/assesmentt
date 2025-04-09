const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  brand: String,
  price: Number,
  image: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
