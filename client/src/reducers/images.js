import{
    GET_POSTS_IMAGE,
    POSTS_IMAGE_ERROR
} from '../actions/types';


const initialState = {
    images: [],
    image: null,
    loading: true,
    status: true,
    error: {}
}



export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS_IMAGE:
            return{
                ...state, 
                image: payload,
                loading: false
            };
        case POSTS_IMAGE_ERROR:
            return{
                ...state, 
                error: payload,
                loading: false
            };
        
        default:
            return state;
    }
}
