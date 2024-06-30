const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ownerSignup = async (req, res) => {
  const { email, password, national_id, first_name, last_name, telephone, commercial_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newOwner = await prisma.restaurantOwner.create({
      data: {
        email,
        password: hashedPassword,
        national_id,
        first_name,
        last_name,
        telephone,
        commercial_id,
      },
    });
    res.status(201).json(newOwner);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to register owner' });
  }
};

const ownerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await prisma.restaurantOwner.findUnique({ where: { email } });
    if (owner && await bcrypt.compare(password, owner.password)) {
      const token = jwt.sign({ ownerId: owner.owner_id }, '2Ea3QFBbKh9QLoBXpmbMOd3lvJaw9O9zxZOoFLi2iZY=', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login owner' });
  }
};

const supplierSignup = async (req, res) => {
  const { email, password, location, first_name, last_name, telephone, business_name, commercial_id, national_id, minimum_order_price } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSupplier = await prisma.supplier.create({
      data: {
        email,
        password: hashedPassword,
        location,
        first_name,
        last_name,
        telephone,
        business_name,
        commercial_id,
        national_id,
        minimum_order_price,
      },
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register supplier' });
  }
};

const supplierLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const supplier = await prisma.supplier.findUnique({ where: { email } });
    if (supplier && await bcrypt.compare(password, supplier.password)) {
      const token = jwt.sign({ supplierId: supplier.supplier_id }, '2Ea3QFBbKh9QLoBXpmbMOd3lvJaw9O9zxZOoFLi2iZY=', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login supplier' });
  }
};

module.exports = {
  ownerSignup,
  ownerLogin,
  supplierSignup,
  supplierLogin,
};
