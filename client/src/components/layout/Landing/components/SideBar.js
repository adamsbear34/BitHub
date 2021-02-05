import React from 'react'
import PropTypes from 'prop-types'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


//CSS
const useStyles = makeStyles((theme) => ({
    side_bar_box: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.grey
    },
    about_text: {
        color: "#fafafa",
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
                <Typography className={classes.about_text}>
                    Welcome to BitHub!
                    A place where you can learn about blockchain,
                    сreate and promote your community and teach 
                    people the knowledge you have about blockchain.
                </Typography>
           </Paper>
       </Grid>
    )
}

SideBar.propTypes = {

}

export default SideBar
