const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const authorController = require("../controllers/author.js");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({storage});

router.get("", asyncWrap(authorController.renderAllAuthors));

router.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

router.get("/login", (req, res) => {
    res.render("login.ejs");
})

router.post("/login", 
            passport.authenticate("local", {failureRedirect: "/authors/login", failureFlash: true}), 
            authorController.login)

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {return next(err)}
        req.flash("You were logged out successfully");
        res.redirect("/");
    });
})

router.post("/signup", upload.single("image"), asyncWrap(authorController.signup))

router.get("/:id", asyncWrap(authorController.renderOneAuthor));

module.exports = router;