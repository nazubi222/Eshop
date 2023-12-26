const mongoose = require('mongoose')

const arr = []
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: String, default : "0" },
        description: { type: String, default : "" },
        discount: { type: String, default : "0" },
        sold: { type: Number, default : 0 }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;