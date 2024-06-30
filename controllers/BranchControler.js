// controllers/BranchController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get branches by restaurant_id (assuming restaurant_id is provided in the request)
const getBranchesByRestaurant = async (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId); // Assuming restaurantId is passed as a parameter
  try {
    const branches = await prisma.branch.findMany({
      where: {
        restaurant_id: restaurantId,
      },
    });
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
};

module.exports = {
  getBranchesByRestaurant,
};
