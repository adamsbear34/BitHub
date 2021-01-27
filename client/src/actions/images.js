import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS_IMAGE,
    POSTS_IMAGE_ERROR
} from './types';


//Get posts
export const getPostsImage = slug => async dispatch => {
    const config = {
        responseType: 'Blob'
    }

    /*
    axios.get(`/api/posts/photo/${slug}`, {
        responseType: 'Blob',
  }).then(response => {
      // response.data is an empty object
      const url = window.URL.createObjectURL(new Blob[response.data]);
      dispatch
      });
      */

 
    try {
        const res = await axios.get(`/api/posts/photo/${slug}`, config);
        const url = window.URL.createObjectURL(new Blob[res.data]);
        dispatch({
            type: GET_POSTS_IMAGE,
            payload: url
        });
    } catch (err) {
        dispatch({
            type: POSTS_IMAGE_ERROR,
        });
    }
  
};