const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/list");
const reviewRoute=require("./routes/review");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

//cors
const cors = require("cors");
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/reviews",reviewRoute);

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}!`);
});
