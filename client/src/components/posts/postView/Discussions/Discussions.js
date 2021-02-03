import React, { Fragment } from 'react'
import PropTypes from 'prop-types'


//Components
import Discussion from './Discussion';
import CreateDiscussion from './CreateDiscussion'

//Matrial UI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider"; 
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
      mainGrid: {
        marginTop: theme.spacing(3)
      },
    
}));


const Discussions = ({post}) => {
    const classes = useStyles();
    const { _id, coments} = post;

     const commentBox = () => {
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth={'md'}>
                    <main>
                        <Grid container  className={classes.mainGrid}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Add Comment 
                                </Typography>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <CreateDiscussion  postId={_id}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Discussion comments={coments} postId={_id} /> 
                            </Grid>

                        </Grid>
                    </main>
                </Container>
            </Fragment>
        )
    }


    return (
        <Fragment>
            { coments.length > 0 ? (
                commentBox()
            ) : (
                <Fragment>
                    <Container maxWidth={"md"}>
                        <Grid container  className={classes.mainGrid}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom >
                                    Add Comment  
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <CreateDiscussion  postId={_id}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Fragment>
        )}
        </Fragment>
    )
}



Discussions.propTypes = {
    post: PropTypes.object.isRequired,
}



export default Discussions
