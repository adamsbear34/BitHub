import {
    GET_CATEGORIES,
    CATEGORIES_ERROR,
    GET_CATEGORY,
    GET_CATEGORY_REQUEST
} from '../actions/types';


const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: {}
};


export default function(state = initialState, action){
    const { type, payload } = action;

    switch (type){
        case GET_CATEGORY_REQUEST:
            return{
                ...state,
                loading: true
            };
        case GET_CATEGORIES:
            return{
                ...state,
                categories: payload,
                loading: false
            };
        case CATEGORIES_ERROR:
            return{
                ...state,
                error: payload,
                loading:false
            };
        case GET_CATEGORY: 
            return{
                ...state,
                category: payload,
                loading: false
            };
        default:
            return state;
    }
}
