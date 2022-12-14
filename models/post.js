const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    blogtitle: { type: String, required: true },
    blogimg: { type: String },
    blogcontent: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);