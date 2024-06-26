import HomePage from './components/pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderDetailsPage from './components/pages/OrdersDetails';
import './App.css';
import { useState } from 'react';
import AddOrderPage from './components/pages/AddOrder';
import { Toaster } from 'react-hot-toast';


function App() {

  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/order/:id" element={<OrderDetailsPage/>} /> 
        <Route path="/addorder" element={<AddOrderPage/>}/>
      </Routes>
    </Router>
    <Toaster/>
   </>
    
  );
};

export default App;
