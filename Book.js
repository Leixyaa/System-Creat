const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: { type: String, required: true }, // ´æ´¢ÎÄ¼þÂ·¾¶
});

module.exports = mongoose.model('Book', BookSchema);
