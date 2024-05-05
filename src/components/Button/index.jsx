import React from 'react';
import './styles.css';

const Button = ({ text }) => {
  return (
    //Button component to be able to reuse btn as needed
    <button className='btn' aria-label={text}>
      {text}
    </button>
  );
}

export default Button;
