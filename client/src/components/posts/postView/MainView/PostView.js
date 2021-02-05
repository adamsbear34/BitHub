import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost} from 'actions/post';

//Components
import PostContent from '../Content/PostContent';
import Discussions from '../Discussions/Discussions';
import PostActions from './PostActions';
//Material Ui 
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';



const PostView = ({ getPost, post: {post, loading }, match}) => {
    
    /**
     * UseEffect
     * Calling API post route
     * Reciving requested post
     */
    useEffect(() => {
        getPost(match.params.id);
    },[getPost]);
   
    
    return <Fragment>
    { post === null || loading ? ( 
        <CircularProgress /> 
    ) : ( 
        <Fragment>
            
            <Grid container>
                <Grid item xs={12}>
                    <PostContent post={post} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <PostActions post={post} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Discussions post={post} />
                </Grid>
            </Grid>
            
        </Fragment>
    )}
    </Fragment>
}

PostView.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(PostView)
