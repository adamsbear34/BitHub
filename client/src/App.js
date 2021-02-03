import React, {Fragment, useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Components
import Navbar from './components/layout/Navbar/Navbar';
import Landing from './components/layout/Landing/Landing'
import Login from './components/auth/Login';
import AlertComponent from './components/layout/AlertComponent';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditPorfile from './components/profile-forms/EditPorfile';
import Profiles from './components/profiles/Profiles'
import Profile from './components/userPorfile/Profile';
import PostView from './components/posts/postView/MainView/PostView';
import Category from './components/categories/Caterogy';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Posts from './components/posts/PostList/Posts';
import PostForm from './components/posts/PostForm';
import TrackerView from './components/tracker/TrackerView';
import EditPostForm from './components/posts/editPost/EditPostForm';
import SearchResults from './components/search/SearchResult';
//Design
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => { 
    useEffect(() => {
        store.dispatch(loadUser());
    }, [loadUser]);
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <AlertComponent />
                <Switch>
                    <Route exact path="/home" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/posts/:id" component={PostView} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/tracker" component={TrackerView}/>
                    <Route exact path="/search" component={SearchResults}/>
                    <Route exact path="/category/:id" component={Category} />
                    <PrivateRoute exact path="/post/edit/:id" component={EditPostForm} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/create-post" component={PostForm} />
                    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                    <PrivateRoute exact path="/edit-profile" component={EditPorfile} />
                </Switch>
            </Fragment>
        </Router>
        </Provider>
    </ThemeProvider>

)};
    

 

export default App;
