import React from 'react';
import NavigationItem from './NavigationItem';

// Navigation component
function Navigation({ data, handleClick }) {
  return (
    <>
      {data.map((item, index) => (
        <NavigationItem key={index} item={item} handleClick={handleClick} />
      ))}
    </>
  );
}

export default Navigation;
