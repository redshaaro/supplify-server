const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add Item to Wishlist
const addItemToWishlist = async (req, res) => {
  const { branch_id, product_id } = req.body;

  try {
    const newWishlistItem = await prisma.wishlist.create({
      data: {
        branch_id: parseInt(branch_id, 10),
        product_id: parseInt(product_id, 10),
      },
    });
    res.status(201).json(newWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item to wishlist' });
  }
};

// Remove Item from Wishlist
const removeItemFromWishlist = async (req, res) => {
  const { wishlist_id } = req.params;

  try {
    await prisma.wishlist.delete({
      where: {
        wishlist_id: parseInt(wishlist_id, 10),
      },
    });
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove item from wishlist' });
  }
};
const getWishlistByBranch = async (req, res) => {
  const { branch_id } = req.params;

  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        branch_id: parseInt(branch_id, 10),
      },
      include: {
        product: true, // Include product details in the response
      },
    });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wishlist for branch' });
  }
};

module.exports = {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistByBranch
};
