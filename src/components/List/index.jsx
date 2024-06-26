
import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

const List = ({ orders }) => {
 
  return (
    <div className='listContainer'>
      <h2 className='listTitle'>Pedidos</h2> 
      <ul className='orderList'>
        {orders.map((order, index) => (
          <li className='item' key={order.id}>
            <Link to={`/order/${order.id}`} className='orderLink'>
            <p className='idList'>{order.id.substring(0, 5).toUpperCase()}</p> {/* Get only first 5 chars */}
            <p className='descList'>{`Previsão de entrega em ${order.prevArrivalDate} as ${order.prevArrivalHour}`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;