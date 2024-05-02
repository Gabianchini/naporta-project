import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import OrderForm from '../../organisms/Order/Form';
import OrderList from '../../organisms/Order/List';
import OrderDetails from '../../organisms/Order/Details';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderKeys = await localforage.keys();
        const orderDetails = await Promise.all(orderKeys.map(key => localforage.getItem(key)));
        setOrders(orderDetails.filter(order => order));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async (newOrder) => {
    try {
      // Save the order to local storage using LocalForage
      await localforage.setItem(newOrder.id, newOrder);
      // Update the state to include the new order
      setOrders(existingOrders => [...existingOrders, newOrder]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };
 

  return (
    <div>
      <OrderForm onAddOrder={addOrder} />
      <OrderList orders={orders} />
      <OrderDetails />
    </div>
  );
};

export default OrdersPage;
