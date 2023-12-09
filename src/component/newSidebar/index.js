import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar'; 
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import pagesData from "config/pages";
import logo from "assets/images/logo.png"
import profile1 from "assets/images/profile1.png";
import profilepicture from "assets/images/profilepic.jpeg";
import Navbar from '../navbar/index';
import {Outlet,Link} from 'react-router-dom';
import Heatmap from 'component/Heatmap';
import API from "utils/api";

const drawerWidth = 230;

function ResponsiveDrawer(props) {
  const[profilepic,setProfilepic]=useState(null);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmit = async (event) => {
    try {
      await API.getUserProfile(async(flag,res)=>{
        const blob = await res.blob();
       setProfilepic(blob)
      })
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }

  const createBlobUrl = (base64Data) => {
    const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  useEffect(()=>{
    handleSubmit()
  },[])

  const drawer = (
    <div>
      <List className="logo" sx={{textAlign:"center"}}>      
      <img src={logo} style={{width:"96px",height:"115px"}} alt="logo of the company" />
     </List>
     <Divider />
     <List className="profile" sx={{textAlign:"center"}}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefzdu7AmhFkTRPg5krNBHh0if3gHheNy_Qw&usqp=CAU" style={{width:"100px",height:"100px"}} alt="profile picture" />
      </List>
      <Divider />
      <List>
        {pagesData&&pagesData.map((data, index) => (
          data.name ==="logout"?
          <ListItemButton key={index}>
          <ListItem disablePadding>
              <Box sx={{ml:"20px"}}  className="nav_icon" >{data.icon}</Box>
           <ListItemText onClick={()=>console.log("call logout function")} sx={{ml:"20px",fontSize:"25px"}} primary={data.name} />
           </ListItem>
           </ListItemButton>: <ListItem key={index} disablePadding>
            <Link to={`${data.path}`} style={{textDecoration:"none",color:"black"}}>
              <ListItemButton>
                <Box sx={{ml:"20px"}} className="nav_icon" >{data.icon}</Box>
                <ListItemText  sx={{ml:"20px",fontSize:"25px"}} primary={data.name} />
              </ListItemButton>
            </Link>
           </ListItem>
        ))}
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height:"70px"
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
         
         </Toolbar>
         <Navbar /> 
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </Box>
     <Heatmap />
    </>
  );
}
export default ResponsiveDrawer;
