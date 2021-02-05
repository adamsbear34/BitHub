import axios from 'axios';
import { setAlert } from './alert';

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES,
    ADD_COIN,
    DELETE_COIN,
    GET_USER_COINS,
    GET_USER_STATS,
    USER_STATS_ERROR,
    UPLOAD_IMAGE,
    GET_PROFILE_REQUEST,
    REGISTRATION_COMPLETE
} from './types';



/**
 * Getting authentificated user profile
 */
export const getCurrentProfile = () => async dispatch => {
    dispatch({
        type: GET_PROFILE_REQUEST
    });
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
            status:true 
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            status: false,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

/**
 * Getting all existing profiles
 */
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

/**
 * 
 * @param {*} userId 
 * Get existing profile by Id
 */
export const getProfileByID = userId => async dispatch => {
    dispatch({
        type: GET_PROFILE_REQUEST
    });
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }


};

/**
 * 
 * @param {*} formData 
 * @param {*} history 
 * @param {*} edit 
 * Creating new profiel
 * Updating profile if it exists
 */
export const createProfile = (formData, history, edit = false) => async dispatch => {
    dispatch({
        type: GET_PROFILE_REQUEST
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: REGISTRATION_COMPLETE
        });
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', "success"));

        if (!edit){
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error, 'error')));
        }
          dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

/**
 * 
 * @param {*} formData 
 * Adding cryptocurrency data to the profile 
 */
export const addCoin = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/coins/addFavorite', formData, config);
        dispatch({
            type: ADD_COIN,
            payload: res.data
        });
        dispatch(setAlert('Coin Added', 'success'));
    }catch(err){ 
        const errors = err.response.data;
        if(errors){
            dispatch(setAlert(errors.msg, 'error'));
        }
          dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

/**
 * 
 * @param {*} id 
 * Getting existig profile cryptocurrency data
 */
export const getUserCoins = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/coins/${id}`);
        
        dispatch({
            type: GET_USER_COINS,
            payload: res.data.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
    
};


/**
 * 
 * @param {*} coin_id 
 * Deleting cryptocurrency data from the 
 * existing profile
 */
export const deleteUserCoin = (coin_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/coins/${coin_id}`);
        dispatch({
            type: DELETE_COIN,
            payload: coin_id
        });
        dispatch(setAlert('Coin Removed', 'success'));
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};



/**
 * 
 * @param {*} userId 
 * Getting existing profile stats
 */
export const getUserStats = (userId) => async dispatch => {
    try{
        const res = await axios.get(`/api/analytics/${userId}`);
        dispatch({
            type: GET_USER_STATS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: USER_STATS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

/**
 * 
 * @param {*} formData 
 * Uploading exsting profile avatar
 */
export const uploadProfileImage = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try{
        const res = await axios.post('/api/profile//image-upload', formData, config);
        dispatch({
            type: UPLOAD_IMAGE,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};