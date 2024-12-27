const mongoose = require('mongoose');

const authorInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const AuthorInfo = mongoose.model("AuthorInfo", authorInfoSchema);

module.exports = AuthorInfo;