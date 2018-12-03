import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import PrivilegedNavigation from './PrivilegedNavigation';
import FirebaseAuth from '../auth/FirebaseAuth';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const Navigation = ({ classes }) => (
  <div className={classes.root}>
    <FirebaseAuth>
      {({ isAdmin, isAuthed, authUtil }) => (
        <div>
          <List component="nav">
            <ListItem button component={Link} to={routes.HOME}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to={routes.MASTER}>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Browse Specimens" />
            </ListItem>
          </List>
          <PrivilegedNavigation />
          <Divider />
          <List component="nav">
            <ListItem
              button
              onClick={() => {
                if (!isAuthed) {
                  authUtil.doSignInWithGoogle();
                } else {
                  authUtil.doSignOut();
                }
              }}
            >
              <ListItemText primary={isAuthed ? 'Logout' : 'Login'} />
            </ListItem>
          </List>
        </div>
      )}
    </FirebaseAuth>
  </div>
);

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
