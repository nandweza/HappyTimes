const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    blogimg: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);