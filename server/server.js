const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Make sure upload folders exist on startup
["uploads/designs", "uploads/payment"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => res.send("Modify Printing API is running."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));