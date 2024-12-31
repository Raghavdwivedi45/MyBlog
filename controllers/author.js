const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");


module.exports.renderAllAuthors = async (req, res) => {
    let authors = await authorInfo.find();
    res.render("authors.ejs", { authors });
}

module.exports.renderOneAuthor = async (req, res) => {
    let { id } = req.params;
    let authors = await authorInfo.findById(id);
    let authorMinors = await minorInfo.find({author: id});
    let authorMajors = await majorInfo.find({author: id});
    res.render("author.ejs", { authors, authorMinors, authorMajors });
}
