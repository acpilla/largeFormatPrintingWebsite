const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const multer = require("multer");
const path = require("path");

// Upload config for payment proof
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/payment/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// PATCH route to submit payment proof
router.patch("/pay/:orderId", upload.single("paymentProof"), async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!req.file) return res.status(400).json({ message: "Payment proof is required" });

    if (order.status !== "Awaiting Downpayment") {
      return res.status(400).json({
        message: `Order is not awaiting payment (current status: ${order.status}).`,
      });
    }

    order.paymentProof = req.file.path;
    order.status = "Payment Submitted";

    await order.save();

    res.json({ message: "Payment submitted successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;