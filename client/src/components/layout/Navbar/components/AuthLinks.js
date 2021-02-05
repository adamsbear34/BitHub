import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../actions/auth';

//Material UI 
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';




const AuthLinks = ({ logout }) => {

    //Drop down menue state    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    /*
    * handleMenu
    * Handleing menu itmes
    */
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
     /*
    * handleClose
    * Closing menu
    */
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
               <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to={'/'}>Home</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/dashboard'}>Dashboard</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/create-post'}>Add Post</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/profiles'}>Profiles</MenuItem>
                <MenuItem onClick={ logout }>Logout</MenuItem>
              </Menu>
        </Fragment>
    )
}

AuthLinks.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default connect(null, { logout })(AuthLinks)