const mongoose = require('mongoose');

const minorInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
        required: true
    },
    desc: {
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
    like: [{
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
    }],
    love: [{
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
    }],
});

const MinorInfo = mongoose.model("MinorInfo", minorInfoSchema);

module.exports = MinorInfo;