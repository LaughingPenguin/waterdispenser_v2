const Rating = require("../models/ratingModel");
const asyncHandler = require("express-async-handler");

// Display list of all Ratings.
exports.getAllRatings = asyncHandler(async (req, res, next) => {
  const ratings = await Rating.findAll();
  res.send(JSON.stringify(ratings, null, 2));
});

// Display specific details for a specific Rating.
exports.getRatingById = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findByPk(req.params.id);
  res.send(JSON.stringify(rating, null, 2));
});

// Handle Rating create on POST.
/* TODO: info on creating and updating entities should be sent in
         req.body, not in req.params
         see more on req.body vs req.params vs req.query
*/
exports.createRating = asyncHandler(async (req, res, next) => {
  const rating = await Rating.create(req.body);
  res.send(JSON.stringify(rating, null, 2));
});

// Handle Rating delete on DELETE.
exports.deleteRating = asyncHandler(async (req, res, next) => {
  await Rating.destroy({
    where: {
      ratingId: req.params.id,
    },
  });
  // Rewrite to be a callback
  // res.send(this.rating_detail(req, res))
});

// Handle Rating update on PATCH.
exports.updateRating = asyncHandler(async (req, res, next) => {
  await Rating.update(req.body, { where: { ratingId: req.params.id } });
  // res.send(this.rating_detail(req, res))
});
