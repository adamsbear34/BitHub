import React from 'react'
import PropTypes from 'prop-types'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

//CSS
const useStyles = makeStyles((theme) => ({
    side_bar_box: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.grey
    }
}));

const SideBar = ({props}) => {
    const classes = useStyles();


    
    return (
       <Grid item xs={12} md={3}>
           <Paper className={classes.side_bar_box}>
            <Typography variant="h6" gutterBottom color={"secondary"}>
                About
            </Typography>
                <Typography>Welcome to BitHub!</Typography>
           </Paper>
       </Grid>
    )
}

SideBar.propTypes = {

}

export default SideBar
