import React from 'react';


//Components
import Head from './components/Head';
import Main from './components/Main';
import SideBar from './components/SideBar';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
//CSS
const useStyles = makeStyles((theme) => ({
  
}));

const Landing = () => {
    const classes = useStyles();


    return (
        <Container maxWidth={"lg"}>
            <main>
                <Head />
                <Typography variant="h6" gutterBottom>
                    Featured Articles
                </Typography>
                <Divider /> 
                <Grid container spacing={5} className={classes.main_grid}>
                    <Main />
                    <SideBar />
                </Grid>
            </main>
        </Container>
    )
}


export default Landing;