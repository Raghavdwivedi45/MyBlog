const express = require("express");
const router = express.Router({mergeParams: true});
const majorInfo = require("../models/majorInfo.js");
const authorInfo = require("../models/authorInfo.js");
const ExpressError = require("../utils/ExpressError.js");
const {asyncWrap} = require("../utils/asyncWrap.js");

router.get("", asyncWrap (async (req, res) => {
    let blogs = await majorInfo.find();
    res.render("majors.ejs", { blogs });
}));

router.get("/:id", asyncWrap (async (req, res, next) => {
    let {id} = req.params;  
    let data = await majorInfo.findById(id);

    res.render("major.ejs", { data });
}));

router.get("/:id/submajor", asyncWrap (async (req, res, next) => {
    let {id} = req.params;
    let {subid} = req.query; 
    let data = await majorInfo.findById(id);

    let sub = [];
    for( let i = 0; i<data.submajor.length; i++ ) {
        if(data.submajor[i].id == subid) {
            sub.push(data.submajor[i]);
        }
    }
    res.render("submajor.ejs", { data: sub[0] });
}));

router.get("/:id/new", (req, res) => {
    let {id} = req.params;
    let obj = {id: id}
    res.render("newMajor.ejs", { obj });
});

router.post("/:id/new", asyncWrap (async (req, res) => {
    let {id} = req.params;
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
}));

router.get("/:id/submajor/new", (req, res) => {
    let {id} = req.params;
    let obj = {id: id}
    res.render("newSubMajor.ejs", { obj });
})

router.post("/:id/submajor/new", asyncWrap (async (req, res) => {
    try {
    let {id} = req.params;
    let inp = req.body;

    let data = await majorInfo.findById(id);
    data.submajor.push({
        subtitle: inp.title,
        subdescription: inp.description
    });

    await data.save(); 
    res.redirect(`/majors/${id}`);
    }
    catch(err) {
        console.log(err);
    }
}));

module.exports = router;