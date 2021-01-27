import React, { useEffect, Fragment }from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardLayout from './profile/DashboardLayout';



//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateProfile from '../profile-forms/CreateProfile';
import { Redirect } from 'react-router-dom';


const Dashboard = ({ getCurrentProfile, auth, profile: {profile, loading} }) => {
    useEffect(() => {
        getCurrentProfile();
    },[getCurrentProfile]);


    
    return(
        <Fragment>
        {loading && profile === null ?(
            <CircularProgress />
        ):(
            <Fragment>
                { profile !== null ?(
                    <Fragment>
                       <DashboardLayout  profile={profile} auth={auth}/>  
                    </Fragment>
                ) : (
                    <Fragment> 
                        <Redirect from='/dashboard' to='/create-profile' />
                    </Fragment>
                )};
            </Fragment>
        )};
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
