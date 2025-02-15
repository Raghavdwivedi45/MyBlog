const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const majorController = require("../controllers/major.js");
const majorInfo = require("../models/majorInfo.js");

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.redirectUrl = req.redirectUrl;
        res.redirect("/authors/login");
    }
}

router.get("", asyncWrap(majorController.renderAllMajors));

router.get("/:id", asyncWrap(majorController.renderOneMajor));

router.get("/:id/submajor", asyncWrap(majorController.renderSubmajor));

router
    .route("/:id/new")
    .get(checkAuthentication, (req, res) => {
        let { id } = req.params;
        let obj = { id: id }
        res.render("newMajor.ejs", { obj });
    })
    .post(checkAuthentication, asyncWrap(majorController.createNewMajor));

router.post("/:id/like", checkAuthentication, asyncWrap(majorController.like));
router.post("/:id/love", checkAuthentication, asyncWrap(majorController.love));

router.post("/:id/comment", async (req, res) => {
    let {id} = req.params;
    let major = await majorInfo.findById(id);

    major.comments.push({
        commentWriter: req.body.writer,
        comment: req.body.comment
    });

    await major.save();
    res.redirect(`/majors/${id}`);
})

router
    .route("/:id/submajor/new")
    .get(checkAuthentication, (req, res) => {
        let { id } = req.params;
        let obj = { id: id }
        res.render("newSubMajor.ejs", { obj });
    })
    .post(checkAuthentication, asyncWrap(majorController.createNewSubmajor));

router
    .route("/:id/edit")
    .get(checkAuthentication, asyncWrap(majorController.renderEditSubmajorForm))
    .put(checkAuthentication, asyncWrap(majorController.editSubmajor));

router.delete("/:id/delete", checkAuthentication, asyncWrap(majorController.deleteSubmajor));

router.delete("/:id/topic/delete", checkAuthentication, asyncWrap(majorController.deleteMajor));

module.exports = router;