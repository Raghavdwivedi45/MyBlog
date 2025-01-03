const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const minorController = require("../controllers/minor.js")
const passport = require("passport");

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        req.session.redirectUrl = req.redirectUrl;
        res.redirect("/authors/login");
    }
}

router.get("", asyncWrap(minorController.renderAllMinors));

router
    .route("/:id/new")
    .get(checkAuthentication, (req, res) => {
        let { id } = req.params;
        res.render("newMinor.ejs", { id });
    })
    .post(checkAuthentication, asyncWrap(minorController.saveNewMinor));

router.get("/:id", asyncWrap(minorController.renderOneMinor));

router.put("/:id/rating", asyncWrap(minorController.rating));

router
    .route("/:id/edit")
    .get(checkAuthentication, asyncWrap(minorController.editMinor))
    .put(checkAuthentication, asyncWrap(minorController.saveEditedMinor));

router.delete("/:id/delete", checkAuthentication, asyncWrap(minorController.deleteMinor));

module.exports = router;