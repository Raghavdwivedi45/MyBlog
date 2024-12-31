const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const minorController = require("../controllers/minor.js")

router.get("", asyncWrap(minorController.renderAllMinors));

router
    .route("/:id/new")
    .get((req, res) => {
        let { id } = req.params;
        res.render("newMinor.ejs", { id });
    })
    .post(asyncWrap(minorController.saveNewMinor));

router.get("/:id", asyncWrap(minorController.renderOneMinor));

router.put("/:id/rating", asyncWrap(minorController.rating));

router
    .route("/:id/edit")
    .get(asyncWrap(minorController.editMinor))
    .put(asyncWrap(minorController.saveEditedMinor));

router.delete("/:id/delete", asyncWrap(minorController.deleteMinor));

module.exports = router;