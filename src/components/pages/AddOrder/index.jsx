import React, { useState, useEffect } from 'react';
import Form from '../../Form';
import localforage from 'localforage';


const AddOrderPage = () => {
  const [orders, setOrders] = useState([]);

  
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const orderKeys = await localforage.keys();
  //       const orderDetails = await Promise.all(orderKeys.map(key => localforage.getItem(key)));
  //       setOrders(orderDetails.filter(order => order));
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

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
      <Form onAddOrder={addOrder} />
    </div>
  );
};

export default AddOrderPage;

// const OrdersPage = () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const orderKeys = await localforage.keys();
//                 const orderDetails = await Promise.all(orderKeys.map(key => localforage.getItem(key)));
//                 setOrders(orderDetails.filter(order => order));
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const addOrder = async (newOrder) => {
//         try {
//             // Save the order to local storage using LocalForage
//             await localforage.setItem(newOrder.id, newOrder);
//             // Update the state to include the new order
//             setOrders(existingOrders => [...existingOrders, newOrder]);
//         } catch (error) {
//             console.error('Error adding order:', error);
//         }
//     };

//     return (
//         <div>
//             <Home orders={orders} />
//             <OrderForm onAddOrder={addOrder} />
//             <OrderDetails />
//         </div>
//     );
// };

// export default OrdersPage;
