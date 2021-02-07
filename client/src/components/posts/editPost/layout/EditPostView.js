import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

//Components
import PostHead from '../../components/PostHead';
import PostCategories from '../../components/PostCategories';
import TextEditor from '../../components/TextEditor';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from '@material-ui/core/TextField';

//CSS
const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    editorContainer:{
        minHeight: "400px",
        marginBottom: theme.spacing(8)
    }

}));


const EditPostView = ({post, categories, sentFormData}) => {
    const classes = useStyles();

    var postCategories = [];
    var postImage = null;
    post.categories.map(c => {
        postCategories.push(c._id);
    });
    //Post title 
    const [updatedTitle, setTitle] = useState(post.title);
    const [image, setImage] = useState();

    var formData = {
        title: updatedTitle,
        body: post.body,
        categories: postCategories,
        image: image
    };

    /**
     * UseEffect
     * Setting title stae
     */
    useEffect(() => {
        setTitle(post.title);
    },[post.title]);

    /**
     * 
     * @param {*} e
     * Setting title state from the input 
     */
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };


    
    /**
     * 
     * @param {*} data 
     * Bulding form data object 
     * Sending data to the parent component
     */
    const hadleUpdatedData = (data) => {
        if (data.image){
            setImage(data.image);
        }
        if (data.body && data.body !== "") {
            formData.body = data.body;
        }
        if (data.categories && data.categories.length > 0){
            formData.categories = data.categories;
        }
       
        if (postImage !== null){
            formData.image = postImage;
        }
    
        sentFormData(formData);
    };
    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.layout}>
                <Grid container>
                    <Grid item xs={12}>
                        <PostHead current_image={post.photo} getUpdatedData={hadleUpdatedData} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                    <TextField
                        name="title"
                        value={updatedTitle}
                        onChange={handleTitle}
                        variant="outlined"
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                    />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <PostCategories categories={categories} current_categories={post.categories}  getUpdatedData={hadleUpdatedData} />
                    </Grid>
                </Grid>
                <Grid container className={classes.editorContainer}>
                    <Grid item xs={12}>
                        <TextEditor currentBody={post.body} getUpdatedData={hadleUpdatedData} />
                    </Grid>
                </Grid>

            </div>
        </Fragment>
       
    )
}

EditPostView.propTypes = {
    post: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    sentFormData: PropTypes.func.isRequired
}

export default EditPostView
