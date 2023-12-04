import React from 'react';

const Button = ({ type, onClick, children, color = 'blue', height = 'auto' }) => {
  const buttonStyle = {
    backgroundColor: color,
    height: height,
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <button type={type} onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
};

export default Button;


import React from 'react';

