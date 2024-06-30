const express = require('express');
const { addItemToWishlist, removeItemFromWishlist,getWishlistByBranch } = require('../controllers/WishlistController');
const router = express.Router();

// Add Item to Wishlist
router.post('/wishlist', addItemToWishlist);

// Remove Item from Wishlist
router.delete('/wishlist/:wishlist_id', removeItemFromWishlist);
router.get('/wishlist/:branch_id', getWishlistByBranch);


module.exports = router;
