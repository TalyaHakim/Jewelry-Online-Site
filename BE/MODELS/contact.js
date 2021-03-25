const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    email: String,
    message: String
});

module.exports = mongoose.model('contact', contactSchema);