const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthControler');

// RestaurantOwner routes
router.post('/owner/signup', authController.ownerSignup);
router.post('/owner/login', authController.ownerLogin);

// Supplier routes
router.post('/supplier/signup', authController.supplierSignup);
router.post('/supplier/login', authController.supplierLogin);

module.exports = router;
