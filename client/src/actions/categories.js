import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_CATEGORIES,
    CATEGORIES_ERROR,
    GET_CATEGORY,
    GET_POSTS,
    GET_CATEGORY_REQUEST,
} from './types';




//Get all categories
export const getCategories = () => async dispatch => {
    dispatch({
        type: GET_CATEGORY_REQUEST
    });
    try{
        const res = await axios.get('/api/category/');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: CATEGORIES_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};



export const getCategoriesById = (categoryId) => async dispatch => {
    dispatch({
        type: GET_CATEGORY_REQUEST
    });
    try {
        const res = await axios.get(`/api/category/${categoryId}`);
        dispatch({
            type: GET_CATEGORY,
            payload: res.data.category
        });
        dispatch({
            type: GET_POSTS,
            payload: res.data.posts
        });
    }catch(err){
        dispatch({
            type: CATEGORIES_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

};




