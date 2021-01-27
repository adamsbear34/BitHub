import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deletePost } from 'actions/post';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



//CSS
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginTop: theme.spacing(1)
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: red[500],
    },
    btn_delete: {
      color: theme.palette.error.light,
      "&:hover": {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.text.primary
      }
    },
    btn_edit: {
      color: theme.palette.warning.light,
      "&:hover": {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.text.primary
    }
      
    }
  }));


const PostCard = ({ deletePost, post, user, auth}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar 
                      aria-label="recipe" 
                      className={classes.avatar}
                      src={user.avatar}
                      >
                        
                    </Avatar>
                    }
                    title={post.title}
                    subheader={user.username}
                />
                <CardMedia
                    className={classes.media}
                    image={post.photo}
                    title="Paella dish"
                />
                <CardContent className={classes.content}>
                        {parse(`${post.excerpt}`)}
                </CardContent>
                <CardActions disableSpacing>
                  { auth.isAuthenticated && (
                      !auth.loading && auth.user._id === user._id && (
                          <Grid container spacing={1}>
                              <Grid item>
                                    <IconButton
                                      aria-label="edit"
                                      component={Link}
                                      to={`/post/edit/${post._id}`}
                                      className={classes.btn_edit}
                                    >
                                        <EditIcon  />
                                    </IconButton>
                              </Grid>
                              <Grid item>
                                  <IconButton
                                      aria-label="delete"
                                      className={classes.btn_delete}
                                      onClick={ (e) => { deletePost(post._id)}}
                                    >
                                        <DeleteIcon  />
                                  </IconButton>
                              </Grid>
                          </Grid>

                      )
                  )}
                </CardActions>
            </Card>
    )
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps, { deletePost })(PostCard)
