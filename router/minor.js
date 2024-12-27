const express = require("express");
const router = express.Router({mergeParams: true});
const minorInfo = require("../models/minorInfo.js");

router.get("", async (req, res) => {
    let minors = await minorInfo.find();

    let all = [];
    
    for(let i=0; i<minors.length; i++) {
        all.push(JSON.parse(JSON.stringify(minors[i])));
    }

    // res.send(all);
    res.render("minors.ejs", { minors: all });
});

router.get("/:id", async (req, res, next) => {
    let {id} = req.params; 
    let datas = await minorInfo.findById(id);
    let all = JSON.parse(JSON.stringify(datas));
    res.render("minorDetail.ejs", { data: all });
});

module.exports = router;