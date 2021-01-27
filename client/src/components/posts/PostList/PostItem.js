import React, { Fragment, useEffect }from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostsImage } from '../../../actions/images';
import parse from 'html-react-parser'
//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.default,
      
    },
    header: {

    },
    media: {
      height: 400,
      width: "100%",
      objectFit: "cover"
       // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
    
    },
    content: {
      fontSize: "large",
      fontWeight: "bold",
      padding: 0
    }
  }));




const PostItem = ({post: {_id, title, excerpt, photo, categories, postedBy, slug }, auth}) => {
    const classes = useStyles();
    
    // let b64 = new Buffer.from(photo.data.data).toString('base64');
    // let mimeType = photo.contentType;


    return (
            <Card className={classes.root} elevation={0}>
                <CardHeader
                    className={classes.header}
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={postedBy.avatar}>
                        
                    </Avatar>
                    }

                    action={
                        auth.isAuthenticated && (
                          !auth.loading && auth.user._id === postedBy._id  && (
                              <IconButton 
                                  aria-label="edit"
                                  component={Link}
                                  to={`/post/edit/${_id}`}
                                  onClick={() => {
                                    console.log(title)
                                    console.log(_id)
                                  }}
                              >
                                <EditIcon/>
                              </IconButton>
                          )   
                        )              
                    }
                    titleTypographyProps={{variant: 'h5'}}
                    title={title}
                    subheader={postedBy.username}
                />
                <CardMedia
                    className={classes.media}
                    image={photo}
                    title="Paella dish"
                    component={Link}
                    to={`/posts/${_id}`}
                />
                <CardContent className={classes.content}>
                      {parse(`${excerpt}`)} 
                </CardContent>
                <CardActions disableSpacing>
                <Button 
                variant="outlined" 
                color="secondary"
                component={Link}
                to={`/posts/${_id}`}>
                    Read More
                </Button>
                </CardActions>
            </Card>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, null)(PostItem)
