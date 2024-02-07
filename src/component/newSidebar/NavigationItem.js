import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

// NavigationItem component
function NavigationItem({ item, handleClick }) {
  const { name, path, icon } = item;

  return (
    <ListItem disablePadding>
      {name === "logout" ? (
        <ListItemButton onClick={handleClick}>
          <Box sx={{ ml: "20px" }} className="nav_icon">{icon}</Box>
          <ListItemText sx={{ ml: "20px", fontSize: "25px" }} primary={name} />
        </ListItemButton>
      ) : (
        <Link to={path} style={{ textDecoration: "none", color: "black" }}>
          <ListItemButton>
            <Box sx={{ ml: "20px" }} className="nav_icon">{icon}</Box>
            <ListItemText sx={{ ml: "20px", fontSize: "25px" }} primary={name} />
          </ListItemButton>
        </Link>
      )}
    </ListItem>
  );
}

export default NavigationItem;
