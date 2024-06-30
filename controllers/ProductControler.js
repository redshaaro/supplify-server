// controllers/productController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { product_id: parseInt(id) },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { category_id, product_name, price, image, description } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        category_id,
        product_name,
        price,
        image,
        description,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { category_id, product_name, price, image, description } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { product_id: parseInt(id) },
      data: {
        category_id,
        product_name,
        price,
        image,
        description,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { product_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
const getProductsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    const products = await prisma.product.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        category: true,
      },
    });

    if (!products.length) {
      return res.status(404).json({ error: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
