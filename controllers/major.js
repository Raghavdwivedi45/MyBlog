const majorInfo = require("../models/majorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");



module.exports.infiniteScrollMajors = async (req, res) => {
        let majors = await majorInfo.find().populate({ path: 'author', select: 'name img -_id' });
        let random = Math.floor(Math.random()*(100));
        random = random%(majors.length-6);
        majors = majors.slice(random, random+3);
        res.json(majors);
}

module.exports.renderAllMajors = async (req, res) => {
    let blogs;
    if(req.query.tag) {
        blogs = await majorInfo.find({tag: req.query.tag}).populate("author");
    } else {
        blogs = await majorInfo.find().populate("author");
        if(blogs.length%3==1) blogs = blogs.slice(0, blogs.length-1);
        if(blogs.length%3==2) blogs = blogs.slice(0, blogs.length-2);
    }
    res.render("majors.ejs", { blogs });
}

module.exports.renderOneMajor = async (req, res) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id).populate("author");
    res.render("major.ejs", { data, likes: data.like.length, loves: data.love.length });
}

module.exports.renderSubmajor = async (req, res, next) => {
    let { id } = req.params;
    let { subid } = req.query;
    let Majors = await majorInfo.findById(id);

    let data = Majors.submajor;
    data = data.filter((sub) => sub._id == subid);
    data = data[0];

    res.render("submajor.ejs", { data, id, Majors });
}

module.exports.createNewMajor = async (req, res, next) => {
    let { id } = req.params;
    if(!req.file) {
        return next(new ExpressError(400, "Upload image to register")); 
    }
    if(!(res.locals.currUser._id.equals(id))) {
        return next(new ExpressError(400, "You need to register as an author to create a listing")); 
    }
    let inp = req.body;
    
    let obj = new majorInfo({
        title: inp.title,
        author: id,
        img: {
            url : req.file.path,
            filename: req.file.filename
        },
        tag: req.body.tag,
        description: inp.description,
    });
    await obj.save();
    req.flash("success", "A new Major was succesffully created");
    res.redirect(`/authors/${id}`);
}

module.exports.createNewSubmajor = async (req, res) => {
    let { id } = req.params;
    let inp = req.body;

    let data = await majorInfo.findById(id);

    if (res.locals.currUser._id.equals(data.author)) {
        data.submajor.push({
            subtitle: inp.title,
            subdescription: inp.description
        });

        await data.save();
        req.flash("success", "A new submajor was succesffully created");
    }
    res.redirect(`/majors/${id}`);
}

module.exports.renderEditSubmajorForm = async (req, res, next) => {
    let { id } = req.params;
    let { submajor } = req.query;
    let data = await majorInfo.findById(id);
    data = data.submajor;
    data = data.filter((sub) => sub._id == submajor);
    data = data[0];
    res.render("editSubMajor.ejs", { data, id });
}

module.exports.editSubmajor = async (req, res, next) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    if (res.locals.currUser._id.equals(data.author)) {
        let objIndex = data.submajor.findIndex(obj => obj.id == req.body.id);
        data.submajor[objIndex].subtitle = req.body.title;
        data.submajor[objIndex].subdescription = req.body.description;
        let result = data.submajor;

        await majorInfo.findByIdAndUpdate(id, { $set: { submajor: result } }, { returnDocument: "after" });
        req.flash("success", "The submajor was succesffully edited");
    }
    res.redirect(`/majors/${id}/submajor?subid=${req.body.id}`);
}

module.exports.deleteSubmajor = async (req, res, next) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    if (res.locals.currUser._id.equals(data.author)) {
        let result = data.submajor.filter((sub) => sub._id != req.body.subid);
        await majorInfo.findByIdAndUpdate(id, { $set: { submajor: result } }, { returnDocument: "after" });

        if (!data) {
            return next(new ExpressError(401, "Submajor doesn't exist."));
        }
        req.flash("success", "The submajor was succesffully deleted");
    }
    res.redirect(`/majors/${data.id}`);
}

module.exports.deleteMajor = async (req, res, next) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    if (res.locals.currUser._id.equals(data.author)) {
        data = await majorInfo.findByIdAndDelete(id);
        if (!data) {
            return next(new ExpressError(401, "Major doesn't exist."));
        }
        req.flash("success", "The Major was succesffully deleted");
    }
    res.redirect(`/authors/${data.author}`);
}

module.exports.rating = async (req, res) => {
    j
    let { id } = req.params;
    let data = await majorInfo.findById(id);

    let obj = {
        stars: req.body.rating,
        author: data.author
    };

    if (req.body.rating >= 1 && req.body.rating <= 5) {
        await majorInfo.findByIdAndUpdate(id, { $push: { rating: obj } }, { returnDocument: "after" });
        req.flash("success", "Thankyou for your feedback");
        return res.redirect(`/majors/${data.id}`);
    }
    next(new ExpressError(401, "Oops ! Your rating is out of limit"));
}

module.exports.love = async (req, res) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    if (data.love.indexOf(res.locals.currUser.id) == -1) {
        data.love.push(res.locals.currUser.id);
        await data.save();
        req.flash("success", "Thankyou for your feedback");

    } else {
        req.flash("success", "You've already reviewed this major");
    }
    res.redirect(`/majors/${data.id}`);
}

module.exports.like = async (req, res) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    if (data.like.indexOf(res.locals.currUser.id) == -1) {
        data.like.push(res.locals.currUser.id);
        await data.save();
        req.flash("success", "Thankyou for your feedback");

    } else {
        req.flash("success", "You've already reviewed this major");
    }
    res.redirect(`/majors/${data.id}`);
}

module.exports.comments = async (req, res) => {
    let {id} = req.params;

    const badWords = [ "damn", "hell", "shit", "fuck", "bitch", "bastard", "asshole", "crap", "dick", "piss", "slut", "whore", "cock", "fag", "nigger", "cunt",];
    let replacedComment = req.body.comment;
    for(w of badWords){ replacedComment = replacedComment.replaceAll(w, "*#@$*")}

    let comm = {
        commentWriter: res.locals.currUser.name,
        comment: replacedComment,
        date: new Date(Date.now()).toString().substring(4, 15),
        img: res.locals.currUser.img.url
    }
        if(res.locals.currUser.typ=="author") {
        comm.typ="author";
    }
    await majorInfo.findByIdAndUpdate(id, { $push: { comments: comm } }, { new: true });
    res.redirect(`/majors/${id}`);
}