const Rating = require("../models/ratingModel");
const asyncHandler = require("express-async-handler");

// Display list of all Ratings.
exports.rating_list = asyncHandler(async (req, res, next) => {
  const ratings = await Rating.findAll();
  return JSON.stringify(ratings, null, 2);
});

// Display specific details for a specific Rating.
exports.rating_detail = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findByPk(req.params.id);
  return JSON.stringify(rating, null, 2);
});

// Handle Rating create on POST.
/* TODO: potentially modify to req.params, depending on how we pass form data,
         additionally, look at whether we should specify features/
         when value is createdAt is evaluated
*/
exports.rating_create = asyncHandler(async (req, res, next) => {
  const rating = await Rating.create(req.body);
  return JSON.stringify(rating, null, 2);
});

// Handle Rating delete on POST.
exports.rating_delete = asyncHandler(async (req, res, next) => {
  await Rating.destroy({
    where: {
      ratingId: req.params.id,
    },
  });
  return this.rating_detail(req, res);
});

// Handle Rating update on POST.
exports.rating_update = asyncHandler(async (req, res, next) => {
  await Rating.update(req.body, { where: { ratingId: req.params.id } });
  return this.rating_detail(req, res);
});
