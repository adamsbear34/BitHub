import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      position: 'fixed',
      top: 0
      
      
    },
  }));

const AlertComponent = ({ alerts }) => {
    const classes = useStyles();

    return (
        <Fragment>
          {alerts != null && alerts.length > 0 && alerts.map(alert => (
             <div key={alert.id} className={classes.root}>
                  <Alert className={classes.alert} severity={alert.alertType}>{alert.msg}</Alert>
             </div>
          )) }
        </Fragment>

    )
} 

AlertComponent.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(AlertComponent);
