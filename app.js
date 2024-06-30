// Import the Express module
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const branchRoutes = require("./routes/branchRoutes");
const wishListRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const offerRoutes = require('./routes/offerRoutes');


// Create an instance of Express
const app = express();
app.use(express.json());

// Define a route handler for the default home page
app.use("/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/categories", categoryRoutes); // Add this line
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api", wishListRoutes);
app.use("/api", orderRoutes);
app.use('/api', offerRoutes);


// Export the app instance
module.exports = app;
