const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");
const ExpressError = require("../utils/ExpressError.js");

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

module.exports.renderAuthorByName = async (req, res) => {
    let { authName } = req.query;
    let authors = await authorInfo.find({name: authName});
    res.redirect(`/authors/${authors.id}`);
}

module.exports.signup = async (req, res, next) => {
    let currMail = await authorInfo.find({email: req.body.mail});
    if(currMail.length>0) {
       return next(new ExpressError(401, "This Email is already registered"));
    }
    let user = new authorInfo({
        name: req.body.name,
        username: req.body.username,
        email: req.body.mail,
        img: req.body.image,
        description: req.body.description,
        dateOfBirth: req.body.birthdate
    });
    let regUser = await authorInfo.register(user, req.body.password);

    req.login(regUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to blogger. You successfully created your account");
        res.redirect("/");
    })
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to blogger. ");
    let redirectUrl = res.locals.redirectUrl || "/"
    res.redirect(redirectUrl);
};