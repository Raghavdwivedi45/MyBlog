const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const minorController = require("../controllers/minor.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({storage});

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.redirectUrl = req.redirectUrl;
        res.redirect("/authors/login");
    }
}


router.get("/getMore", asyncWrap(minorController.infiniteScrollMinors));


router.get("", asyncWrap(minorController.renderAllMinors));

router
    .route("/:id/new")
    .get(checkAuthentication, (req, res) => {
        let { id } = req.params;
        res.render("newMinor.ejs", { id });
    })
    .post(checkAuthentication, upload.single("image"), asyncWrap(minorController.saveNewMinor));

router.get("/:id", asyncWrap(minorController.renderOneMinor));

router.post("/:id/like", checkAuthentication, asyncWrap(minorController.like));
router.post("/:id/love", checkAuthentication, asyncWrap(minorController.love));

router.post("/:id/comment", asyncWrap(minorController.comments));

router
    .route("/:id/edit")
    .get(checkAuthentication, asyncWrap(minorController.editMinor))
    .put(checkAuthentication, upload.single("img"), asyncWrap(minorController.saveEditedMinor));

router.delete("/:id/delete", checkAuthentication, asyncWrap(minorController.deleteMinor));

module.exports = router;