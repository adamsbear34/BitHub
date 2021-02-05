import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

//Component
import ProfileItem from './ProfileItem'

//Materiaul Ui
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profiles = ({ getProfiles, profile: {profiles, loading}}) => {
   
    /**
     * UseEffect
     * Calling API profile routes
     * Reciving all profiels
     */
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
          { loading ? <CircularProgress  color="secondary" /> : 
          <Fragment>
              <Container maxWidth="md">
                  <Grid container spacing={2}>
                        {profiles.length > 0 ? (
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ) )
                        ) : <h1>No thing was found</h1>}

                  </Grid>
              </Container>
         </Fragment>}  
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
