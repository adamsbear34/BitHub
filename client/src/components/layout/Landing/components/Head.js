import react from 'react'
import PropTypes from 'prop-types'

//Componentes
import banner from '../../../../images/bithub_banner.svg';

//Material UI
import { makeStyles } from '@material-ui/core/styles';


//CSS
const useStyles = makeStyles((theme) => ({
    banner: {
      position: 'relative',
      height: 'auto',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(0),
        height: "100%"
      }
    },
    cover_image: {
        width: "100%",
        height: "auto",
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
