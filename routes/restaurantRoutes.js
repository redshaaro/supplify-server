const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantControler');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware to authenticate users

// Route to add a new restaurant
router.post('/add', authenticate, restaurantController.addRestaurant);

// Route to add a new branch
router.post('/branch/add', authenticate, restaurantController.addBranch);
router.get('/owner/:ownerId/restaurants', restaurantController.getRestaurantsByOwner);


module.exports = router;
