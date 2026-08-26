const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const requireAdmin = require("../middleware/auth");
const {
  createOrder,
  getOrders,
  getOrderByOrderId,
  updateOrderStatus,
  approveOrder,
} = require("../controllers/orderController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/designs/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get("/", requireAdmin, getOrders);
router.get("/lookup/:orderId", getOrderByOrderId);
router.post("/", upload.single("designFile"), createOrder);
router.put("/:id/status", requireAdmin, updateOrderStatus);
router.put("/:id/approve", requireAdmin, approveOrder);

module.exports = router;
