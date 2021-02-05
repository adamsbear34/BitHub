import React, { Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from 'actions/post';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, TextField } from '@material-ui/core';

//CSS
const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        float: "left"
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      btn_submit: {
          height: "100%",
          borderColor: theme.palette.success.main,
          color: theme.palette.success.main,
         
      
      }

}));

const CreateDiscussion = ({ postId, addComment, auth}) => {
    const classes = useStyles();

    //Comment text state
    const [text, setText ] = useState('');
    
    return (
        <Fragment>
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={e => {
                        e.preventDefault();
                        addComment( postId, { text });
                        setText('');
                    }}>
                        <Grid container spacing={2}>
                            <Grid item md={11} xs={12}>
                                <TextField
                                    name="comment_text"
                                    variant="outlined"
                                    fullWidth
                                    value={text}
                                    onChange={ e => setText(e.target.value)}
                                    id="comment_text"
                                    autoFocus
                                />   
                            </Grid>
                            <Grid item md={1} xs={12}>
                                <Button
                                    type="submit"
                                    disabled={!auth.isAuthenticated}
                                    variant="outlined"
                                    className={classes.btn_submit}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
        </Fragment>
    )
}

CreateDiscussion.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});



export default connect(mapStateToProps, {addComment})(CreateDiscussion)
