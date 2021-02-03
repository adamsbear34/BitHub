import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_VOTES,
    ADD_POST,
    GET_POST,
    DELETE_POST,
    UPDATE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPLOADING_POST,
    LOAD_POSTS
} from './types';


//Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get Post by Id
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

};


//Add post 
export const addPost = (formData) => async dispatch => {
    dispatch({
        type: UPLOADING_POST
    });
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    try { 
       const res =  await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
 
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'error')));
        }
        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
};

//Update post
export const updatePost = (formData, id) => async dispatch => {
    dispatch({
        type: UPLOADING_POST
    });
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
   

    try { 
       const res =  await axios.post(`/api/posts/edit/${id}`, formData, config);
        
        dispatch({
            type: UPDATE_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Updated', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'error')));
        }
        dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
};


//Delete post
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert('Post removed', 'success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
}; 


//Upvote
export const updateVote = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/vote/${postId}`, formData, config);
        dispatch({
            type: UPDATE_VOTES,
            payload: { postId, voteCount: res.data}
        });
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'error')));
        }
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};



//Search by post
export const searchPostByTitle = (query) => async dispatch => {
    dispatch({
        type: LOAD_POSTS
    });
    try{
        const res = await axios.get(`/api/search?search=${query}`);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


//Add comment
export const addComment = (postId, formData) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try { 
            const res =  await axios.post(`/api/posts/comment/${postId}`, formData, config);
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
            dispatch(setAlert('Comment Added', 'success'));
        } catch (err) {
            dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } 
            });
        }
};

//Delete Comment 
export const deleteComment = (postId, commentId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
}


