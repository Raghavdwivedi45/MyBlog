const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const { authorValidate } = require("../schema.js");

module.exports.renderAllAuthors = async (req, res) => {
    let authors = await authorInfo.find({typ:"author"});
    res.render("authors.ejs", { authors });
}

module.exports.renderOneAuthor = async (req, res) => {
    let { id } = req.params;
    let authors = await authorInfo.findById(id);
    let authorMinors = await minorInfo.find({ author: id });
    let authorMajors = await majorInfo.find({ author: id });
    res.render("author.ejs", { authors, authorMinors, authorMajors });
}

module.exports.renderAuthorByName = async (req, res) => {
    let { authName } = req.query;
    let authors = await authorInfo.find({ name: authName, typ:"author" });
    res.redirect(`/authors/${authors.id}`);
}

module.exports.signup = async (req, res, next) => {
    authorValidate.validate(req.body);
    let currMail = await authorInfo.find({ email: req.body.mail });
    if (currMail.length > 0) {
        return next(new ExpressError(401, "This Email is already registered"));
    }
    let user = new authorInfo({
        name: req.body.name,
        username: req.body.username,
        email: req.body.mail,
        dateOfBirth: req.body.birthdate
    });
    if(req.body.type=="author") {
        user.description = req.body.description;
        user.img = {
            url : req.file.url,
            filename: req.file.filename
        };
        user.typ = "author";
    }
    console.log(user);
    // let regUser = await authorInfo.register(user, req.body.password);

    req.login(regUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Welcome to ArticleVerse. You successfully created your account");
        res.redirect("/");
    })
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to ArticleVerse. ");
    let redirectUrl = res.locals.redirectUrl || "/"
    res.redirect(redirectUrl);
};