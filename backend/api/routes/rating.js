const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/auth/google");
}

// GET request for retrieving all ratings
router.get("/", ratingController.getAllRatings);

// GET request for retrieving one rating
router.get("/:id", ratingController.getRatingById);

// POST request for creating a rating
router.post("/", isLoggedIn, ratingController.createRating);

// DELETE request for deleting a rating
router.delete("/:id", isLoggedIn, ratingController.deleteRating);

// PATCH request for updating a rating
router.patch("/:id", isLoggedIn, ratingController.updateRating);

module.exports = router;
