import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import { setAlert} from './alert';
import { getCurrentProfile } from './profile';
import setAuthToken from '../utils/setAuthToken'


/**
 * Loading current user
 */
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        dispatch(getCurrentProfile());
    }catch(err){
        dispatch({
            type: AUTH_ERROR
        });
    }
};



/**
 * 
 * @param {*} param0 
 * Registering new user 
 */
export const register = ( { username, email, password } ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password });


    try{
        const res = await axios.post('api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error, 'error')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * Signing In existing user
 */
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });


    try{
        const res = await axios.post('api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error, 'error')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


//Logout
export const logout = () => dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}