import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux';
import { updatePost, getPost } from '../../../actions/post';
import { getCategories } from '../../../actions/categories';
import PropTypes from 'prop-types';

//Components
import EditPostView from './layout/EditPostView';

//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//CSS
const useStyles = makeStyles((theme) => ({

    btn_layout:{
      width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    submit: {
        marginBottom: theme.spacing(3),
    }
  }));

const EditPostForm = ({updatePost, getPost, getCategories, post: { post, loading}, categories: {categories}, auth, match}) => {
    const classes = useStyles();
    var updatedFormData = null;
    useEffect(() => {
        getPost(match.params.id);
        getCategories();
    },[getPost, getCategories]);

    const getFormData = (formData) => {
        updatedFormData = formData;
        console.log(updatedFormData);
    };
    


    const onSubmit = (e) => {
        e.preventDefault();
        if (updatedFormData === null){
            console.log("somthing went wrong");
            return;
        }
        console.log(updatedFormData);
        const formData = new FormData();
        formData.append('image', updatedFormData.image);
        formData.append('body', updatedFormData.body);
        formData.append('title', updatedFormData.title);
        formData.append('categories', updatedFormData.categories);
        updatePost(formData);
    };



    return (
        <Fragment>
            {loading || post === null ? (
                <CircularProgress />
            ):(
                <Fragment>
                    {!auth.loading && post.postedBy._id === auth.user._id ? (
                        <Fragment>
                        <form className={classes.form} onSubmit={(e => onSubmit(e))}>
                            <EditPostView post={post} categories={categories} sentFormData={getFormData} />
                            <div className={classes.btn_layout}>
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                Publish
                            </Button>
                            </div>
                       
                        </form>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography variant={"h3"}>
                                You are not authorzed to edit this post
                            </Typography>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
            
    )
}

EditPostForm.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    categories: state.categories
});

export default connect(mapStateToProps, {updatePost, getPost, getCategories})(EditPostForm)
