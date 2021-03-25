const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    stoneNum: String,
    name: String,
    carat: String,
    shape: String,
    price: Number,
    size: String,
    content: String,
    img: String,
    amount: { required: false, type: Number }
});

const cartSchema = new Schema({
    userId: String,
    items: { type: [productsSchema] },
    totalQty: Number,
    totalPrice: Number
});

module.exports = mongoose.model('cart', cartSchema);