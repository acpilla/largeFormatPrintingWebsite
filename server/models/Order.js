const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    productType: {
      type: String,
      required: true,
      enum: ["Tarpaulin", "Sintra Board", "Sticker"],
    },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    pieces: { type: Number, required: true },
    notes: { type: String, default: "" },
    designFile: { type: String },
    price: { type: Number },
    paymentProof: { type: String },
    status: {
      type: String,
      default: "Pending Approval",
      enum: [
        "Pending Approval",
        "Awaiting Downpayment",
        "Payment Submitted",
        "Printing",
        "Completed",
        "Fully Paid",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);