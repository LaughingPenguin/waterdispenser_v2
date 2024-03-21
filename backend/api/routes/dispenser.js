const express = require("express");
const router = express.Router();
const dispenserController = require("../controllers/dispenserController");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.redirect("/auth/google");
}

// GET request for retrieving all dispensers
router.get("/", dispenserController.getDispensers);

// GET request for retrieving dispensers by union of filters
router.get("/or", dispenserController.getDispensersByOr);

// GET request for retrieving dispensers by intersection of filters
router.get("/and", dispenserController.getDispensersByAnd);

// GET request for retrieving one dispenser by ID
router.get("/:id", dispenserController.getDispenserById);

// POST request for creating a dispenser
router.post("/", isLoggedIn, dispenserController.createDispenser);

// DELETE request for deleting a dispenser by ID
router.delete("/:id", isLoggedIn, dispenserController.deleteDispenser);

// PATCH request for updating a dispenser by ID
router.patch("/:id", isLoggedIn, dispenserController.updateDispenser);

module.exports = router;
