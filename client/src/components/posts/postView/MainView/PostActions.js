import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateVote } from 'actions/post';

//Matrual Ui
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Button, Container, Grid, ButtonGroup, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        '& > *': {
            margin: theme.spacing(1),
        },
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    btn_up: {
       
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'none',
            borderColor: theme.palette.success.light,
        }
    },
    btn_down: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'none',
            borderColor: theme.palette.error.light,

        }
    },
    btn_voteCount: {
        fontSize: "17px",
        fontWeight: "bold",
        
    },
    arrowUp: {
        color: theme.palette.success.light
    },
    arrowDown: {
        color: theme.palette.error.light
    }

}));


const PostActions = ({ updateVote, post}) => {
    const classes = useStyles();

    const {_id, voteCount}= post;

    //const [voteType, setVoteType] = useState('')
    var voteType = ''
    const vote = ( type, postId) => {
        voteType = type;
        console.log(voteType);
        console.log(postId);
        //Make request
        updateVote(postId, { voteType });
    };
    
    return ( 
        <Fragment>
            <CssBaseline />
            <div className={classes.paper}>
                <ButtonGroup  aria-label="outlined button group">
                        <Button
                            name="up"
                            variant="outlined"
                            color="success"
                            onClick={ e => {
                                vote("up", _id)
                            }}
                            className={classes.btn_up}
                        >
                            <ArrowUpwardIcon  className={classes.arrowUp}/>
                        </Button>
                        <Button 
                        disabled={true}
                        className={classes.btn_voteCount}
                        >{voteCount}</Button>
                        <Button
                            name="down"
                            variant="outlined"
                            onClick={ e => {
                                vote("down", _id)
                            }}
                            className={classes.btn_down}
                            
                        >
                            <ArrowDownwardIcon className={classes.arrowDown} />
                        </Button>
                </ButtonGroup>      
            </div>
        </Fragment>     
    )
}

PostActions.propTypes = {
    updateVote: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

export default connect(null, {updateVote})(PostActions)
