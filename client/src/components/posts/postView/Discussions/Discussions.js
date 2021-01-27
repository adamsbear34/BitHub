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


const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
      },
      mainGrid: {
        marginTop: theme.spacing.unit * 3
      },
    
}));


const Discussions = ({post}) => {
    const classes = useStyles();
    const { _id, coments} = post;

     const commentBox = () => {
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.layout}>
                    <main>
                        <Grid container  className={classes.mainGrid}>
                            <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                Add Comment 
                            </Typography>
                            <Divider variant="middle" className={classes.divider} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={12}>
                                <CreateDiscussion  postId={_id}/>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={12}>
                                <Discussion comments={coments} postId={_id} /> 
                            </Grid>

                        </Grid>
                    </main>
                </div>
            </Fragment>
        )
    }


    return (
        <Fragment>
            { coments.length > 0 ? (
                commentBox()
            ) : (
                <Fragment>
                    <div className={classes.layout}>
                        <Grid container  className={classes.mainGrid}>
                            <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom >
                                Add Comment  
                            </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid container>
                                <Grid item md={12}>
                                    <CreateDiscussion  postId={_id}/>
                                </Grid>
                        </Grid>
                        </Grid>
                    </div>
                </Fragment>
        )}
        </Fragment>
    )
}



Discussions.propTypes = {
    post: PropTypes.object.isRequired,
}



export default Discussions
