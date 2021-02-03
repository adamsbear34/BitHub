import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {searchPostByTitle} from 'actions/post';
import { useLocation } from 'react-router-dom';

//Components
import PostItem from '../posts/PostList/PostItem';
//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
//CSS
const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head_grid: {
        marginTop: theme.spacing(3)
    }
}));

const SearchResult = ({searchPostByTitle, loaction, post: {posts, loading}}) => {
    const classes = useStyles();
    const { search }  = useLocation();
    const params = new URLSearchParams(search);
    const query = params.get('q');
    useEffect(() => {
        searchPostByTitle(query);
    },[query]);

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            { loading ? (
                <div className={classes.loader}>
                    <CircularProgress />
                </div>   
            ):(
                <Fragment>
                    <Grid container className={classes.head_grid}>
                        <Grid item xs={12}>
                           <Typography
                                variant={"h4"}
                                gutterBottom
                            >
                                {query}
                            </Typography> 
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    { posts.length > 0 ? (
                        <Grid container spacing={3}>
                            {posts.map(post => (
                                <Grid item key={post._id}>
                                    <PostItem post={post} key={post._id} />
                                    <Divider className={classes.divider} />
                                </Grid>
                            ))}
                            </Grid> 
                    ): (
                        <Typography
                            variant={"subtitle2"}
                            gutterBottom
                        >
                            Nothing was found. Try again
                        </Typography>                        
                    )}
                                     
                </Fragment>
            )}
        </Container>
    )
}

SearchResult.propTypes = {
    searchPostByTitle: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { searchPostByTitle })(SearchResult)
