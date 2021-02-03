import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteComment } from 'actions/post';
import {Link} from 'react-router-dom';



//Material UI
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import { Grid, ListItemSecondaryAction } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    fonts: {
      fontWeight: "bold",
      textDecoration: 'none',
      color: theme.palette.primary.dark
    },
    inline: {
      display: "inline",
      color: theme.palette.grey
    }
  }));

const Discussion = ({comments, auth, deleteComment, postId}) => {
    const classes = useStyles();

    return (
       
            <List className={classes.root}>
            {comments.map(comment => {
                console.log("Comment", comment);
                return (
                <React.Fragment key={comment._id}>
                    <ListItem key={comment._id} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="avatar" src={comment.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                        <Typography 
                            className={classes.fonts} 
                            variant={"subtitle2"}
                            component={Link}
                            to={`/profile/${comment.user}`}
                            >
                           @{comment.author}
                        </Typography>
                        }
                        secondary={
                        <>
                            <Typography
                            component="span"
                            variant="caption"
                            className={classes.inline}
                            >
                            {moment(comment.date).fromNow()}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body2"
                                display="block"
                                color="textPrimary"
                            >
                                {` - ${comment.text}`}
                            </Typography>
                            
                        </>
                        }
                    />
                    <ListItemSecondaryAction>
                    { auth.isAuthenticated &&(
                        !auth.loading && comment.user === auth.user._id && (
                            <IconButton edge="end" aria-label="delete"
                                onClick={e => deleteComment(postId, comment._id)}
                                                    >
                                <DeleteIcon />
                            </IconButton>
                        )
                    )}     
                    </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </React.Fragment>
                );
            })}
            </List>
        
    )
}

Discussion.propTypes = {
    comments: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {deleteComment})(Discussion)
