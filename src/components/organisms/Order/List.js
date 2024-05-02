
import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={order.id}>
            Order ID: {order.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;