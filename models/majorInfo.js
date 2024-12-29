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

const majorInfoSchema = new mongoose.Schema({
    submajor: [
        { subtitle: String, 
          subdescription: String }
    ],
    title: {
        type: String,
        required: true
    },
    writername: {
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
});

const majorInfo = mongoose.model("MajorInfo", majorInfoSchema);

module.exports = majorInfo;