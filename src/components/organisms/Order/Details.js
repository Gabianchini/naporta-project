import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);


  //When a order is added the details section will update to display details of new order
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
  }, [orders]); 

  return (
    <div>
      <h2>Order Details</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div>Order ID: {order.id}</div>
            <div>Origem: {order.origin}</div>
            <div>Destino: {order.destination}</div>
            <div>Previsão de chegada:{order.prevArrivalDate}</div>
            <div>Previsão de horário de chegada:{order.prevArrivalHour}</div>
            <div>Horário de chegada:{order.arrivalDate}</div>
            <div>Dia de chegada:{order.arrivalHour}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
