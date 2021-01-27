import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserStats } from '../../../../actions/profile';

//Components
import StatsLyaout from '../elements/StatsLyaout';


//Material UI
import { makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//CSS
const useStyles = makeStyles((theme) => ({
  
    
}));

const ProfileStats = ({ getUserStats, auth, profile: { stats, loading} }) => {
    
    const classes = useStyles();

    useEffect(() => {
        getUserStats(auth.user._id);
    }, [getUserStats]);

    

    return (
        <div className={classes.layout}>
            {stats === null ?(
                <div className={classes.loading}>
                    <CircularProgress /> 
                </div>
            ):(
                <Fragment>
                    <Grid container>
                        <Grid item xs={12}>
                            <StatsLyaout data={stats.data} />
                        </Grid>
                    </Grid>
                </Fragment>
            )}
        </div>
    )
}

ProfileStats.propTypes = {
    getUserStats: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});



export default connect(mapStateToProps, {getUserStats})(ProfileStats)
