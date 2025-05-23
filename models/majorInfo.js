const mongoose = require('mongoose');

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/blogs');
// }

// main()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    filename: { type: String, required: true }
  });


const majorInfoSchema = new mongoose.Schema({
    submajor: [
        {
            subtitle: String,
            subdescription: String
        }
    ],
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.ObjectId,
        ref: "AuthorInfo",
        required: true
    },
    img: {
        type: ImageSchema,
        _id : false,
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

const majorInfo = mongoose.model("MajorInfo", majorInfoSchema);

module.exports = majorInfo;