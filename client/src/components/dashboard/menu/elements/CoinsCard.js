import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteUserCoin } from 'actions/profile';



//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

//CSS
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        padding: 0,
      },
    content: {
      width: "100%",
      margin: 0
    },
    cover: {
        height: 30,
        width: 30
    },
    btn_delete: {
        color: theme.palette.error.light,
        "&:hover": {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.text.primary
        }
    }
  }));

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const CoinsCard = ({ coin, auth, userId, deleteUserCoin }) => {
    const classes = useStyles();

    return (
       <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Grid container 
                    xs 
                    item
                    spacing={1}
                    alignItems="center"
                    >
                        <Grid item xs={2} sm={2} md={1}>
                            <Avatar 
                                className={classes.cover}
                                src={coin.image}
                            />
                        </Grid>
                        <Grid item xs={4} sm={3} md={4}>
                                <Typography  variant={"h6"}>
                                {coin.name}
                                </Typography>  
                        </Grid>
                        <Grid item xs={8} sm={2} md={3}>
                                <Typography  variant={"h6"}
                                style={{color: (coin.price_change_percentage_24h > 0) ? 'green' : 'red'}}
                                >
                                {Math.floor(coin.price_change_percentage_24h * 100)/100}%
                            </Typography> 
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}> 
                                <Typography variant={"h6"}>
                                    {formatter.format(coin.current_price)}
                                </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                            { auth.isAuthenticated &&(
                                !auth.loading && userId === auth.user._id && (
                                    < IconButton
                                        aria-label="delete"
                                        className={classes.btn_delete}
                                        onClick={e => {
                                        deleteUserCoin(coin.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
           
       </Card>
    )
}

CoinsCard.propTypes = {
    coin: PropTypes.object.isRequired,
    auth: PropTypes.object,
    userId: PropTypes.string.isRequired,
    deleteUserCoin: PropTypes.func.isRequired,
}

export default  connect(null, {deleteUserCoin})(CoinsCard)
