import React from 'react';
import PropTypes from 'prop-types'


//Material UI
import { makeStyles} from '@material-ui/core/styles';
import PostCard from '../elements/PostCard';
import { Grid } from '@material-ui/core';

//CSS
const useStyles = makeStyles((theme) => ({

}));

const ProfilePosts = ({ user, posts}) => {
    const classes = useStyles();
  
    return (
        <div className={classes.layout}>
            <Grid container spacing={2}>
                
                    {posts.map((post, idx) => (
                        <Grid item key={idx}>
                            <PostCard key={idx} post={post} user={user} /> 
                        </Grid>
                    ))} 
                </Grid>
        </div>
    )
}

ProfilePosts.propTypes = {
    posts: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
}

export default ProfilePosts
