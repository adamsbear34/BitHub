import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux';
import { updatePost, getPost } from '../../../actions/post';
import { getCategories } from '../../../actions/categories';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
//Components
import EditPostView from './layout/EditPostView';

//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'


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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      modal_paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
   
}));

const EditPostForm = ({updatePost, getPost, getCategories, post: { post, loading, status, uploading}, categories: {categories}, auth, match}) => {
    const classes = useStyles();
    var updatedFormData = null;
    
    useEffect(() => {
        getPost(match.params.id);
        getCategories();
    },[getPost, getCategories]);


    const getFormData = (formData) => {
        updatedFormData = formData;
    };
    


    const onSubmit = (e) => {
        e.preventDefault();
        if (updatedFormData === null){
            return;
        }
        const formData = new FormData();
        if (typeof updatedFormData.image !== 'undefined'){
            formData.append('image', updatedFormData.image);
        }
        formData.append('body', updatedFormData.body);
        formData.append('title', updatedFormData.title);
        formData.append('categories', updatedFormData.categories);
        updatePost(formData, post._id);
    };


    const sendingPostModal = () => {
        return (
            <Fragment>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={true}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={true}>
                    <div className={classes.modal_paper}>
                        <CircularProgress />
                    </div>
                    </Fade>
                </Modal> 
            </Fragment>
        )
    }

    if (status){
        return <Redirect to={`/posts/${post._id}`} />
    }

    return (
        <Fragment>
            {loading || post === null ? (
                <div className={classes.loader}>
                   <CircularProgress /> 
                </div>
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
                        { uploading && (
                            sendingPostModal()
                        )}
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
