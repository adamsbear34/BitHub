import React from 'react'
import PropTypes from 'prop-types'


//Materiual Ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

//Css
const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        color: "#efebe9",
    },
    paper: {
      backgroundColor: "#212121",
      height: "300px"

    },  
    userAvatar: {
        backgroundColor: "white",
        color: "red",
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    paperMain:{
        backgroundColor: "#212121",
        display: 'block'

    },
    paperText:{
        color: "white",
        paddingTop: "10px"
    },
    userContent: {
        marginTop: "50px",
        color: "black",
        padding: "10px"
    },
    appBar: {
        marginTop: "2px",
        backgroundColor: "white",
        color: "#37474f"
    },
    cardRating: {
        display: 'block',
        width: '70px',
        height: '70px',
        marginBottom: "20px",
        textAlign: 'center',
        backgroundColor: "#212121",
        color: "#efebe9",
        border: "2px solid #66bb6a",
        boxShadow: "none"
        
        
    },
    rating: {
        fontSize: 20,
        
        
        
    },
    ratingLbl: {
        fontSize: 10,
        fontWeight: "bold"
        
        
    },
    cardBio: {
        display: 'block',
        minWidth: 245,
        height: '100px',
        backgroundColor: "#212121",
        color: "#efebe9",
        boxShadow: "none"
    },
    bioLbl: {
        fontSize: 10.5,
        fontWeight: "bold"
    },
    bio: {
        fontSize: 14

    }
  }));



const ProfileLayout = ({ profile }) => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (
        <React.Fragment>
        <Container maxWidth="lg" className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={0}>
                    <Grid item xs={1} / >
                    <Grid item xs={2} className={classes.userContent}> 
                        <Paper elevation={0} className={classes.paperMain}>
                            <Avatar variant="square" className={classes.userAvatar}>
                                Photo
                            </Avatar>
                            <Typography className={classes.paperText} variant="h5">{profile.user.username}</Typography>
                            <Typography className={classes.paperText} variant="body">{profile.title}</Typography>
                        </Paper>
                        
                    </Grid>
                    <Grid item xs={4} className={classes.userContent}>
                            <Card className={classes.cardRating} >
                                <CardContent>
                                    <Typography  className={classes.rating}>
                                        {profile.user.rating}
                                    </Typography>
                                    <Typography  className={classes.ratingLbl}>
                                    Rating
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={classes.cardBio}>
                                <CardContent>
                                    <Typography className={classes.bioLbl}>Bio</Typography>
                                    <Typography className={classes.bio}>{profile.bio}</Typography> 
                                </CardContent> 
                            </Card>
                    </Grid>
                    <Grid itme xs={5} />
                </Grid>
            </Paper>
            <AppBar position="static" className={classes.appBar} >
            <Tabs aria-label="User options" value={value} onChange={handleChange}>
                <Tab label="Posts" />
                <Tab label="Coins" />
                <Tab label="Profile"/>
            </Tabs>
            </AppBar>
            
        </Container>
    </React.Fragment>        
    )
}

ProfileLayout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileLayout
