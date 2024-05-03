import HomePage from './components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderDetailsPage from './components/pages/OrdersDetails';
import './App.css';
import Form from './components/Form';
import { useState } from 'react';
import AddOrderPage from './components/pages/AddOrder';


function App() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([])

  
  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);

  };

  const addClient = (newClient) => {
    setClients(existingClients => [...existingClients, newClient]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/order/:id" element={<OrderDetailsPage/>} /> 
        <Route path="/addorder" element={<AddOrderPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
