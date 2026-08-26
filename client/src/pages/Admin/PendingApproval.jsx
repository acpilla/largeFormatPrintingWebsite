import { useEffect, useState } from "react";
import { getOrders } from "../../services/api";

export default function PendingApproval() {
  const [orders, setOrders] = useState([]);
  const [priceMap, setPriceMap] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.filter((o) => o.status === "Pending"));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePriceChange = (orderId, value) => {
    setPriceMap({ ...priceMap, [orderId]: value });
  };

  const handleSendPrice = async (order) => {
    const price = priceMap[order._id];
    if (!price) return alert("Enter a price first.");

    try {
      await fetch(`http://localhost:5000/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, status: "Awaiting Payment" }),
      });
      alert(`Price sent to ${order.email}!`);
      fetchOrders(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to send price.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1 style={{ fontFamily: "Helvetica Neue", fontWeight: 600 }}>Pending Orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ padding: "1rem", border: "1px solid #e1e1e1", borderRadius: "10px", marginBottom: "1rem" }}>
          <p><strong>{order.customerName}</strong> ({order.email})</p>
          <p>Product: {order.productType}, Size: {order.width}x{order.height}, Pieces: {order.pieces}</p>
          <input
            type="number"
            placeholder="Set Price"
            value={priceMap[order._id] || ""}
            onChange={(e) => handlePriceChange(order._id, e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", marginRight: "1rem" }}
          />
          <button onClick={() => handleSendPrice(order)} style={{ padding: "0.5rem 1rem", borderRadius: "5px", backgroundColor: "#007AFF", color: "#fff", border: "none" }}>Send Price</button>
        </div>
      ))}
    </div>
  );
}