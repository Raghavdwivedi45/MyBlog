const express = require("express");
const router = express.Router({ mergeParams: true });
const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const minorInfo = require("../models/minorInfo.js");

router.get("/", async (req, res) => {
    let authors = await authorInfo.find();
    let majors = await majorInfo.find({});
    let minors = await minorInfo.find({});

    let allmajors = [];
    
    for(let i=0; i<majors.length; i++) {
        allmajors.push(JSON.parse(JSON.stringify(majors[i])));
    }

    let allminors = [];
    
    for(let i=0; i<minors.length; i++) {
        allminors.push(JSON.parse(JSON.stringify(minors[i])));
    }

    res.render("home.ejs", { allmajors, allminors, authors });
});

module.exports = router;