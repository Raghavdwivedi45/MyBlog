const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");
const majorController = require("../controllers/major.js");

router.get("", asyncWrap(majorController.renderAllMajors));

router.get("/:id", asyncWrap(majorController.renderOneMajor));

router.get("/:id/submajor", asyncWrap(majorController.renderSubmajor));

router
    .route("/:id/new")
    .get((req, res) => {
        let { id } = req.params;
        let obj = { id: id }
        res.render("newMajor.ejs", { obj });
    })
    .post(asyncWrap(majorController.createNewMajor));

router.put("/:id/rating", asyncWrap(majorController.rating));

router
    .route("/:id/submajor/new")
    .get((req, res) => {
        let { id } = req.params;
        let obj = { id: id }
        res.render("newSubMajor.ejs", { obj });
    })
    .post(asyncWrap(majorController.createNewSubmajor));

router
    .route("/:id/edit")
    .get(asyncWrap(majorController.renderEditSubmajorForm))
    .put(asyncWrap(majorController.editSubmajor));

router.delete("/:id/delete", asyncWrap(majorController.deleteSubmajor));

router.delete("/:id/topic/delete", asyncWrap(majorController.deleteMajor));

module.exports = router;