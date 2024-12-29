const express = require("express");
const router = express.Router({mergeParams: true});
const minorInfo = require("../models/minorInfo.js");
const authorInfo = require("../models/authorInfo.js");

router.get("", async (req, res) => {
    let minors = await minorInfo.find();
    res.render("minors.ejs", { minors });
});

router.get("/:id/new", (req, res) => {
    let {id} = req.params;
    let obj = {id: id}
    res.render("newMinor.ejs", { obj });
})

router.get("/:id", async (req, res, next) => {
    let {id} = req.params; 
    let data = await minorInfo.findById(id);
    res.render("minorDetail.ejs", { data });
});

router.post("/:id/new", async (req, res) => {
    let {id} = req.params;
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
})

module.exports = router;