import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../../actions/post';
import PostItem from './PostItem';



//Material UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//CSS
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '20px'
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));




const  Posts = ({ getPosts, post: { posts, loading }}) => {
    const classes = useStyles();
    useEffect(() => {
        getPosts();
    }, [getPosts]);

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
           <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' spacing={3}>
                        {showPost()}
                    </Grid>
                </Grid>
           </Grid>
       </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});


export default connect(mapStateToProps, { getPosts })(Posts)

