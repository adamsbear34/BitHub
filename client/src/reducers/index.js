import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import categories from './categories';
import coins from './coins'
export default combineReducers({
    alert,
    auth,
    profile,
    post,
    categories,
    coins
});