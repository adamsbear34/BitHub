import { 
    CLEAR_PROFILE, 
    GET_PROFILE, PROFILE_ERROR, 
    GET_PROFILES, 
    ADD_COIN, 
    DELETE_COIN,
    GET_USER_COINS,
    DELETE_POST,
    GET_USER_STATS,
    USER_STATS_ERROR,
    UPLOAD_IMAGE,
    GET_PROFILE_REQUEST
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    user_crypto: [],
    stats: null,
    loading: true,
    error: {}
}


export default function(state = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case GET_PROFILE_REQUEST:
            return{
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                user_crypto: [],
                stats: null,
                loading: true
            };
        case ADD_COIN:
            return{
                ...state,
                profile: {
                    ...state.profile,
                    coins: payload
                },
                loading: false
            };
        case GET_USER_COINS:{
            return{
                ...state,
                user_crypto: payload,
                loading: false
            };
        }
        case DELETE_COIN:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    coins: state.profile.coins.filter(coin => coin.coinId !== payload)
                },
                user_crypto: state.user_crypto.filter(coin => coin.id !== payload),
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {...state.profile.user, posts: state.profile.user.posts.filter(post => post._id !== payload)}
                },
                loading: false
            };
        case GET_USER_STATS:
            return {
                ...state,
                stats: payload,
                loading: false
            };
        case USER_STATS_ERROR:
            return {
                error: payload,
                loading: false
            };
        case UPLOAD_IMAGE: 
            return {
                ...state,
                profile: {
                    ...state.profile,
                    user: {...state.profile.user, avatar: payload}
                },
                loading: false
            };
        default:
            return state;
    }
}