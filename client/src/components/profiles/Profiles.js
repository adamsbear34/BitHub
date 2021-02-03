import React, { Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem'
//Materiaul Ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profiles = ({ getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, []);

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
