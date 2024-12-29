const express = require("express");
const router = express.Router({ mergeParams: true });
const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");

router.get("", async (req, res) => {
    let authors = await authorInfo.find();
    res.render("authors.ejs", { authors });
});

router.get("/:id", async (req, res, next) => {
    let { id } = req.params;
    let authors = await authorInfo.findById(id);
    let authorMinors = await minorInfo.find({author: id});
    let authorMajors = await majorInfo.find({author: id});
    res.render("author.ejs", { authors, authorMinors, authorMajors });
});

module.exports = router;