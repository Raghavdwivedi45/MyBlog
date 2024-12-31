const express = require("express");
const router = express.Router({ mergeParams: true });
const { asyncWrap } = require("../utils/asyncWrap.js");

const authorController = require("../controllers/author.js")

router.get("", asyncWrap(authorController.renderAllAuthors));

router.get("/:id", asyncWrap(authorController.renderOneAuthor));

module.exports = router;