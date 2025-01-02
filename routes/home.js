const express = require("express");
const router = express.Router({ mergeParams: true });
const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");

router.get("/", async (req, res) => {
    
    let authors = await authorInfo.find();
    let allMajors = await majorInfo.find({});
    let allMinors = await minorInfo.find({});
    res.render("home.ejs", { allmajors: allMajors, allminors: allMinors, authors });
});

module.exports = router;