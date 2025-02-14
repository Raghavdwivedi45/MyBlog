const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const authorInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
        default: "/authors/img9.jpg"
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    typ: {
        type: String
    }
});

authorInfoSchema.plugin(passportLocalMongoose);
const AuthorInfo = mongoose.model("AuthorInfo", authorInfoSchema);

module.exports = AuthorInfo;