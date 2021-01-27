import{
    GET_POSTS,
    POST_ERROR,
    UPDATE_VOTES,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UP_VOTE,
    DE_VOTE,
    DELETE_POST,
    UPDATE_POST
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    status: true,
    error: {}
}



export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return{
                ...state, 
                posts: payload,
                loading: false
            };
        case POST_ERROR:
            return{
                ...state, 
                error: payload,
                loading: false
            } ;
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
                status: false
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                loading: false,
                status: false
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                loading: false
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
                    coments: state.post.coments.filter(coment => coment._id != payload)
                },
                loading: false
            }
        default:
            return state;
    }
}