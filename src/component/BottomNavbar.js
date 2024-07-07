import React from 'react';
import Paper from '@mui/material/Paper';

const BottomNavbar = ({Bottom}) => {
  const bottomNavbarStyles = {
    root: {
      display:'flex',
      alignItems:'center',
      width: '100%',
      position: 'fixed',
      bottom: '0px',
      backgroundColor: '#fafafa',
      height: '60px',
      borderTop: '1px solid #eee',
      zIndex: 999,
    },
  };

  return (
    <Paper sx={bottomNavbarStyles.root}>
      {Bottom}
    </Paper>
  );
};

export default BottomNavbar;