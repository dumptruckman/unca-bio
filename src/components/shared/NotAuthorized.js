import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
    marginTop: '2em',
  },
};

const NotAuthorized = ({ classes }) => (
  <div className={classes.root}>
    <Typography component="h1" variant="h1" color="secondary">
      You are not authorized to view this page.
    </Typography>
  </div>
);

export default withStyles(styles)(NotAuthorized);
