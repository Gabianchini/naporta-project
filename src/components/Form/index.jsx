import React, { useState,useEffect } from 'react';
import localforage from 'localforage';
import './styles.css'
import { v4 as uuidv4 } from 'uuid';


const Form = ({onAddOrder}) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [sendHour, setSendHour] = useState('');
  const [prevArrivalDate, setprevArrivalDate] = useState('');
  const [prevArrivalHour, setprevArrivalHour] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalHour, setArrivalHour]= useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       // Fetch clients from local storage or API
  //       // For simplicity, I'll assume clients are stored in local storage using localforage
  //       const clientKeys = await localforage.keys();
  //       const clientDetails = await Promise.all(clientKeys.map(key => localforage.getItem(key)));
  //       // Filter out any null or undefined client details
  //       const filteredClients = clientDetails.filter(client => client);
  //       setClient(filteredClients);
  //     } catch (error) {
  //       console.error('Error fetching clients:', error);
  //     }
  //   };

  //   fetchClients();
  // }, [client]);

  const handleSubmit = async (e) => {

    e.preventDefault();//prevent reload page when sendind form

    //generate primary key to be unique
    const orderId = uuidv4();

    // Create a new order object
    const newOrder = {
      id: orderId,
      origin,
      destination,
      sendDate,
      sendHour,
      prevArrivalDate,
      prevArrivalHour,
      arrivalHour,
      arrivalDate,
      fullname,
      email, 
      phone
    };

    // Save the order to local storage using LocalForage
    await localforage.setItem(orderId, newOrder);

    // Call the onAddOrder function passed from the parent component
    onAddOrder(newOrder);

    // Clear the form fields
    setOrigin('');
    setDestination('');
    setSendDate('');
    setSendHour('');
    setprevArrivalDate('');
    setprevArrivalHour('');
    setArrivalDate('');
    setArrivalHour('');
    setFullname('')
    setEmail('')
    setPhone('')
  };

  return (
    <section className='formContainer'>
    <form className='form' onSubmit={handleSubmit}>
      <h1 className='formTitle'>Adicionar Pedido</h1>
      <label className='formLabel'>
        Origem:
        <input
          className='inputForm'
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Destino:
        <input
          className='inputForm'
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Dia do envio:
        <input
          className='inputForm'
          type="date"
          value={sendDate}
          onChange={(e) => setSendDate(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Hora do envio:
        <input
          className='inputForm'
          type="time"
          value={sendHour}
          onChange={(e) => setSendHour(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Data de previsão de chegada:
        <input
          className='inputForm'
          type="date"
          value={prevArrivalDate}
          onChange={(e) => setprevArrivalDate(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Hora de previsão de chegada:
        <input
          className='inputForm'
          type="time"
          value={prevArrivalHour}
          onChange={(e) => setprevArrivalHour(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Data de chegada
        <input
          className='inputForm'
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </label>
      <label className='formLabel'>
        Hora de chegada
        </label>
        <input
          className='inputForm'
          type="time"
          value={arrivalHour}
          onChange={(e) => setArrivalHour(e.target.value)}
        />
    
      <label className='formLabel'>Nome do cliente:</label>
      <input
          className='inputForm'
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label className='formLabel'>Email do cliente:</label>
        <input
          className='inputForm'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='formLabel'>Telefone do cliente:</label>
        <input
          className='inputForm'
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      {/* <label> */}
        {/* Cliente: */}
        {/* <select */}
          {/* value={selectedClient} */}
          {/* onChange={(e) => setSelectedClient(e.target.value)} */}
        {/* > */}
          {/* <option value="">Select Client</option> */}
          {/* {client.map(client => ( */}
            {/* <option key={client._id} value={client._id}>{client.fullname}</option> */}
          {/* ))} */}
        {/* </select> */}
      {/* </label> */}
      <button className='formBtn' type="submit">Criar Pedido</button>
    </form>
    </section>
  );
};

export default Form;