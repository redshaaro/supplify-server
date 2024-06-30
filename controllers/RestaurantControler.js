const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a new restaurant
const addRestaurant = async (req, res) => {
    const { restaurant_name, cuisine_type, owner_id, branches } = req.body;
    try {
      // Create the restaurant with branches and connect it to an owner
      const newRestaurant = await prisma.restaurant.create({
        data: {
          restaurant_name,
          cuisine_type,
          owner: { connect: { owner_id } }, // Connects to an existing owner
          branches: {
            create: branches.map(branch => ({
              branch_name: branch.branch_name,
              branch_code: branch.branch_code,
              branch_address: branch.branch_address
            }))
          }
        },
        include: {
          branches: true // Optional: Include branches in the response if needed
        }
      });
      res.status(201).json(newRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create restaurant' });
    }
  };
  

// Add a branch to an existing restaurant
const addBranch = async (req, res) => {
  const { restaurant_id, branch_name, branch_code, branch_address } = req.body;

  try {
    // Create the branch
    const newBranch = await prisma.branch.create({
      data: {
        restaurant_id,
        branch_name,
        branch_code,
        branch_address
      }
    });

    res.status(201).json(newBranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add branch' });
  }
};
const getRestaurantsByOwner = async (req, res) => {
  const ownerId = parseInt(req.params.ownerId); // Parse ownerId to integer
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        owner_id: ownerId,
      },
      include: {
        branches: true, // Include branches associated with each restaurant
      },
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};


module.exports = {
  addRestaurant,
  addBranch,
  getRestaurantsByOwner
};
