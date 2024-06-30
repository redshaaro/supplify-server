const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create an offer
const createOffer = async (req, res) => {
  const { product_id, supplier_id, discount, start_date, end_date } = req.body;

  try {
    const newOffer = await prisma.offer.create({
      data: {
        product_id,
        supplier_id,
        discount,
        start_date,
        end_date,
      },
    });
    res.status(201).json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create offer' });
  }
};

// Read all offers
const getAllOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany();
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};

// Read offer by ID
const getOfferById = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await prisma.offer.findUnique({
      where: { offer_id: parseInt(id, 10) },
    });

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch offer' });
  }
};

// Update an offer
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { product_id, supplier_id, discount, start_date, end_date } = req.body;

  try {
    const updatedOffer = await prisma.offer.update({
      where: { offer_id: parseInt(id, 10) },
      data: {
        product_id,
        supplier_id,
        discount,
        start_date,
        end_date,
      },
    });

    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update offer' });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.offer.delete({
      where: { offer_id: parseInt(id, 10) },
    });
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete offer' });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
};
