import React, { useState } from "react";
import localforage from "localforage";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import backVector from "../../assets/back-vector.png";

const Form = ({ onAddOrder }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendHour, setSendHour] = useState("");
  const [prevArrivalDate, setprevArrivalDate] = useState("");
  const [prevArrivalHour, setprevArrivalHour] = useState("");
  //Future implementation: edit order details to add arrival date and hour   
  // const [arrivalDate, setArrivalDate] = useState("");
  // const [arrivalHour, setArrivalHour] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sentAutocomplete, setSentAutocomplete] = useState(null);
  const [arrivalAutocomplete, setArrivalAutocomplete] = useState(null);
  // For more info on the options allowed for fields (to be returned and billed by Google Maps), please refer to the following link
  // https://developers.google.com/maps/documentation/javascript/reference/places-service?hl=pt-br#PlaceResult
  const autocompleteOptions = {
    fields: ["formatted_address"],
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onSentAutocompleteLoad = (autocomplete) => {
    setSentAutocomplete(autocomplete); // Set origin address autocomplete results
  };

  const onArrivalAutocompleteLoad = (autocomplete) => {
    setArrivalAutocomplete(autocomplete); // Set destination address autocomplete results
  };

  const onSentPlaceChange = () => {
    //Manage change in autocomplete origin field
    if (sentAutocomplete !== null) {
      setOrigin(sentAutocomplete.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onArrivalPlaceChange = () => {
    //Manage change in autocomplete destination field
    if (arrivalAutocomplete !== null) {
      setDestination(arrivalAutocomplete.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent reload page when sendind form

    

    //Generate primary key to be unique
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
      // arrivalHour,
      // arrivalDate,
      fullname,
      email,
      phone,
    };

    // Save the order to local storage using LocalForage
    await localforage.setItem(orderId, newOrder);

    // Call the onAddOrder function passed from the parent component
    onAddOrder(newOrder);

    toast.success("Novo pedido criado com sucesso");

    // Clear the form fields
    setOrigin("");
    setDestination("");
    setSendDate("");
    setSendHour("");
    setprevArrivalDate("");
    setprevArrivalHour("");
    // setArrivalDate("");
    // setArrivalHour("");
    setFullname("");
    setEmail("");
    setPhone("");
  };

  return (
    <section className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="formTitle">
          <Link to={"/"}>
            <img
              className="backBtn"
              role="button"
              alt="Back to Homepage"
              tabIndex="0"
              src={backVector}
            ></img>
          </Link>
          Adicionar Pedido
        </h1>
        <label className="formLabel">
          Origem:
          {isLoaded ? (
            <Autocomplete
              onPlaceChanged={onSentPlaceChange}
              options={autocompleteOptions}
              onLoad={onSentAutocompleteLoad}
              className="inputAddress"
            >
              <input
                data-testid="originField"
                placeholder="Endereço de Envio"
                className="inputForm"
                type="text"
              />
            </Autocomplete>
          ) : (
            // Future implementation: I didn't want to try to mock the Google Maps library nor the Autocomplete service on a first pass due to time constraints.
            <input
              data-testid="originField"
              placeholder="Endereço de Envio"
              className="inputForm"
              type="text"
            />
          )}
        </label>
        <label className="formLabel">
          Destino:
          {isLoaded ? (
            <Autocomplete
              className="inputAddress"
              options={autocompleteOptions}
              onPlaceChanged={onArrivalPlaceChange}
              onLoad={onArrivalAutocompleteLoad}
            >
              <input
                data-testid="destinationField"
                placeholder="Endereço de Entrega"
                className="inputForm"
                type="text"
              />
            </Autocomplete>
          ) : (
            <input
              data-testid="destinationField"
              placeholder="Endereço de Entrega"
              className="inputForm"
              type="text"
            />
          )}
        </label>
        <label className="formLabel">
          Dia do envio:
          <input
            data-testid="sentDateField"
            className="inputForm"
            type="date"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Hora do envio:
          <input
            data-testid="sentTimeField"
            className="inputForm"
            type="time"
            value={sendHour}
            onChange={(e) => setSendHour(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Data de previsão de chegada:
          <input
            data-testid="prevArrivalDateField"
            className="inputForm"
            type="date"
            value={prevArrivalDate}
            onChange={(e) => setprevArrivalDate(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Hora de previsão de chegada:
          <input
            data-testid="prevArrivalTimeField"
            className="inputForm"
            type="time"
            value={prevArrivalHour}
            onChange={(e) => setprevArrivalHour(e.target.value)}
          />
        </label>
        {/* <label className="formLabel"> */}
          {/* Data de chegada */}
          {/* <input */}
            {/* data-testid="arrivalDateField" */}
            {/* className="inputForm" */}
            {/* type="date" */}
            {/* value={arrivalDate} */}
            {/* onChange={(e) => setArrivalDate(e.target.value)} */}
          {/* /> */}
        {/* </label> */}
        {/* <label className="formLabel"> */}
          {/* Hora de chegada */}
          {/* <input */}
            {/* data-testid="arrivalTimeField" */}
            {/* className="inputForm" */}
            {/* type="time" */}
            {/* value={arrivalHour} */}
            {/* onChange={(e) => setArrivalHour(e.target.value)} */}
          {/* /> */}
        {/* </label> */}
        <label className="formLabel">
          Nome do cliente:
          <input
            data-testid="nameField"
            className="inputForm"
            placeholder="Nome Completo"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Email do cliente:
          <input
            data-testid="emailField"
            className="inputForm"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="formLabel">
          Telefone do cliente:
          <input
            data-testid="phoneField"
            className="inputForm"
            placeholder="Telefone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <button className="formBtn" type="submit" data-testid="submitButton">
          Criar Pedido
        </button>
      </form>
    </section>
  );
};

export default Form;
