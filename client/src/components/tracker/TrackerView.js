import React , {Fragment, useEffect}from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins } from 'actions/coins';

//Components
import CoinTable from './CoinTable';

//Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
//CSS
const useStyles = makeStyles((theme) => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));


const TrackerView = ({getCoins, coins: { coins }, loading}) => {
    const classes = useStyles();

    /**
     * UseEffect
     * Calling API coin routes
     * Reciving all market data
     */
    useEffect(() => {
        getCoins();
    },[getCoins]);

    return <Fragment>
    { coins === null || loading ? (
        <div className={classes.loader}><CircularProgress /></div>
            
    ) : (
        <Fragment>
           <CoinTable coins={coins} />
        </Fragment>
    )}

        </Fragment> 
}

TrackerView.propTypes = {
    coins: PropTypes.object.isRequired,
    getCoins: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    coins: state.coins
});

export default connect(mapStateToProps, {getCoins})(TrackerView)
