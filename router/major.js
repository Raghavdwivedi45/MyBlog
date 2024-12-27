const express = require("express");
const router = express.Router({mergeParams: true});
const majorInfo = require("../models/majorInfo.js");

router.get("", async (req, res) => {
    let blogs = await majorInfo.find();
    let all = [];
    
    for(let i=0; i<blogs.length; i++) {
        all.push(JSON.parse(JSON.stringify(blogs[i])));
    }
    // console.log(all[0]);
    res.render("majors.ejs", { blogs: all });
});

router.get("/:id", async (req, res, next) => {
    let {id} = req.params; 
    
    let datas = await majorInfo.findById(id);
    
    let all = JSON.parse(JSON.stringify(datas));
    // res.send(data);
    res.render("major.ejs", { data: all});
});

router.get("/:id/submajor", async (req, res, next) => {
    let {id} = req.params;
    let {subid} = req.query; 

    let datas = await majorInfo.findById(id);

    let data = JSON.parse(JSON.stringify(datas));
    data = data.submajor;
    data = data.filter((sub) => sub._id === subid);
    data = data[0];
    res.render("submajor.ejs", { data });

});

module.exports = router;