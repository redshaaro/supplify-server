const express = require("express");
const {
  createOrder,
  viewOrdersByOwner,
  viewOrdersBySupplier,
  updateOrderStatus,
} = require("../controllers/OrderControler");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/order", authenticate, createOrder);
router.get("/orders/owner/:ownerId", authenticate, viewOrdersByOwner);
router.get("/orders/supplier/:supplierId", authenticate, viewOrdersBySupplier);
router.put("/order/:orderId/status", authenticate, updateOrderStatus);

module.exports = router;
