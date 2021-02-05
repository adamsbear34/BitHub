import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../../../actions/post';

//Components
import PostItem from '../../../posts/PostList/PostItem';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
//CSS
const useStyles = makeStyles((theme) => ({

  }));

const MainPosts = ({getPosts, post: {posts} }) => {
    const classes = useStyles();

    /*
    * Use Effect
    * Calling API post routes
    * Reciving all posts
    */
    useEffect(() => {
        getPosts();
    },[getPosts]);
    
    const showPost = () => {
        return (
            posts.map((p, i) => (
                <Grid key={i} item>
                    <PostItem post={p} key={i}/>
                </Grid>
            ))
        )
    }
    return (
        <Fragment>
            {showPost()}
        </Fragment>
    )
}

MainPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(MainPosts)
