import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FirebaseAuth from '../auth/FirebaseAuth';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const AdminNavigation = () => (
  <FirebaseAuth>
    {({ isAdmin }) => {
      if (isAdmin) {
        return (
          <div>
            <Divider />
            <List component="nav">
              <ListItem button>
                <ListItemText primary="Users" />
              </ListItem>
            </List>
          </div>
        );
      } else {
        return null;
      }
    }}
  </FirebaseAuth>
);

AdminNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminNavigation);
