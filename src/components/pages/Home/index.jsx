import React from "react";
import localforage from "localforage";
import "./styles.css";
import logo from "../../../assets/caminhao.png";
import Button from "../../Button";
import List from "../../List";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [orders, setOrders] = useState([]);


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


  return (
    <>
      <header className="container">
      <div className="headerTitle">
        <img className="logo" src={logo} alt="naPorta" />
        <span className='title'>FAST DELIVERY</span>
        </div>
        <div>
        <Link to={`/addorder`}>
          <Button text="Novo pedido" />
        </Link>
        </div>
      </header>
      <main className="list">
        <List orders={orders} />
      </main>
    </>
  );
};

export default HomePage;
