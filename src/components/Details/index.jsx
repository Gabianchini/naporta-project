import React, { useState, useEffect  } from 'react';
import localforage from 'localforage';
import carVector from "../../assets/car-vector.png"
import flagVector from '../../assets/flag-vector.png'
import arrowVector from '../../assets/arrow-vector.png'
import { Link } from 'react-router-dom';
import Map from '../Map';
import './styles.css'

const Details = () => {
  const [order, setOrder] = useState();
 
  const url = window.location.pathname.split('/');//split url with /
  const orderId = url[url.length-1]; // get the right url

  useEffect(() => {
    const fetchOrder = async (orderId) => {
      try {
        // Fetch order details
        const orderDetails = await localforage.getItem(orderId);
        setOrder(orderDetails);        
      } catch (error) {
        console.error('Error fetching order and client details:', error);
      }
    };

    fetchOrder(orderId);
  }, [orderId]); 

 

  return (
    < >
        {/* {order ? ( 
       <div>
        <header key={order.id} className="detailsContainer">
         <Link to={`/`}>
         <img role='button' className="backVector" src={arrowVector} alt="Back to homepage"/>
       </Link>
      <p>Pedido {order.id}</p>
     </header> */}
     <main>
     <Map/>
     </main>
        {/* <section> */}
          {/* <div className='parent'> */}
            {/* <div className='column1'> */}
              {/* <div className='square'><img className='vector' src={carVector} alt="Car vector"/></div> */}
              {/* <div className='square'><img className='vector' src={flagVector} alt="Flag vector"/></div> */}
            {/* </div> */}
            {/* <div className='column2'> */}
              {/* <p className='routeText'>Saindo em {order.origin}</p><p>{order.sendDate} as {order.sendHour}</p> */}
              {/* <p className='routeText'>Chegando em {order.destination}</p><p>{order.prevArrivalDate} as {order.prevArrivalHour}</p> */}
            {/* </div> */}
          {/* </div> */}
          {/* <p className='detailSection'>Pedido</p> */}
          {/* <p className='orderTitle'>{order.id}</p> */}
          {/* <p className='detailSection'>Cliente</p> */}
          {/* <p>{order.fullname}</p> */}
          {/* <p>{order.email}</p> */}
          {/* <p>{order.phone}</p> */}
        {/* </section> */}
        {/* </div> */}
      {/* ): <p>Sem detalhes do pedido</p>} */}
    </> 
  );
}

export default Details;

