import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCategoriesById } from 'actions/categories';
import {withRouter } from 'react-router-dom';

//Components
import PostItem from '../posts/PostList/PostItem';
//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
//CSS
const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    content: {
        display: "flex",
        flexGrow: 1,
        width: 800,
        [theme.breakpoints.up('lg')]: {
            width: 700,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    divider: {
        marginBottom: theme.spacing(2)
    }
}));

const Caterogy = ({getCategoriesById, post, categories, match}) => {
    const classes = useStyles();
    useEffect(() => {
        getCategoriesById(match.params.id);
    },[match.params.id, getCategoriesById]);


    return (
        <div className={classes.layout}>
            { categories.category === null ? (
                <div className={classes.loader}>
                      <CircularProgress />
                </div>
            ):(
                <Fragment>
                    <Grid container>
                        <Grid item xs={12}>
                           <Typography
                                variant={"h4"}
                                gutterBottom
                            >
                                {categories.category.name}
                            </Typography> 
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    { post.posts.length > 0 ? (
                        <Fragment>
                            <Grid container spacing={3}>
                                {post.posts.map(p => (
                                    <Grid item key={p._id}>
                                        <PostItem post={p} key={p._id} />
                                        <Divider className={classes.divider} />
                                    </Grid>
                                    
                                ))}
                            </Grid>
                        </Fragment>
                    
                    ):(
                        <Typography
                            variant={"subtitle2"}
                            gutterBottom
                        >
                            There is no articles in this category yet.
                        </Typography>
                    )}

                </Fragment>
            )}
        </div>
    )
}

Caterogy.propTypes = {
    post: PropTypes.object.isRequired,
    getCategoriesById: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => ({
    post: state.post,
    categories: state.categories

});

export default withRouter(connect(mapStateToProps, {getCategoriesById})(Caterogy))
