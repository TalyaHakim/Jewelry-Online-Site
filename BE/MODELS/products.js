const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    stoneNum:String,
    name:String,
    carat:String,
    shape:String,
    price:String,
    size:String,
    content:String,
    img:String,
    amount: { required: false, type: Number }
});

module.exports = mongoose.model( 'products' , productsSchema);