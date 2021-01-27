import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';
import ProfileLayout from './ProfileLayout';
import DashboardLayout from '../dashboard/profile/DashboardLayout';
//Material Ui

import CircularProgress from '@material-ui/core/CircularProgress';

const Profile = ({ getProfileByID, profile: {profile, loading}, auth, match }) => {
    useEffect(() => {
        getProfileByID(match.params.id);
    }, [getProfileByID]);

    return <Fragment>
        { profile === null || loading ? ( 
            <CircularProgress /> 
        ) : ( 
            <Fragment>
                <DashboardLayout profile={profile} auth={auth} />
            </Fragment>
        )}
    </Fragment>
}

Profile.propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth

});

export default connect(mapStateToProps, { getProfileByID })(Profile)
