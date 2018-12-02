import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FirebaseAuth from '../auth/FirebaseAuth';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import * as routes from '../../constants/routes';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const PrivilegedNavigation = () => (
  <FirebaseAuth>
    {({ isAdmin, isContributor }) => {
      if (isAdmin || isContributor) {
        return (
          <div>
            <Divider />
            <List component="nav">
              <ListItem button component={Link} to={routes.HOME}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Specimens" />
              </ListItem>
              {isAdmin && (
                <React.Fragment>
                  <ListItem button component={Link} to={routes.IMPORT}>
                    <ListItemIcon>
                      <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Import Specimens" />
                  </ListItem>
                  <ListItem button component={Link} to={routes.USERS}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                  </ListItem>
                </React.Fragment>
              )}
            </List>
          </div>
        );
      } else {
        return null;
      }
    }}
  </FirebaseAuth>
);

PrivilegedNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivilegedNavigation);
