const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  const { branch_id, supplier_id, driver_id, size, arrival, destination, products, order_status, order_date, order_time, total_price, orderProducts } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        branch_id,
        supplier_id,
        driver_id,
        size,
        arrival,
        destination,
        order_status,
        products,
        order_date,
        order_time,
        total_price,
        orderProducts: {
          create: orderProducts,
        },
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// View orders by restaurant owner
const viewOrdersByOwner = async (req, res) => {
  const ownerId = parseInt(req.params.ownerId);

  try {
    const orders = await prisma.order.findMany({
      where: {
        branch: {
          restaurant: {
            owner_id: ownerId,
          },
        },
      },
      include: {
        branch: true,
        supplier: true,
        driver: true,
        orderProducts: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// View orders by supplier
const viewOrdersBySupplier = async (req, res) => {
  const supplierId = parseInt(req.params.supplierId);

  try {
    const orders = await prisma.order.findMany({
      where: {
        supplier_id: supplierId,
      },
      include: {
        branch: true,
        supplier: true,
        driver: true,
        orderProducts: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { order_id, order_status } = req.body;
  const supplierId = req.user.supplierId; // Assuming you have middleware that sets req.user

  try {
    // Check if the order exists and if the supplier is authorized to update it
    const order = await prisma.order.findUnique({
      where: { order_id: Number(order_id) }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.supplier_id !== supplierId) {
      return res.status(403).json({ error: 'Not authorized to update this order' });
    }

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { order_id: Number(order_id) },
      data: { order_status }
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  createOrder,
  viewOrdersByOwner,
  viewOrdersBySupplier,
  updateOrderStatus
};
