import React from "react";
import localforage from "localforage";
import "./styles.css";
import logo from '../../../assets/img/naporta-logo.png';
import Button from "../../atoms/button/Button";
import OrderList from "../../organisms/List/List";
import OrderForm from "../../organisms/Form/OrderForm";
import ClientForm from "../../organisms/Form/ClientForm";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";




const Home = ( ) => {
    const [orders, setOrders] = useState([]);
    const [clients,setClients] = useState([])

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

     
//   const addClient = (newClient) => {
//     setClients(existingClients => [...existingClients, newClient]);
//   };


    return (
        
        <div>
        <header className="container">
            <img className="logo" src={logo} alt="naPorta"/>
            <Link to={`/addorder`}>
            <Button text="Novo pedido"/>
            </Link>
        </header>
        <main className="list">
        
        <OrderList orders={orders} />
             
        </main>
        {/* <OrderForm onAddOrder={addOrder} /> */}
        {/* <ClientForm onAddClient={addClient} /> */}
        </div>
        
    );
}

export default Home;