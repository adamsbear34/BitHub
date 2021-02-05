import{
    GET_POSTS,
    POST_ERROR,
    UPDATE_VOTES,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    DELETE_POST,
    UPDATE_POST,
    UPLOADING_POST,
    LOAD_POSTS
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    uploading: false,
    status: false,
    error: {}
}



export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_POSTS:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return{
                ...state, 
                posts: payload,
                loading: false,
                status: false,
                
            };
        case POST_ERROR:
            return{
                ...state, 
                error: payload,
                loading: false,
                status: false,
                uploading: false
            };
        case UPLOADING_POST:
            return {
                ...state,
                uploading: true
            }
        case UPDATE_VOTES:
            return{
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, voteCount: payload.voteCount} : post),
                post: {...state.post, voteCount: payload.voteCount},
                loading: false
            };
        case ADD_POST:
            return{
                ...state,
                posts: [...state.posts, payload],
                loading: false,
                uploading: false,
                status: true
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                loading: false,
                uploading: false,
                status: true
                
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                loading: false,
                status: false
            };
        case DELETE_POST: 
            return{
               ...state,
               posts: state.posts.filter(post=> post._id !== payload),
               post: null,
               loading: false 
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, coments: payload},
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    coments: state.post.coments.filter(coment => coment._id !== payload)
                },
                loading: false
            }
        default:
            return state;
    }
}