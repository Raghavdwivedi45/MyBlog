const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.renderAllMajors = async (req, res) => {
    let blogs = await majorInfo.find();
    res.render("majors.ejs", { blogs });
}

module.exports.renderOneMajor = async (req, res) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);
    res.render("major.ejs", { data });
}

module.exports.renderSubmajor = async (req, res, next) => {
    let { id } = req.params;
    let { subid } = req.query;
    let data = await majorInfo.findById(id);

    data = data.submajor;
    data = data.filter((sub) => sub._id == subid);
    data = data[0];

    res.render("submajor.ejs", { data, id });
}

module.exports.createNewMajor = async (req, res) => {
    let { id } = req.params;
    let inp = req.body;
    let desc = inp.description.substring(0, 21);
    let authors = await authorInfo.findById(id);

    let obj = new majorInfo({
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

module.exports.createNewSubmajor = async (req, res) => {
    let { id } = req.params;
    let inp = req.body;

    let data = await majorInfo.findById(id);
    data.submajor.push({
        subtitle: inp.title,
        subdescription: inp.description
    });

    await data.save();
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

    let objIndex = data.submajor.findIndex(obj => obj.id == req.body.id);
    data.submajor[objIndex].subtitle = req.body.title;
    data.submajor[objIndex].subdescription = req.body.description;
    let result = data.submajor;

    await majorInfo.findByIdAndUpdate(id, { $set: { submajor: result } }, { returnDocument: "after" });
    res.redirect(`/majors/${id}/submajor?subid=${req.body.id}`);
}

module.exports.deleteSubmajor = async (req, res, next) => {
    let { id } = req.params;
    let data = await majorInfo.findById(id);

    let result = data.submajor.filter((sub) => sub._id != req.body.subid);
    await majorInfo.findByIdAndUpdate(id, { $set: { submajor: result } }, { returnDocument: "after" });

    if (!data) {
        return next(new ExpressError(401, "Major doesn't exist."));
    }
    res.redirect(`/majors/${data.id}`);
}

module.exports.deleteMajor = async (req, res, next) => {
    let { id } = req.params;
    let data = await majorInfo.findByIdAndDelete(id);

    if (!data) {
        return next(new ExpressError(401, "Major doesn't exist."));
    }
    res.redirect(`/authors/${data.author}`);
}

module.exports.rating = async (req, res) => {
    let {id} = req.params;
    let data = await majorInfo.findById(id);

    let obj = {
        stars : req.body.rating,
        author : data.author
    };

    if(req.body.rating>=1 && req.body.rating<=5) {
        let result = await majorInfo.findByIdAndUpdate(id, { $push: {rating: obj} }, { returnDocument: "after" });
        console.log(result);
        return res.redirect(`/majors/${data.id}`);
    }
    next(new ExpressError(401, "Oops ! You are rating out of limit"));
}