import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import {Link} from 'react-router-dom';
//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, CardActionArea } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
      fontFamily: theme.typography.fontFamily,
      color: "#efebe9",
  },
  Card: {
    backgroundColor: '#FFF',
    position: 'relative',
    overflow: 'hidden',
    width: "100%",
    height: "100%",
    minHeight: '250px',
  
    
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#cfcfcf'
  },

  userAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    position: 'relative',
    marginTop: '40px',
  
  },
  userName: {
    fontSize: '17px',
    fontWeight: '400',
    marginTop: '0',
    marginBottom: '0',
    overflow: 'hidden',
    padding: '0, 20px',
    textAlign: 'center',
    width: '100%',

  },
  userTitle: {
    fontSize: '14px',
    display: 'block',
    overflow: 'hidden',
    textAlign: 'center',
    fontWeight: '300'
  },
  action: {
    position: 'absolute',
    textAlign: 'center',
    display: 'flex-root',
    justifyContent: 'center',
    padding: "10px"
    
  },
  bntView:{
    marginLeft: "20px",
    fontWeight: "500",
    fonstSize: 15,
    
    
    
  }
 

  
}));



const ProfileItem = ({profile: {
  user,
  title,
  bio
}}) => {
  const classes = useStyles();

  

  return (
    <Grid item xs={4}>
      <Card className={classes.Card} >
          <CardContent className={classes.content}>
            <Avatar className={classes.userAvatar}>

            </Avatar>
          <Typography className={classes.userName}>@{user.username}</Typography>
          <Typography className={classes.userTitle}>{title}</Typography>
          </CardContent>
          <CardActionArea className={classes.action}>
            <Button className={classes.bntView} color="secondary" variant="outlined" size="small" component={Link} to={`/profile/${user._id}`}>View</Button>
          </CardActionArea>
      </Card>
    </Grid>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileItem

