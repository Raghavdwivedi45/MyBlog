const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");


module.exports.renderAllAuthors = async (req, res) => {
    let authors = await authorInfo.find();
    res.render("authors.ejs", { authors });
}

module.exports.renderOneAuthor = async (req, res) => {
    let { id } = req.params;
    let authors;
    if(id === 'search') {
        let {name} = req.query;
        authors = await authorInfo.findOne({name : name});
    }
    else {
        authors = await authorInfo.findById(id);
    }
    let authorMinors = await minorInfo.find({author: authors.id});
    let authorMajors = await majorInfo.find({author: authors.id});
    res.render("author.ejs", { authors, authorMinors, authorMajors });
}

module.exports.renderAuthorByName = async (req, res) => {
    let { authName } = req.query;
    let authors = await authorInfo.find({name: authName});
    res.redirect(`/authors/${authors.id}`);
}
