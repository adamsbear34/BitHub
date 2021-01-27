import React from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'


//Material Ui 
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
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
      mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4
      },
      mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up("md")]: {
          paddingRight: 0
        }
      },
      mainGrid: {
        marginTop: theme.spacing.unit * 3
      },
      banner_image: {
          width: "100%",
          height: "100%"
      }
  }));


const PostContent = (post) => {
    const classes = useStyles();
    const post_content = post.post;

    const {title, body, postedBy, photo } = post_content;
    return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <main>
          {/* Main featured post */}
          <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4" align="center" className={classes.post_title}>{title}</Typography>
                </Grid>
          </Grid>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={12}>
                  <img className={classes.banner_image} src={photo}/>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          <Grid container spacing={40} className={classes.mainGrid}>
            {/* Main content */}
            <Grid item xs={12} md={8}>
              <Typography variant="title" gutterBottom>
               @ {postedBy.username} 
              </Typography>
              <Divider />
            
            </Grid>
            {/* End main content */}
          </Grid>

          <Grid container>
                <Grid item md={12}>
                    <div className={classes.post_text}>
                        {parse(`${body}`)}
                    </div>
                </Grid>
          </Grid>
        </main>
      </div>
    </React.Fragment>
        
    )
}

PostContent.propTypes = {
   post: PropTypes.object.isRequired,
}

export default PostContent
