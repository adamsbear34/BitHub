import React , {Fragment, useEffect}from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins } from 'actions/coins';

//Components
import CoinTable from './CoinTable';

//Material UI
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const TrackerView = ({getCoins, coins: { coins }, loading}) => {
    useEffect(() => {
        getCoins();
    },[getCoins]);

    return <Fragment>
    { coins === null || loading ? (
            <CircularProgress />
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
