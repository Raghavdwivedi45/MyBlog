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
    let author = await authorInfo.findById(id);
    let authorMinors = await minorInfo.find();
    let authorMajors = await majorInfo.find();

    for (let i = 0; i < authorMinors.length; i++) {
        if (authorMinors[i].author != id) {
            authorMinors.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < authorMajors.length; i++) {
        if (authorMajors[i].author != id) {
            authorMajors.splice(i, 1);
            i--;
        }
    }
    res.render("author.ejs", { author, authorMinors, authorMajors });
});

module.exports = router;