import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCoin } from 'actions/profile';



//Materiau UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import StarsIcon from '@material-ui/icons/Stars';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';


const styles = (theme) => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3)* 2)]: {
          width: 1100,
          marginLeft: "auto",
          marginRight: "auto"
        }
      },
      coin_img: {
          width: 17,
          height: 17,
      },
      coin_name: {
        fontWeight: "bold"
    }

});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 15,
        fontWeight: "bold"
    } ,
    body: {
        fontSize: 14,
    }
}))(TableCell); 

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

class CoinTable extends Component {
    constructor(props){
        super(props);
    }
    
    addCoin(coin, idx){
        const formData = {
            coinId: coin.id,
            symbol: coin.symbol,
            name:  coin.name
        }
        console.log(formData);
        this.props.addCoin(formData);
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
<CssBaseline />
            <div className={classes.layout}>
                <Table className={classes.table} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Coin</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>24h</StyledTableCell>
                            <StyledTableCell>24h Volume</StyledTableCell>
                            <StyledTableCell>Market Cap</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.coins.map((coin, idx) => (
                            <TableRow 
                            key={coin.id}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {idx + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <img src={coin.image} className={classes.coin_img} alt={"cryptocurrency"}/>
                                </StyledTableCell>
                                <StyledTableCell className={classes.coin_name}>
                                    {coin.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatter.format(coin.current_price)}
                                </StyledTableCell>
                                <StyledTableCell style={{color: (coin.price_change_percentage_24h > 0) ? 'green' : 'red'}}>
                                    {Math.floor(coin.price_change_percentage_24h * 100)/100}%
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatter.format(coin.total_volume)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatter.format(coin.market_cap)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <IconButton
                                        onClick={this.addCoin.bind(this, coin, idx)}
                                    >
                                        <StarsIcon/>
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </Fragment>
        )
    }


    
}


const mapDispatchToProps = (dispatch) => {
    return{
        addCoin: (formData) => dispatch(addCoin(formData))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(CoinTable))
