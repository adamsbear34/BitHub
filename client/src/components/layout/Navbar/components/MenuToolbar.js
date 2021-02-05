import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../../../actions/categories'; 
import  {Link} from 'react-router-dom'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

//CSS
const useStyles = makeStyles((theme) => ({
    menu_tool_bar: {
        backgroundColor: theme.palette.primary,
        justifyContent: 'space-between',
        overflowX: "auto"
    },
    categories_links: {
        padding: theme.spacing(1),
        flexShrink: 0,
        color: "white"
    }
}));

const MenuToolbar = ({ getCategories, categories: {categories, loading} }) => {
    const classes = useStyles();

    /*
    * UseEffect
    * Calling API categories route
    * Reciving all the categories
    */
    useEffect(() => {
        getCategories();
    },[getCategories]);

    return (
        <Fragment>
             <Toolbar className={classes.menu_tool_bar} variant="dense" component="nav">
                { !loading ? (
                    <Fragment>
                        {categories.map((c) => (
                            <Button
                                key={c._id}
                                className={classes.categories_links}
                                component={Link}
                                to={`/category/${c._id}`}
                            >
                                {c.name}
                            </Button>
                        ))}
                    </Fragment>
                ):(
                    <Fragment>
                    </Fragment>
                )}
            </Toolbar>
        </Fragment>
    )
}

MenuToolbar.propTypes = {
    getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    categories: state.categories
});

export default connect(mapStateToProps, { getCategories })(MenuToolbar)
