import React, { useState } from 'react';

const useDrawer = () => {
  const [anchor, setAnchor] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (direction, open) => (event) => {
     console.log("hello")
    if (event&&event.type === 'keydown' &&(event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor({ ...anchor, [direction]: open });
  };

  return {anchor,toggleDrawer};
};

export default useDrawer;