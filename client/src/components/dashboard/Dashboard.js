import React, { useEffect, Fragment }from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardLayout from './profile/DashboardLayout';
import { Redirect } from 'react-router-dom';


//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateProfile from '../profile-forms/CreateProfile';
import { makeStyles } from '@material-ui/core/styles';

//CSS
const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));


const Dashboard = ({ getCurrentProfile, auth, profile: {profile, loading} }) => {
    const classes = useStyles();
    useEffect(() => {
        getCurrentProfile();
    },[getCurrentProfile]);


    
    return(
        <Fragment>
        {loading && profile === null ?(
            <div className={classes.loader}>
                <CircularProgress />
            </div>
        ):(
            <Fragment>
                { !auth.isNew ?(
                    <Fragment>
                       <DashboardLayout  profile={profile} auth={auth}/>  
                    </Fragment>
                ) : (
                    <Fragment> 
                        <Redirect from='/dashboard' to='/create-profile' />
                    </Fragment>
                )}
            </Fragment>
        )}
    </Fragment>
    )
 
};




Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile })(Dashboard)
