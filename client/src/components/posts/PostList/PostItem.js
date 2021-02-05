import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import parse from 'html-react-parser'


//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


//CSS
const useStyles = makeStyles((theme) => ({
    root: {
      width: "80%",
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('xs')]: {
        width: "100%"
      }
    },
    header: {
      
    },
    media: {
      height: 300,
      width: "100%",
      objectFit: "contain"
       // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    title:{
      wordBreak: "break-word"
    },
    content: {
      fontSize: 15,
      padding: 0
    },
    profile_link: {
      textDecoration: 'none',
      color: theme.palette.primary.light
    },
    post_action: {
      paddingLeft: 0
    }
  }));


const PostItem = ({post: {_id, title, excerpt, photo, categories, postedBy, slug }, auth}) => {
    const classes = useStyles();
    
    return (
            <Card className={classes.root} elevation={0}>
                <CardHeader
                    className={classes.header}
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={postedBy.avatar}>
                        
                    </Avatar>
                    }

                    
                    
                    title={
                      <Typography variant={"h5"} className={classes.title}>
                        {title}
                      </Typography>
                    }
                    subheader={
                      <Link className={classes.profile_link} to={`/profile/${postedBy._id}`}>{postedBy.username}</Link>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={photo}
                    title="Paella dish"
                    component={Link}
                    to={`/posts/${_id}`}
                />
                <CardContent className={classes.content}>
                      {parse(`${excerpt}`)} 
                </CardContent>
                <CardActions  className={classes.post_action} disableSpacing>
                <Button 
                variant="outlined"
                className={classes.btn_read}
                size={'small'} 
                color="secondary"
                component={Link}
                to={`/posts/${_id}`}>
                    Read More
                </Button>
                </CardActions>
                <Divider />
            </Card>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, null)(PostItem)
