const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const verify = require("../verifyToken");

//create review
router.post("/", verify, async (req, res) => {
  try {
    const newReview = new Review({
      userId: req.user.id,
      username: req.user.username, // make sure 'username' is added in JWT
      movieId: req.body.movieId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Internal Server Error", details: err });
  }

  //GET – Fetch all reviews for a movie
  router.get("/movie/:movieId", async (req, res) => {
    try {
      const reviews = await Review.find({ movieId: req.params.movieId });
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Delete a review by review ID
  router.delete("/:id", verify, async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json("Review not found");

      if (req.user.id === review.userId.toString() || req.user.isAdmin) {
        await review.deleteOne();
        res.status(200).json("Review deleted successfully");
      } else {
        res.status(403).json("You are not allowed to delete this review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
module.exports = router;
