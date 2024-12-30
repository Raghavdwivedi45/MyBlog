const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const minorInfo = require("../models/minorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const { asyncWrap } = require("../utils/asyncWrap.js");

router.get("", asyncWrap(async (req, res) => {
    let minors = await minorInfo.find();
    res.render("minors.ejs", { minors });
}));

router.get("/:id/new", (req, res) => {
    let { id } = req.params;
    res.render("newMinor.ejs", { id });
});

router.get("/:id", asyncWrap(async (req, res) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    res.render("minorDetail.ejs", { data });
}));

router.post("/:id/new", asyncWrap(async (req, res) => {
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
}));

router.delete("/:id/delete", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findByIdAndDelete(id);
    // console.log(data);
    if (!data) {
        return next(new ExpressError(401, "Minor doesn't exist."));
    }
    res.redirect(`/authors/${data.author}`);
}));

router.get("/:id/edit", asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let data = await minorInfo.findById(id);
    res.render("editMinor.ejs", { data });
}));

router.put("/:id/edit", asyncWrap(async (req, res, next) => {
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
}));

module.exports = router;