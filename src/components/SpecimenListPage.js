import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SpecimenList from './SpecimenList';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1300 + theme.spacing.unit * 3 * 2)]: {
      width: 1300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const SpecimenListPage = ({ classes }) => (
  <main className={classes.layout}>
    <Paper>
      <SpecimenList />
    </Paper>
  </main>
);

export default withStyles(styles)(SpecimenListPage);
