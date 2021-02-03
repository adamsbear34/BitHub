import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import {Link, withRouter } from 'react-router-dom';

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
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const theme = createMuiTheme({
    palette: {
       primary: {
          main: "#212121" // This is an orange looking color
                 },
       secondary: {
          main: "#7200ca" //Another orange-ish color
                  }
             },
    //fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
 });



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
      margin: theme.spacing(3, 0, 2),
    },
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        BitHub{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }



const CreateProfile = ({ createProfile, history }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        bio: '',
        title: '',
        twitter: '',
        instagram: '',
        telegram: '',
    });

    const {
        bio,
        title,
        twitter,
        instagram,
        telegram,
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <ThemeProvider theme={theme}>
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
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Create Profile
            </Button>
        </form>
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
    </Container>
  </ThemeProvider>
    
    );
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, {createProfile})(withRouter(CreateProfile));
