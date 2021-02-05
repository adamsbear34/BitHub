import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadProfileImage } from 'actions/profile';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Badge from '@material-ui/core/Badge';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';

//CSS
const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
    },
    headerContainer: {
        position: "relative",
        height: "100px",
    },
    info:{
        paddingTop: "75px",
        paddingLeft: "20px"

    },
    spacer: {
        flexGrow: "1",
      },
    actionGroup: {
    
    },
    avatar: {
        border: `3px solid white`,
        width: theme.spacing(15),
        height: theme.spacing(15),
        boxShadow: theme.shadows[3],
        margin: 'auto',
        display: 'block',
    },
    infoIcon:{
        width: 15,
        height: 15
    },
    statsCards: {
        display: "flex",
        flexWrap: "wrap",
    },
    summaryCard: {
        margin: 0,
        marginTop: theme.spacing(1),
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    btn_add_photo: {
        color: theme.palette.primary.light,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    }

  
  }));

 /*
  * Profile stats summury card
  */
export function SummaryCard({ title, value, component }) {
    const classes = useStyles();

    return (
      <Paper elevation={3} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" align={"center"} gutterBottom>
          {title}
        </Typography>
        {component || (
          <Typography color={"secondary"} variant="h3" align={"center"}>
            {value}
          </Typography>
        )}
      </Paper>
    );
  }




const ProfileHead = ({ profile, auth, uploadProfileImage }) => {
    const classes = useStyles();

    /*
    * handleImageUpload
    * Reciving user avatar from input
    * Calling API profile routes
    */
    const handleImageUpload = e => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        var formData = new FormData();
        formData.append('image', e.target.files[0]);
        uploadProfileImage(formData)
    };

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.layout}>
                <main>
                    <div
                        style={{
                        minHeight: "300px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "contrast(75%)",
                        backgroundColor: "#000000"
                        }}
                    >
                        <Grid container 
                            spacing={2} 
                            className={classes.info}
                            >
                            <Grid item>
                                <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    badgeContent={
                                        auth.isAuthenticated && (
                                            !auth.loading && auth.user._id === profile.user._id && (
                                                <Fragment>
                                                    <input 
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => handleImageUpload(e)}
                                                    id="icon-button-file"
                                                    hidden
                                                    />
                                                <label htmlFor="icon-button-file">
                                                    <IconButton
                                                        aria-label="Add Image"
                                                        component={"span"}
                                                    >
                                                        <AddAPhotoIcon className={classes.btn_add_photo} />
                                                    </IconButton> 
                                            </label>
                                            </Fragment>
                                            )
                                        )
                                    }
                                >
                                <Avatar 
                                    alt={profile.user.username}
                                    src={profile.user.avatar}
                                    className={classes.avatar}
                                />    
                                </Badge>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs container spacing={1} directon="row">
                                        <Grid item>
<                                           Typography variant={"h6"}>{profile.user.username.toUpperCase()}</Typography>
                                        </Grid>
                                        <Grid item className={classes.actionGroup}>
                                            { auth.isAuthenticated && (
                                                !auth.loading && profile.user._id === auth.user._id &&(
                                                    <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                    startIcon={<EditIcon />}
                                                    size="small"
                                                    component={Link}
                                                    to={'/edit-profile'}
                                                    >
                                                    Edit
                                                </Button>
                                                )
                                            )}
                                            
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs container spacing={2} directon="row">
                                        <Grid item>
                                            <Typography variant={"subtitle2"}>{profile.title}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <CalendarTodayIcon className={classes.infoIcon} color={"secondary"} />
                                            <Typography variant={"caption"}> Joined {moment(profile.date).fromNow()}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <InsertCommentIcon  className={classes.infoIcon} color={"secondary"}/>
                                        <Typography variant={"subtitle1"}>{profile.bio}</Typography>
                                    </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </div>
                </main>
                 <div className={classes.statsCards}>
                        <SummaryCard title={"Rating"} value={profile.user.rating} />
                        <SummaryCard title={"Posts"}  value={profile.user.posts.length} />
                        <SummaryCard title={"Coins"}  value={profile.coins.length} /> 
                 </div>       
            </div>
              
        </Fragment>
    )
}

ProfileHead.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    uploadProfileImage: PropTypes.func.isRequired,
}



export default connect(null, {uploadProfileImage})(ProfileHead)
