const express = require('express');
const router = express.Router();
const offerController = require('../controllers/OfferController');

router.post('/offers', offerController.createOffer);
router.get('/offers', offerController.getAllOffers);
router.get('/offers/:id', offerController.getOfferById);
router.put('/offers/:id', offerController.updateOffer);
router.delete('/offers/:id', offerController.deleteOffer);

module.exports = router;
