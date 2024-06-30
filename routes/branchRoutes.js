// routes/branchRoutes.js

const express = require('express');
const router = express.Router();
const branchController = require('../controllers/BranchControler');

// Route to fetch branches by restaurant_id
router.get('/restaurant/:restaurantId/branches', branchController.getBranchesByRestaurant);

module.exports = router;
