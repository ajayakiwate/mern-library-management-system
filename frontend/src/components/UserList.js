//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

import ValidateUser from './ValidateUser';

const useStyle = makeStyles({
  header:{
    background: '#111111',
  },
  tabs:{
    color: '#FFFFFF', textDecoration: 'none', marginRight: 20, fontStyle: 20,
  },
});

function UserList() {
  const classes=useStyle();
  return (

    <AppBar position="static" className={classes.header }>
      <ValidateUser/>
      <Toolbar className={classes.header }>

        <NavLink to="/homePage" className={classes.tabs }>Home</NavLink>
        <NavLink to="/booksIssued" className={classes.tabs }>BooksIssued</NavLink>
       
        <NavLink to="/changeUserPassword" className={classes.tabs }>Change Password</NavLink>
        <NavLink to="/logout" className={classes.tabs }>Logout</NavLink>

      </Toolbar>
    </AppBar>
  );
}

export default UserList;
