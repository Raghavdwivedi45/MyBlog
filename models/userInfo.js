const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    } 
});

userInfoSchema.plugin(passportLocalMongoose);
const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;