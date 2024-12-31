const minorInfo = require("../models/minorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.renderAllMinors = async (req, res) => {
    let minors = await minorInfo.find();
    res.render("minors.ejs", { minors });
}

module.exports.renderOneMinor = async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    res.render("minorDetail.ejs", { data });
}

module.exports.saveNewMinor = async (req, res) => {
    let { id } = req.params;
    let inp = req.body;
    let desc = inp.description.substring(0, 21);
    let authors = await authorInfo.findById(id);

    let obj = new minorInfo({
        title: inp.title,
        author: id,
        desc: desc,
        img: inp.img,
        description: inp.description,
        writername: authors.name
    });

    await obj.save();
    res.redirect(`/authors/${id}`);
}

module.exports.editMinor = async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    res.render("editMinor.ejs", { data });
}

module.exports.saveEditedMinor = async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            desc: req.body.description.substring(0, 21)
        }
    },
        { returnDocument: "after" });
    res.redirect(`/authors/${data.author}`);
}

module.exports.deleteMinor = async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findByIdAndDelete(id);

    if (!data) {
        return next(new ExpressError(401, "Minor doesn't exist."));
    }
    res.redirect(`/authors/${data.author}`);
}

module.exports.rating = async (req, res) => {
    let {id} = req.params;
    let data = await minorInfo.findById(id);

    let obj = {
        stars : req.body.rating,
        author : data.author
    };

    if(req.body.rating>=1 && req.body.rating<=5) {
        let result = await minorInfo.findByIdAndUpdate(id, { $push: {rating: obj} }, { returnDocument: "after" });
        // console.log(result);
        return res.redirect(`/minors/${data.id}`);
    }
    next(new ExpressError(401, "Oops ! You are rating out of limit"));
}