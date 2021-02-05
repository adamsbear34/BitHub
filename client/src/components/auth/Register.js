import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import {Redirect} from 'react-router-dom';


//Material Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";


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
      margin: theme.spacing(3, 0, 2),
    },
  
  }));

const Register = ({ setAlert, register, isAuthenticated }) => {
    const classes = useStyles();

    //User register credentials state 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''

    });

    const { username, email, password, password2} = formData;

    /*
    * onChange update user credentials state from text field
    */
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    /*
    * Validating user password
    * Submiting user credentials
    * Callin API register route
    */
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
           setAlert("Passwords do not match", 'error');
        }else{
            register({ username, email, password});
        }
    };

    //Redirect 
    if (isAuthenticated){
        return(<Redirect to='/dashboard' />);
    }

    
    return ( 
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form className={classes.form}  onSubmit={e => onSubmit(e)}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
           
                fullWidth
                id="userName"
                value={username}
                onChange={e => onChange(e)}
                label="User Name"
                autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                fullWidth
                required
                id="email"
                value={email}
                onChange={e => onChange(e)}
                label="Email Address"
                name="email"
                autoComplete="email"
              
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
                id="password"
                autoComplete="current-password"
               
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={e => onChange(e)}
                id="password2"
                autoComplete="current-password"
             
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
            Sign Up
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
                <Link href="/login" variant="body2">
                Already have an account? Sign in
                </Link>
            </Grid>
            </Grid>
        </form>
        </div>
        <Box mt={5}>
        <Copyright />
        </Box>
    </Container>
  </ThemeProvider>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateProps, { setAlert, register })(Register);
