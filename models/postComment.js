const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postCommentSchema = new Schema({
    addcomment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("PostComment", postCommentSchema);