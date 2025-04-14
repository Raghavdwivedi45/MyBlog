const minorInfo = require("../models/minorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const { minorValidate } = require("../schema.js");



module.exports.infiniteScrollMinors = async (req, res) => {
        let minors = await minorInfo.find().populate("author");
        let random = Math.floor(Math.random()*(100));
        random = random%(minors.length-6);
        minors = minors.slice(random, random+3);
        
        res.json(minors);
}

module.exports.renderAllMinors = async (req, res) => {
    let minors;
    if(req.query.tag) {
        minors = await minorInfo.find({tag: req.query.tag}).populate("author");
    } else {
        minors = await minorInfo.find().populate("author");
        if(minors.length%3==1) minors = minors.slice(0, minors.length-1);
        if(minors.length%3==2) minors = minors.slice(0, minors.length-2);
    }
    res.render("minors.ejs", { minors });
}

module.exports.renderOneMinor = async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id).populate("author");
    res.render("minorDetail.ejs", { data, likes: data.like.length, loves: data.love.length });
}

module.exports.saveNewMinor = async (req, res, next) => {
    let { id } = req.params;
    if (minorValidate.validate(req.body).error) throw new ExpressError(400, minorValidate.validate(req.body).error);
    
    if(!req.file) {
        return next(new ExpressError(400, "Upload image to register")); 
    }

    if(!(res.locals.currUser._id.equals(id))) {
        return next(new ExpressError(400, "You need to register as an author to create a listing")); 
    }

    if(!(res.locals.currUser._id.equals(id))) {
        return next(new ExpressError(400, "You need to register as an author to create a listing")); 
    }

    let obj = new minorInfo({
        title: req.body.title,
        author: id,
        img: {
            url : req.file.path,
            filename: req.file.filename
        },
        description: req.body.description,
    });
    if(typeof(req.body.tag)=="string") obj.tag = [req.body.tag];
    else if(!req.body.tag) obj.tag = [];
    else obj.tag = req.body.tag;

    await obj.save();
    req.flash("success", "The Minor was successfully created");
    res.redirect(`/authors/${id}`);
}

module.exports.editMinor = async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    res.render("editMinor.ejs", { data });
}

module.exports.saveEditedMinor = async (req, res, next) => {
    let { id } = req.params;
    if (minorValidate.validate(req.body).error) {
        throw new ExpressError(400, minorValidate.validate(req.body).error);}

    let finalObj = {
        title: req.body.title,
        description: req.body.description,
        desc: req.body.description.substring(0, 21),
    }
    if(req.file) {
        finalObj.img = {
            url : req.file.path,
            filename: req.file.filename
        }
    }
    await minorInfo.findByIdAndUpdate(id, finalObj, { returnDocument: "after" });

    req.flash("success", "The Minor was successfully saved");
    res.redirect(`/minors/${id}`);
}

module.exports.deleteMinor = async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findByIdAndDelete(id);

    if (!data) {
        return next(new ExpressError(401, "Minor doesn't exist."));
    }
    req.flash("success", "The Minor was successfully deleted");
    res.redirect(`/authors/${data.author}`);
}

module.exports.love = async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    if (data.love.indexOf(res.locals.currUser.id) == -1) {
        data.love.push(res.locals.currUser.id);
        await data.save();
        req.flash("success", "Thankyou for your feedback");

    } else {
        req.flash("success", "You've already reviewed this minor");
    }
    res.redirect(`/minors/${data.id}`);
}

module.exports.like = async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    if (data.like.indexOf(res.locals.currUser.id) == -1) {
        data.like.push(res.locals.currUser.id);
        await data.save();
        req.flash("success", "Thankyou for your feedback");

    } else {
        req.flash("success", "You've already reviewed this minor");
    }
    res.redirect(`/minors/${data.id}`);
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
    
    await minorInfo.findByIdAndUpdate(id, { $push: { comments: comm } }, { new: true });
    res.redirect(`/minors/${id}`);
}
