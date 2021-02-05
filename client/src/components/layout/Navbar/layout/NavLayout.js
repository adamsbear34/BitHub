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
import AuthDrawer from '../components/AuthDrawer';
import GuestDrawer from '../components/GuestDrawer';

//Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';


//CSS 
const useStyles = makeStyles((theme) => ({
    toolbar: {
      flexGrow: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.primary.dark,
      height: 90 ,  
      justifyContent: "sapce-between",
      alignItems: "center",      
     
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    btn_tracker:{
      [theme.breakpoints.down('sm')]: {
        display: "none"
      }
    },
    logoHorizontallyCenter: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      
    
    },
    logo: {
        marginTop: theme.spacing(2),
        height: "auto",
        width: "auto",
        maxWidth: "250px",
        maxHeight: "200px",
        
    },
    logo_small: {
      display: "none"
    },
    search_bar:{
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
      border: `1px solid ${theme.palette.secondary.main}`,
      width: "78%",
      height: 30,
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    search_icon: {
      padding: 0
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
    empty_div: {
      display: 'flex',
      height: "38px",
      width: "98px"
    }
  }));


const NavLayout = ({ auth: { isAuthenticated, loading }, history }) => {
    const classes = useStyles();

    //Searching states
    const [isSearching, setSearchingLayout] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    //Breakpoints
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    /*
    * handleSearch
    * Redirecting user to search page
    */
    const handleSearch = (e) => {
      e.preventDefault();
      history.push(`/search?q=${searchQuery}`);
    };

    /*
    * handleSearchQuery
    * Handling user search query
    */
    const handleQuery = (e) => {
      setSearchQuery(e.target.value);  
    };

    /*
    * SearchLayOut
    * Search form
    */  
  const searchLayOut = () => {
    return (
      <Paper component="form" className={classes.search_bar}
        onSubmit={e => handleSearch(e)}
      >
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'Search ' }}
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

              { isMatch && !loading && (
                 <Fragment>
                   { isAuthenticated ? (
                     <Fragment>
                       <AuthDrawer />
                     </Fragment>
                   ):(
                      <Fragment>
                        <GuestDrawer />
                      </Fragment>
                   )}
                 </Fragment>
              )}

                <Fragment>
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
                    {!isSearching && (
                      <IconButton
                        onClick={e => setSearchingLayout(true)}
                        className={classes.btn_search}
                        >
                        <SearchIcon className={classes.search_icon} />
                      </IconButton>
                    )}
                     { isSearching && (
                        searchLayOut()
                     )}
                    <div className={classes.logoHorizontallyCenter}>
                        <img src={logo_red} className={isSearching ? classes.logo_small : classes.logo } alt={"BitHub"} />
                    </div>
             
                   { !loading && (<Fragment>{ isAuthenticated  ? <Fragment>
                      <div className={classes.empty_div}>

                      </div>
                      <AuthLinks /> 
                      </Fragment> : <GuestLinks />}</Fragment>)}
                </Fragment>
             

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
