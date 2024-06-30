// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryControler');

router.get('/', categoryController.getAllCategories);

module.exports = router;
