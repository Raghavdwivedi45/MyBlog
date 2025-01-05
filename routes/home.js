const express = require("express");
const router = express.Router({ mergeParams: true });
const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");
const ExpressError = require("../utils/ExpressError.js");

router.get("/", async (req, res) => {

    let authors = await authorInfo.find();
    let allMajors = await majorInfo.find({}).populate("author");
    let allMinors = await minorInfo.find({}).populate("author");

    let uniqueAuthors = await authorInfo.distinct("name");
    let uniqueMajors = await majorInfo.distinct("title");
    let uniqueMinors = await minorInfo.distinct("title");
    res.render("home.ejs", { allmajors: allMajors, allminors: allMinors, authors, uniqueMajors, uniqueMinors, uniqueAuthors });
});

router.get("/search", async (req, res, next) => {
    let { title } = req.query
    let result = title.slice(0, title.length - 8);

    if (title.slice(title.length - 5, title.length) == "Major") {
        let allMajors = await majorInfo.find({ title: result }).populate("author");
        if(allMajors.length>0)
        return res.render("majors.ejs", { blogs: allMajors });
    }

    if (title.slice(title.length - 5, title.length) == "Minor") {

        let allMinors = await minorInfo.find({ title: result }).populate("author");
        if(allMinors.length>0)
        return res.render("minors.ejs", { minors: allMinors });
    }

    let authors = await authorInfo.find({ name: title });
    if (authors.length > 0) {
        return res.render("authors.ejs", { authors });
    }

    next(new ExpressError(401, "Oops ! No search found"));
});

module.exports = router;