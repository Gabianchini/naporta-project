import React from 'react';
import './styles.css';

const Button = ({ text }) => {
  return (
    <button className='btn' aria-label={text}>
      {text}
    </button>
  );
}

export default Button;
