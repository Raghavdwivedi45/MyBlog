const { required } = require('joi');
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
    tag: {
        type: [String],
        default: []
    },
    like: [{
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
    }],
    love: [{
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
    }],
    comments: [{
        commentWriter : {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true,
        },
        typ: String,
        img: String
    }]
});

const MinorInfo = mongoose.model("MinorInfo", minorInfoSchema);

module.exports = MinorInfo;