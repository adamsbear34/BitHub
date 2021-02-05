import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import {Link} from 'react-router-dom';

//Material Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//CSS
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
     
    },
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          BitHub
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }



const EditPorfile = ({ profile: {profile, loading}, createProfile, getCurrentProfile, history }) => {
    const classes = useStyles();

    //Profile data state
    const [formData, setFormData] = useState({
        bio: '',
        title: '',
        twitter: '',
        instagram: '',
        telegram: '',
    });

    /**
     * UseEffect
     * Calling API profile routes
     * Reciving current user profile
     * Setting profile data state
     */
    useEffect(()=>{
        getCurrentProfile();
        setFormData({
            bio: loading || !profile.bio ? '' : profile.bio,
            title: loading || !profile.title ? '' : profile.title,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
            telegram: loading || !profile.social.telegram ? '' : profile.social.telegram
        });
       
    },[]);


    const {
        bio,
        title,
        twitter,
        instagram,
        telegram,
    } = formData;

    /**
     * 
     * @param {*} e 
     * Setting user profile data from the inputs
     */
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    /**
     * 
     * @param {*} e
     * Calling API profile routes
     * Updating profile 
     */
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };
  
    return (

        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avata }>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Profile
          </Typography>
          <form className={classes.form} onSubmit={(e => onSubmit(e))}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                  name="title"
                  value={title}
                  onChange={e => onChange(e)}
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  id="outlined-multiline-static"
                  label="Bio"
                  multiline
                  rows={4}
                  name="bio"
                  id="bio"
                  variant="outlined"
                  fullWidth
                  value={bio}
                  onChange={e => onChange(e)}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="outlined"
                  fullWidth
                  id="twitter"
                  label="Twitter Url"
                  name="twitter"
                  value={twitter}
                  onChange={e => onChange(e)}
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="outlined"
                  fullWidth
                  id="instagram"
                  label="Instagram Url"
                  name="instagram"
                  value={instagram}
                  onChange={e => onChange(e)}
                  
                
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                  variant="outlined"
                  fullWidth
                  id="telegram"
                  label="Telgram Url"
                  name="telegram"
                  value={telegram}
                  onChange={e => onChange(e)}
              
                  />
              </Grid>
              <Grid item xs={12}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  >
                  Update Profile
                  </Button>
                </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  component={Link}
                  to={'/dashboard'}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  >
                  Go Back
                  </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
    </Container>
    
    );
}

EditPorfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(EditPorfile);
