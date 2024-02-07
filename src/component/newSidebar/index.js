import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from 'store/authSlice';
import Heatmap from 'component/Heatmap';
import ImgComponent from 'component/Shared/ImgComponent';
import Logo from "assets/images/logo.png";
import pagesData from "config/pages";
import Navigation from './Navigation';
import Navbar from './NavDashboard';
import './index.css';
const drawerWidth = 230;

// ResponsiveDrawer component
function ResponsiveDrawer({ window }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandle = () => {
    dispatch(logout());
    navigate("/");
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
           position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            height: "70px",
            backgroundColor:"white"
          }}
        >
          <Toolbar>
            <IconButton
              color="white"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Navbar />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
           <List className="logo" sx={{ textAlign: "center" }}>
              <ImgComponent src={Logo} alt="logo of the company" width="96px" height="115px" />
            </List>
            <Divider />
            <List className="profile" sx={{ textAlign: "center" }}>
              <ImgComponent src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefzdu7AmhFkTRPg5krNBHh0if3gHheNy_Qw&usqp=CAU" alt="profile-picture" />
            </List>
            <Divider />
            <Navigation data={pagesData} handleClick={logoutHandle} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <List className="logo" sx={{ textAlign: "center" }}>
              <ImgComponent src={Logo} alt="logo of the company" width="96px" height="115px" />
            </List>
            <Divider />
            <List className="profile" sx={{ textAlign: "center" }}>
              <ImgComponent src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefzdu7AmhFkTRPg5krNBHh0if3gHheNy_Qw&usqp=CAU" alt="profile-picture" />
            </List>
            <Divider />
            {/* Navigation component */}
            <Navigation data={pagesData} handleClick={logoutHandle} />
          </Drawer>
        </Box>
        <Outlet />
      </Box>
      <Heatmap />
    </>
  );
}

export default ResponsiveDrawer;
