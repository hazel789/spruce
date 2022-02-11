import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/spruce_logo2.PNG";

import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";

   
const NavBar = (props) => {
  const history = useHistory();
  const theme = useTheme(); 
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
      setOpen(true);
    };

  const handleDrawerClose = () => {
      setOpen(false);
    };

  useEffect(async ()=> {
    const localStorage = window.localStorage;
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const res = await fetch('http://localhost:3000/user',  {
        headers: {
        'authorization': `Bearer ${accessToken}`
        }
      });
      if (res.status === 403) {
          accessToken = null;
          localStorage.removeItem('accessToken');
      }
    }
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(accessToken);
    console.log("called");
  }, [location])

  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }),
    );

  const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

  const fetchData = async (url) => {
    console.log(url);
    const resp = await fetch(url)
    props.setFetchData({fetchData: false})
    
    const products = await resp.json();
    console.log(products);
    props.setProductsData(products);
  }

  const handleOnChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleOnClickSearch = async (event) => {
    console.log(searchInput);
    event.preventDefault();
    let queryURL = `http://localhost:3000/product/search?fuzzy=${searchInput}`
    await fetchData(queryURL)
    history.push('/products')
  }

  const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

  return (
      <>

    <Box sx={{ flexGrow: 1, }}>
    <AppBar position="static" sx={{boxShadow: 'none', bgcolor: 'rgba(244, 162, 97, 0.9)', maxHeight:"68px"}}>
      <Toolbar>
        <IconButton onClick={handleDrawerOpen}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, color: "#f7ede2"}}
        >
          <MenuIcon />
        </IconButton>
        <Link to='/'>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <img src={logo} width="28%"></img>
          </Typography>
          </Link>

          {/* <TextField id="standard-basic" label="Search" variant="standard" /> */}

          <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{color: "#f7ede2"}}/>
          </SearchIconWrapper>
          <form onSubmit={handleOnClickSearch}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'searchInput' }}
            value={searchInput}
            onChange={handleOnChange}
            name="searchInput"
            autoFocus="true"
          />
          </form>
          </Search>
      <Link to='/cart'>
          <IconButton color="primary" sx={{color: "#f7ede2", margin:"10px"}} aria-label="add to shopping cart">
              <AddShoppingCartIcon/>
          </IconButton>  
      </Link>            
      </Toolbar>
    </AppBar>
      </Box>
      <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton sx={{color: "black"}} onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
          <Link to='/' style={{textDecoration:'none'}} onClick={handleDrawerClose}>
          <ListItem>
            <ListItemText primaryTypographyProps={{fontSize:'15px'}}>
                Home
            </ListItemText>
          </ListItem>
          </Link>

          {!isLoggedIn ?
          <>
          <Link to='/login' style={{textDecoration:'none'}} onClick={handleDrawerClose}>
          <ListItem>
            <ListItemText primaryTypographyProps={{fontSize:'15px'}}>
                Log In
            </ListItemText>
          </ListItem>
          </Link>
          <Link to='/signup' style={{textDecoration:'none'}} onClick={handleDrawerClose}>
          <ListItem>
            <ListItemText primaryTypographyProps={{fontSize:'15px'}}>
                Create Account
            </ListItemText>
          </ListItem>
          </Link>
          </> : 
          <Link to='/user' style={{textDecoration:'none'}} onClick={handleDrawerClose}>
          <ListItem>
            <ListItemText primaryTypographyProps={{fontSize:'15px'}}>
                Account
            </ListItemText>
          </ListItem>
          </Link>
          }
          <ListItem>
          <Link to='/products' style={{textDecoration:'none'}} onClick={handleDrawerClose}>
            <ListItemText primaryTypographyProps={{fontSize:'15px'}}>
              Shop
            </ListItemText>
            </Link>
          </ListItem>
      </List>
    </Drawer>
      </>
  )
}

export default NavBar;