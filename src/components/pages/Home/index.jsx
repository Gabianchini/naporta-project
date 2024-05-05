import React from "react";
import localforage from "localforage";
import "./styles.css";
import logo from "../../../assets/naporta-logo.png";
import Button from "../../Button";
import List from "../../List";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    //Get orders info
    const fetchOrders = async () => {
      try {
        const orderKeys = await localforage.keys();
        const orderDetails = await Promise.all(
          orderKeys.map((key) => localforage.getItem(key))
        );
        setOrders(orderDetails.filter((order) => order));
      } catch (error) {
        toast.error("Erro ao criar Pedido");
      }
    };

    fetchOrders();
  }, [orders]);

  const addOrder = async (newOrder) => {
    try {
      // Save the order to local storage using LocalForage
      await localforage.setItem(newOrder.id, newOrder);
      // Update the state to include the new order
      setOrders((existingOrders) => [...existingOrders, newOrder]);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const addClient = (newClient) => {
    setClients((existingClients) => [...existingClients, newClient]);
  };

  return (
    <>
      <header className="container">
        <img className="logo" src={logo} alt="naPorta" />
        <Link to={`/addorder`}>
          <Button text="Novo pedido" />
        </Link>
      </header>
      <main className="list">
        <List orders={orders} />
      </main>
    </>
  );
};

export default HomePage;
