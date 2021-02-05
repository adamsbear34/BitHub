import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

//Material UI 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

//CSS
const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
}));



const AuthDrawer = props => {

    const classes = useStyles();
    //Drawer open state
    const [open, setOpen] = React.useState(false);

    /*
    * handleDrawerOpen
    * setting drawer state to true
    */
    const handleDrawerOpen = () => {
        setOpen(true);
    };

     /*
    * handleDrawerClose
    * setting drawer state to false
    */
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const theme = useTheme();

    return (
        <Fragment>
        <Drawer
            className={classes.drawer}
            variant={"persistent"}
            anchor={"left"}
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawer_head}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button
                    component={Link}
                    to={'/tracker'}
                >
                    <ListItemIcon>
                        <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Tracker"}/>
                </ListItem>
            </List>
            <Divider />
        </Drawer>
        <IconButton
            onClick={ e => handleDrawerOpen()}
        >
            <MenuIcon color={"secondary"} />
        </IconButton>
    </Fragment>
    )
}

AuthDrawer.propTypes = {

}

export default AuthDrawer
