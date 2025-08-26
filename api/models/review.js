const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },
        comment: {
          type: String,
          maxLength: 500,
        },
      },
      { timestamps: true }
    );
    
module.exports = mongoose.model("Review", ReviewSchema);
