import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

//Components
import MainPosts from '../layout/MainPosts';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//CSS
const useStyles = makeStyles((theme) => ({
  
}));

const Main = props => {

    return (
        <Grid item xs={12} md={9}>
            <MainPosts />
        </Grid>
    )
}





Main.propTypes = {

}





export default Main
