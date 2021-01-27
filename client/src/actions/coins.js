import axios from 'axios';
import {
    GET_COINS,
    COIN_ERROR,
} from './types';



//Get all coins 
export const getCoins = () => async dispatch => {
    try {
        const res = await axios.get('/api/coins');
        console.log("get coins called")
        dispatch({
            type: GET_COINS,
            payload: res.data.data
        });
    }catch(err){
        dispatch({
            type: COIN_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
    
};







