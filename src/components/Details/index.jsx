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
          
          <div className='clientContainer'>
          <p className='detailLabel'>Pedido
          <span className='orderTitle'>{order.id.substring(0, 5).toUpperCase()}</span></p>
          <p className='detailClient'>Cliente</p>
          <div className='detailsContainer'>
          <p className='clientDetails'><span className='details'>Nome:</span>{order.fullname}</p>
          <p className='clientDetails'><span className='details' >Email:</span>{order.email}</p>
          <p className='clientDetails'><span className='details'>Telefone:</span>{order.phone}</p>
          </div>
          </div>
        </section>
        </div>
        
      ): <p>Sem detalhes do pedido</p>}
      
    </> 
  );
}

export default Details;

