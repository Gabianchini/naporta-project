import React, { useState, useEffect } from "react";
import Form from "../../Form";
import toast from "react-hot-toast";
import localforage from "localforage";

const AddOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const addOrder = async (newOrder) => {
    try {
      // Save the order to local storage using LocalForage
      await localforage.setItem(newOrder.id, newOrder);
      // Update the state to include the new order
      setOrders((existingOrders) => [...existingOrders, newOrder]);
    } catch (error) {
      toast.error("Erro ao criar pedido.");
    }
  };

  return <Form onAddOrder={addOrder} />;
};

export default AddOrderPage;
