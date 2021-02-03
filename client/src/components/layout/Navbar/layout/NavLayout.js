import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//Files
import logo_red from  '../../../../images/logo_red.svg'
//Components
import MenuToolbar from '../components/MenuToolbar';
import GuestLinks from '../components/GuestLinks';
import AuthLinks from '../components/AuthLinks';

//Material UI
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { Flag } from '@material-ui/icons';

//CSS 
const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.primary.dark,
      height: 90 ,  
      justifyItems: "center",
      flexGrow: 1
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
    search_bar:{
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
      backgroundColor: theme.palette.primary.dark,
      width: 400,
      height: 30
    },
    search: {
     
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color: theme.palette.secondary.light
    },
    iconButton: {
      padding: 10,
    },
    btn_search: {
      color: theme.palette.secondary.main
    },
    divider: {
      height: 28,
      margin: 4,
      backgroundColor: theme.palette.secondary.light
    },
  }));


const NavLayout = ({ auth: { isAuthenticated, loading }, history }) => {
    const classes = useStyles();

    const [isSearching, setSearchingLayout] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    const handleSearch = (e) => {
      e.preventDefault();
      history.push(`/search?q=${searchQuery}`);
    };

    const handleQuery = (e) => {
      setSearchQuery(e.target.value);  
    };

  const searchLayOut = () => {
    return (
      <Paper component="form" className={classes.search_bar}
        onSubmit={e => handleSearch(e)}
      >
        <InputBase
          className={classes.input}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchQuery}
          onChange={e => handleQuery(e)}
        />
        <IconButton color={"secondary"} type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton  color={"secondary"} className={classes.iconButton} aria-label="close"
          onClick={e => setSearchingLayout(false)}
        >
          <ClearIcon />
        </IconButton>
    </Paper>
    )
  };


    return (
        <AppBar position="static" className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    size={"small"}
                    to={'/tracker'}
                    className={classes.btn_tracker}
                >
                    Tracker
                </Button>
                <img src={logo_red} className={classes.logo}  />
                { !isSearching && (
                    <IconButton
                      onClick={e => setSearchingLayout(true)}
                      className={classes.btn_search}
                    >
                        <SearchIcon />
                    </IconButton>
                )}
                
                { isSearching && (
                  searchLayOut()
                )}
                          
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
export default withRouter(connect(mapStateToProps, null)(NavLayout))
