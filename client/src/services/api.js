// client/src/services/api.js
import axios from "axios";

export const getOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/orders");
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axios.post("http://localhost:5000/api/orders", orderData);
  return res.data;
};