import React, { useState } from 'react';
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';


const OrderForm = ({onAddOrder}) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [sendHour, setSendHour] = useState('');
  const [prevArrivalDate, setprevArrivalDate] = useState('');
  const [prevArrivalHour, setprevArrivalHour] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalHour, setArrivalHour]= useState('');

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
      arrivalDate

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Origem:
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </label>
      <label>
        Destino:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </label>
      <label>
        Dia do envio:
        <input
          type="date"
          value={sendDate}
          onChange={(e) => setSendDate(e.target.value)}
        />
      </label>
      <label>
        Hora do envio:
        <input
          type="time"
          value={sendHour}
          onChange={(e) => setSendHour(e.target.value)}
        />
      </label>
      <label>
        Data de previsão de chegada:
        <input
          type="date"
          value={prevArrivalDate}
          onChange={(e) => setprevArrivalDate(e.target.value)}
        />
      </label>
      <label>
        Hora de previsão de chegada:
        <input
          type="time"
          value={prevArrivalHour}
          onChange={(e) => setprevArrivalHour(e.target.value)}
        />
      </label>
      <label>
        Data de chegada
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </label>
      <label>
        Data de chegada
        <input
          type="time"
          value={arrivalHour}
          onChange={(e) => setArrivalHour(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;