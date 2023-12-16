import React,{useEffect,useRef} from 'react';
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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate,Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import logo from 'assets/images/logo.png';
import PopupForm from 'component/Loginpopup/Loginform';
import Homepages from 'config/Homepages';

const drawerWidth = 240;


function DrawerAppBar(props) {
  const { isLoggedin} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const parentRef = useRef(null);
  const theme = createTheme({
    typography: {
      fontFamily: [
        'poppins',
      ].join(','),
    },
  });

  useEffect(()=>{
   
  },[isLoggedin])

  const handleDrawerToggle = (event) => {
    if(event.target.id==="registration-redirect"){
      setMobileOpen(!mobileOpen); 
    }
    else if (parentRef.current && parentRef.current.contains(event.target)) {
      return;
    }
    else if(event.target.id==="login-open"){
      return;
    }
    else {
      setMobileOpen(!mobileOpen); 
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',position:'relative' }} id="drawer">
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo} alt='logo' width="50px" height="60px" />
      </Typography>
      <Divider />
      <List>
        {Homepages.map((item) => (
          <ListItem key={item?.id} disablePadding>
            <Link to={item?.path} style={{textDecoration:"none",color:"black",marginLeft:"auto",marginRight:"auto"}}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
         {isLoggedin?<Button onClick={(e) =>navigate("/dashboard")} sx={{ color: 'white', ml: '35px', backgroundColor: 'rgba(126, 28, 254, 1)', fontWeight: '400', fontSize: '15px' }}>
                  dashboard
        </Button> :<PopupForm loginRef={parentRef}/>}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" style={{ background: '#fff' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
            sx={{ mr: 2,display: { sm: 'none' },color: "black" }}
          > 
             <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <img src={logo} alt='logo' width="50px" height="60px" />
          </Box>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: '50px' }}>
              {Homepages.map((item) => (
                <Button key={item?.id} sx={{ color: 'black', ml: '35px', fontWeight: '400', fontSize: '15px' }} >
                  <Link to={item?.path} style={{textDecoration:'none',color:"black"}}>
                    {item?.name}
                  </Link>
                </Button>
              ))}
              {isLoggedin ? <Button onClick={() => navigate("/dashboard")} sx={{ color: 'white', ml: '35px', backgroundColor: 'rgba(126, 28, 254, 1)', fontWeight: '400', fontSize: '15px' }}>
                  dashboard
                </Button> :<PopupForm loginRef={parentRef}/>}
            </Box>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}


export default DrawerAppBar;
