import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
//Files
import logo_red from  '../../../../images/logo_red.svg'
//Components
import MenuToolbar from '../components/MenuToolbar';
import GuestLinks from '../components/GuestLinks';
import AuthLinks from '../components/AuthLinks';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';



//CSS 
const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.primary.dark,
      height: 90 ,  
      justifyItems: "center"
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    appbar: {
        
    },
    logo: {
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        height: "auto",
        width: "auto",
        maxWidth: "250px",
        maxHeight: "170px",
        flex: 1,

    },

   
  }));


const NavLayout = ({ auth: { isAuthenticated, loading } }) => {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to={'/tracker'}
                    className={classes.btn_tracker}
                >
                    Tracker
                </Button>
                <img src={logo_red} className={classes.logo} />
            
                { !loading && (<Fragment>{ isAuthenticated  ? <AuthLinks /> : <GuestLinks />}</Fragment>)}

            </Toolbar>
            <MenuToolbar />
           
        </AppBar>
            
    
    )
}

NavLayout.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(NavLayout)
