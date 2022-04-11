//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Validate from './Validate';

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

function AdminList() {
  const classes=useStyle();
  return (

    <AppBar position="static" className={classes.header }>
        <Validate />
        <Toolbar className={classes.header }>

        <NavLink to="/home" className={classes.tabs }>Home</NavLink>
        <NavLink to="/addBook" className={classes.tabs }>Add Books</NavLink>
        <NavLink to="/booksList" className={classes.tabs }>Books List</NavLink>
        <NavLink to="/createUser" className={classes.tabs }>Create User</NavLink>
        <NavLink to="/usersList" className={classes.tabs }>Users List</NavLink>
        <NavLink to="/issueBook" className={classes.tabs }>Issue Book</NavLink>
        <NavLink to="/collectBook" className={classes.tabs }>Collect Book</NavLink>
       
        <NavLink to="/changeAdminPassword" className={classes.tabs }>Change Password</NavLink>
        <NavLink to="/logout" className={classes.tabs }>Logout</NavLink>

      </Toolbar>
    </AppBar>
  );
}

export default AdminList;
