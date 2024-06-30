// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductControler");
router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get(
  "/category/:id",
  productController.getProductsByCategory
);

module.exports = router;
