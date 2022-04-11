//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
  header:{
    background: '#111111',
  },
  tabs:{
    color: '#FFFFFF', textDecoration: 'none', marginRight: 20, fontStyle: 20,
  },
});

function NavBar() {
  const classes=useStyle();
  return (

    <AppBar position="static" className={classes.header }>
      <Toolbar className={classes.header }>

        <NavLink to="/" className={classes.tabs }>Home</NavLink>
        <NavLink to="/login" className={classes.tabs }>Login</NavLink>

      </Toolbar>
    </AppBar>
  );
}

export default NavBar;