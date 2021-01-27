import {
    GET_COINS,
    COIN_ERROR,
} from '../actions/types';


const initialState = {
    coins: [],
    coin: null,
    loading: true,
    status: true,
    error: {}
};


export default function(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case GET_COINS:
            return{
                ...state,
                coins: payload,
                loading: false
            };
        case COIN_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}