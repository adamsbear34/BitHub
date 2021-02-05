import React from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import moment from 'moment';
import {Link} from 'react-router-dom';

//Material Ui 
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
      },
      post_head: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
      },
      banner: {
        marginTop: theme.spacing(3),
      },
      banner_image: {
          width: "100%",
          height: "100%"
      },
      date: {
        color: theme.palette.grey[800],
      },
      avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        border: `2px solid ${theme.palette.secondary.main}`
      },
      user_link: {
        textDecoration: 'none',
        color: theme.palette.primary.light
      }
  }));


const PostContent = (post) => {
    const classes = useStyles();
    const post_content = post.post;

    const {title, body, postedBy, photo, date } = post_content;


    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={'md'}>
        <main>
          {/* Main featured post */}
          <div className={classes.post_head}>
            <Grid container>
                  <Grid item md={12}>
                      <Typography variant={"h3"} align="center" className={classes.post_title}>{title}</Typography>
                  </Grid>
                  <Grid container item md={12} spacing={1}>
                      <Grid item>
                        <Avatar alt={postedBy.username}  src={postedBy.avatar} className={classes.avatar}/>
                      </Grid>
                      <Grid item>
                           <Typography 
                              variant={"overline"}
                              component={Link}
                              to={`/profile/${postedBy._id}`}
                              className={classes.user_link} 
                              gutterBottom>
                                @{postedBy.username} 
                            </Typography>
                      </Grid>
                  </Grid>
                <div className={classes.banner}>
                   <Grid item xs={12}>
                          <img className={classes.banner_image} src={photo} alt={"Post Image"}/>
                  </Grid>
                </div>  
                 
            </Grid>
          </div>
         
          <Grid container spacing={4} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Typography variant={"overline"} gutterBottom>
                {moment(date).format('MM/DD/YYYY')} 
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
                <Grid item md={12}>
                    <div className={classes.post_text}>
                        {parse(`${body}`)}
                    </div>
                </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
        
    )
}

PostContent.propTypes = {
   post: PropTypes.object.isRequired,
}

export default PostContent
