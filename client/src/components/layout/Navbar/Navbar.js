import React from 'react';
import PropTypes from 'prop-types';

//Components
import NavLayout from './layout/NavLayout';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//CSS
const useStyles = makeStyles((theme) => ({
 
}));

const NavBar = () => {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
          <CssBaseline />
          <NavLayout />
        </div>
    )
}

NavBar.propTypes = {

}

export default NavBar;


