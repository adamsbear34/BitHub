import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByID } from '../../actions/profile';

//Components
import DashboardLayout from '../dashboard/profile/DashboardLayout';

//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


//CSS
const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));

const Profile = ({ getProfileByID, profile: {profile, loading}, auth, match }) => {
    const classes = useStyles();

    /**
     * UseEffect
     * Calling API profile routes
     * Reaciving requested profile
     */
    useEffect(() => {
        getProfileByID(match.params.id);
    }, [getProfileByID]);

    return <Fragment>
        { profile === null || loading ? (
            <div className={classes.loader}>
               <CircularProgress />   
            </div> 
           
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
