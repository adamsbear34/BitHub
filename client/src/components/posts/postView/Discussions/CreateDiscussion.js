import React, { Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from 'actions/post';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Container, Grid, TextField } from '@material-ui/core';

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
          height: "100%"
      }

}));


const CreateDiscussion = ({ postId, addComment, auth}) => {
    const classes = useStyles();

    const [text, setText ] = useState('');
    console.log(text);
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
                            <Grid item md={8} xs={12}>
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
                            <Grid item md={4} xs={12}>
                                <Button
                                    type="submit"
                                    disabled={!auth.isAuthenticated}
                                    variant="outlined"
                                    color="secondary"
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
