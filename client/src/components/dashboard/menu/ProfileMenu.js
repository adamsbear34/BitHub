import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

//Components
import ProfilePosts from './tabs/ProfilePosts';
import ProfileCoins from './tabs/ProfileCoins';
import ProfileStats from './tabs/ProfileStats';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    appBar: {
        marginTop: "2px",
        backgroundColor: "white",
        color: "#37474f",
    },
  }));

const ProfileMenu = ({profile, auth}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
             <CssBaseline />
             <div className={classes.layout}>
                <AppBar position="static" className={classes.appBar} >
                <Tabs aria-label="User options" value={value} onChange={handleChange}>
                    <Tab label="Posts" />
                    <Tab label="Coins" />
                    { auth.isAuthenticated && (
                    auth.user._id === profile.user._id && (
                        <Tab label="Account Stats" />
                        )
                    )}
                </Tabs>
                </AppBar>
                { value === 0 && <ProfilePosts posts={profile.user.posts} user={profile.user} auth={auth} /> } 
                { value === 1 && <ProfileCoins user={profile.user}  auth={auth} coins={profile.coins} /> } 
                { auth.isAuthenticated && (
                    auth.user._id === profile.user._id && (
                        value === 2 && <ProfileStats />
                    )
                )}
                  
             </div>
            
            
        </Fragment>
    )
}

ProfileMenu.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}



export default ProfileMenu
