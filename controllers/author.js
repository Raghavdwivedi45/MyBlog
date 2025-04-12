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
    let result = authorValidate.validate(req.body);
    if(result.error) { 
        return next(new ExpressError(400, result.error)); 
    }

    let currMail = await authorInfo.find({ email: req.body.mail });
    if (currMail.length > 0) {
        return next(new ExpressError(401, "This Email is already registered"));
    }
    if(!req.file) {
        return next(new ExpressError(400, "Upload image to register")); 
    }
    let user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.mail,
        dateOfBirth: req.body.birthdate,
        img: {
            url : req.file.path,
            filename: req.file.filename
        }
    };

    if(req.body.type=="author") {
        if(!req.body.description) {
            return next(new ExpressError(400, "Description is missing")); 
        }
        user.description = req.body.description;
        user.typ = "author";
    }
    
    const redi = req.cookies.redirected || "/";
    res.clearCookie("redirected");
    
    let regUser = await authorInfo.register(user, req.body.password);
    
    req.login(regUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Welcome to ArticleVerse. You successfully created your account");
        if(!req.session.redirected) return res.redirect("/");
        
        res.redirect(redi);
    })
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to ArticleVerse. ");

    const redi = req.cookies.redirected || "/";
    res.clearCookie("redirected");
    res.redirect(redi);
};

