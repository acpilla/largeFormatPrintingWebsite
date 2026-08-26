import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function SendPayment() {
  const [orderId, setOrderId] = useState("");
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchOrder = async () => {
    setNotFound(false);
    setSubmitError("");
    try {
      const res = await axios.get(`${API}/api/orders/lookup/${orderId.trim()}`);
      setOrder(res.data);
    } catch (err) {
      setOrder(null);
      setNotFound(true);
    }
  };

  const submitPayment = async () => {
    if (!file) return alert("Upload payment proof!");
    setSubmitting(true);
    setSubmitError("");
    const formData = new FormData();
    formData.append("paymentProof", file);

    try {
      await axios.patch(`${API}/api/customers/pay/${order.orderId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to submit payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Send Payment</h2>
      <input placeholder="Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} />
      <button onClick={fetchOrder}>Check Order</button>
      {notFound && <p style={{ color: "red" }}>Order not found. Double-check the Order ID.</p>}

      {order && !submitted && (
        <div>
          <p>Customer: {order.customerName}</p>
          <p>Product: {order.productType}</p>
          <p>Price: ₱{order.price}</p>

          {order.status === "Awaiting Downpayment" ? (
            <>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
              <button onClick={submitPayment} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Payment"}
              </button>
              {submitError && <p style={{ color: "red" }}>{submitError}</p>}
            </>
          ) : (
            <p>This order isn't awaiting a downpayment right now (status: {order.status}).</p>
          )}
        </div>
      )}

      {submitted && <p>Payment proof submitted! We'll verify it shortly.</p>}
    </div>
  );
}