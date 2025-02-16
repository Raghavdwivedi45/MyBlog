const minorInfo = require("../models/minorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const { minorValidate } = require("../schema.js");

module.exports.renderAllMinors = async (req, res) => {
    let minors;
    if(req.query.tag) {
        minors = await minorInfo.find({tag: req.query.tag}).populate("author");
    } else {
        minors = await minorInfo.find().populate("author");
    }
    res.render("minors.ejs", { minors });
}

module.exports.renderOneMinor = async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id).populate("author");
    res.render("minorDetail.ejs", { data, likes: data.like.length, loves: data.love.length });
}

module.exports.saveNewMinor = async (req, res) => {
    let { id } = req.params;
    if (minorValidate.validate(req.body).error) throw new ExpressError(400, minorValidate.validate(req.body).error);

    let obj = new minorInfo({
        title: req.body.title,
        author: id,
        desc: req.body.description.substring(0, 21),
        img: req.body.img,
        description: req.body.description,
        tag: req.body.tag
    });
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
    if (minorValidate.validate(req.body).error) throw new ExpressError(400, minorValidate.validate(req.body).error);

    await minorInfo.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            desc: req.body.description.substring(0, 21)
        }
    },
        { returnDocument: "after" });
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
    let minor = await minorInfo.findById(id);

    let currentDate = new Date();
    let formattedDate = currentDate.toString().substring(4, 15);

    let comm = {
        commentWriter: req.body.writer,
        comment: req.body.comment,
        date: formattedDate
    }
    if(res.locals.currUser.typ=="author") {
        comm.typ="author";
        comm.img = res.locals.currUser.img;
    }

    minor.comments.push(comm);

    await minor.save();
    res.redirect(`/minors/${id}`);
}