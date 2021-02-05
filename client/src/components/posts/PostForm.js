import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { getCategories } from '../../actions/categories';
import { Redirect } from 'react-router-dom';
//Need action for categories
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//Material Ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'

//Styles

const theme = createMuiTheme({
    palette: {
       primary: {
          main: "#212121" // This is an orange looking color
                 },
       secondary: {
          main: "#7200ca" //Another orange-ish color
                  }
             },
    //fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
 });

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
  }));


const PostForm = ({ addPost, getCategories, categories: {categories, loading}, post: {status, uploading}, history }) => {
    const classes = useStyles();

    //Post field staes
    const [values, setFormData] = useState({
       title: '',
       formData: ''
    });
    //Post body state
    const [body, setBody] = useState({});

    const {
        title,
        formData
    } = values;

    //Categories state
    const [checked, setChecked] = useState([]);
    
    /*
    * UseEffect
    * Calling API post routes
    * Sending post data
    */
    useEffect(() => {
        setFormData({...values, formData: new FormData()});
        initCategoties();
    }, []);

    /*
    * initCategories
    * Calling API to get all categories
    */
    const initCategoties = () => {
        getCategories();   
    }

  
    /*
    * OnChange
    * Setting form data sate
    */
    const onChange = name => e => {
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setFormData({...values, [name]: value, formData});
       
    };
    
    /*
    * handleBody
    * Setting post body state
    */
    const handleBody = (e) => {
        setBody(e);
        formData.set('body', e);
    }

    /*
    * handleCheck
    * Setting categories state
    */
    const handleCheck = (c) => () =>  {
        const checkCategory = checked.indexOf(c);
        const all = [...checked];
        if (checkCategory == -1){
            all.push(c);
        }else {
            all.splice(checkCategory, 1);
        }
        setChecked(all)
        formData.set('categories', all);
    }

    /*
    * onSubmit   
    * Calling API post route
    * Creating new post
    */
    const onSubmit = (e) => {
        e.preventDefault();
        addPost(formData, history)
    }

//Layout
  const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ],
      }

   const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 
      ] 
    
    //Redirecting user if post created
    if (status){
        return <Redirect to="/" />
    }


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

    const showCategories = () => {
        return (
            categories.map((c, i) => (
                <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    name={c.slug}
                    color="primary"
                    key={i}
                    value={c._id}
                    onChange={handleCheck(c._id)}
                  />
                }
                label={c.name}
              />
            ))
        )
    };
    const createBlogForm = () => {
        return(
        <ThemeProvider theme={theme}>
               <Container component="main" maxWidth="md">
                    <CssBaseline />
                        <div className={classes.paper}>
                            <form className={classes.form} onSubmit={(e => onSubmit(e))}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    component="label"
                                    >
                                    Upload image
                                    <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={onChange('image')}
                                    hidden
                                    /> 
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    name="title"
                                    value={title}
                                    onChange={onChange('title')}
                                    variant="outlined"
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                   {showCategories()}
                                </Grid>
                                <Grid item xs={12}>
                                    <ReactQuill 
                                    value={body} 
                                    placeholder="Type somthing" 
                                    onChange={handleBody} 
                                    modules={modules}
                                    formats={formats}
                                    />
                                </Grid>   

                                </Grid>
                                <Button
                                    type="submit"
                                // component={Link}
                                //  to={'/dashboard'}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    >
                                    Publish
                                </Button>
                            </form>
                    </div> 
            </Container>
  </ThemeProvider>
        )
    }

    


    return (
       <Fragment>
           {createBlogForm()}
           { uploading && (
               sendingPostModal()
           )}
       </Fragment>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories,
    post: state.post
})

export default connect(mapStateToProps, { addPost, getCategories })(PostForm);
