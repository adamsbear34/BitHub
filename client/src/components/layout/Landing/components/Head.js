import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

//Componentes
import banner from '../../../../images/banner_2.svg';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//CSS
const useStyles = makeStyles((theme) => ({
    banner: {
      position: 'relative',
      height: 'auto',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    cover_image: {
        width: "100%",
        height: "auto"
    }
  }));


const Head = (props) => {    
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <img  src={banner} alt={"banner"} className={classes.cover_image} /> 
        </div>
    )
}

Head.propTypes = {

}

export default Head
