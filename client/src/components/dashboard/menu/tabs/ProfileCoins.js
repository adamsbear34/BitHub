import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { getUserCoins } from '../../../../actions/profile';
import PropTypes from 'prop-types';

import CoinsCard from '../elements/CoinsCard'

import { makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    item_layout: {
        margin: 0,
        padding: 0,
    },
    coin_card: {
    
    }
}));




const ProfileCoins = ({getUserCoins, user_crypto, user, auth, loading, coins }) => {
    const classes = useStyles();
    useEffect(() => {

        if (coins.length > 0){
            getUserCoins(user._id);
        }else{
            return;
        }
    },[getUserCoins]);
    return (
        <div className={classes.layout}>
            { user_crypto === null || loading? (
                <div className={classes.loading}>
                    <CircularProgress /> 
                </div>
            ): (
                <Fragment>
                        <Grid container item xs={12} spacing={1} className={classes.item_layout} direction="column">
                            {user_crypto.map((coin, idx) => (
                                <Grid item key={idx}  className={classes.coin_card}>
                                    <CoinsCard key={idx} coin={coin} auth={auth} userId={user._id} /> 
                                </Grid>
                            ))} 
                        </Grid>
                    
                </Fragment>
            )}
        </div>
    )
}

ProfileCoins.propTypes = {
    getUserCoins: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user_crypto: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    coins: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    user_crypto: state.profile.user_crypto,
    loading: state.profile.loading
    
});

export default connect(mapStateToProps, { getUserCoins })(ProfileCoins)
