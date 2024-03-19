const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/auth/google");
}

// GET request for retrieving all ratings
router.get("/", ratingController.rating_list);

// GET request for retrieving one rating
router.get("/:id", ratingController.rating_detail);

// POST request for creating a rating
router.post("/create", isLoggedIn, ratingController.rating_create);

// POST request for creating a rating
router.post("/:id/delete", isLoggedIn, ratingController.rating_delete);

// POST request for updating a rating
router.post("/:id/update", isLoggedIn, ratingController.rating_update);

module.exports = router;
