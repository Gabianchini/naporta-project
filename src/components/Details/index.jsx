import React, { useState, useEffect  } from 'react';
import localforage from 'localforage';
import carVector from "../../assets/car-vector.png"
import flagVector from '../../assets/flag-vector.png'
import arrowVector from '../../assets/back-vector.png'
import line from '../../assets/line-vector.png'
import { Link } from 'react-router-dom';
import Map from '../Map';
import './styles.css'

const Details = ( ) => {
  const [order, setOrder] = useState();
 
  const url = window.location.pathname.split('/');//split url with /
  const orderId = url[url.length-1]; // get the right url


  // Fetch order details
  useEffect(() => {
    const fetchOrder = async (orderId) => {
      try {
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
       {/*Get order info if order exist*/}
        {order ? (  
       <div className='detailsContainer'>
        <header key={order.id} className="detailsHeader">
         <Link to={`/`}>
         <img role='button' className="backVector" src={arrowVector} alt="Back to homepage"/>
       </Link>
      <p className='orderTitle'>Pedido {order.id.substring(0, 5).toUpperCase()}</p>
     </header> 
    <main className='mapContainer'>
     <Map sentFromAddress={order.origin}  receivedAtAddress={order.destination}/>
     </main>
        <section className='sectionDetails'>
          <div className='routeDescription'>
            <img className='line'src={line}></img>
            <div className='columnSendto'>
              <div className='vectorBackground'><img className='vector' src={carVector} alt="origin marker"/></div>
              <div className='vectorBackground'><img className='vector' src={flagVector} alt="destination marker"/></div>
            </div>
            <div className='columnReceveidto'>
              <p className='routeText'>Saindo em {order.origin}</p><p className='dateText'>{order.sendDate} as {order.sendHour}</p>
              <p className='routeText'>Chegando em {order.destination}</p><p className='dateText'>{order.prevArrivalDate} as {order.prevArrivalHour}</p>
            </div>
            
          </div>
          
          <p className='detailLabel'>Pedido</p>
          <p className='orderTitle'>{order.id.substring(0, 5).toUpperCase()}</p>
          <p className='detailLabel'>Cliente</p>
          <p className='clientDetails'>{order.fullname}</p>
          <p className='clientDetails'>{order.email}</p>
          <p className='clientDetails'>{order.phone}</p>
          
        </section>
        </div>
      ): <p>Sem detalhes do pedido</p>}
    </> 
  );
}

export default Details;

