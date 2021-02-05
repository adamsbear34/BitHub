import React from 'react';
import PropTypes from 'prop-types';


//Components
import ProfileHead from './header/ProfileHead'
import ProfileMenu from '../menu/ProfileMenu';

//Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

//CSS
const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        color: "#efebe9",
    },
  }));

const DashboardLayout = ({ profile, auth }) => {
    const classes = useStyles();

   
     return (
    <React.Fragment>
        <Container maxWidth="lg" className={classes.root}>
            <ProfileHead profile={profile} auth={auth} />
            <ProfileMenu profile={profile} auth={auth} />
        </Container>
    </React.Fragment>
    )
}






DashboardLayout.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

export default DashboardLayout
