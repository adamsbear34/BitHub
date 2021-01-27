import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';



//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//CSS
const useStyles = makeStyles((theme) => ({
    btn_group: {
        width: 200
    }
}));

const GuestLinks = props => {
    const classes = useStyles();
    return (
        <Fragment>
            <Grid container spacing={1}
                justify="flex-end"
                className={classes.btn_group}
            >
                <Grid item>
                    <Button 
                    variant="outlined"
                    color="secondary" 
                    component={Link} to={'/login'}
                    className={classes.guest_btn}
                    >
                    Log In
                    </Button>
                </Grid>
                <Grid item>
                <Button
                    color="secondary" 
                    variant="outlined" 
                    component={Link} to={'/register'} 
                    >
                    Sign up
                </Button>

                </Grid>
                 
            </Grid>
            
        </Fragment>
    )
}

GuestLinks.propTypes = {

}

export default GuestLinks
