import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  simplePaper: {
    textAlign: 'left',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

const DetailItem = ({ classes, title, children }) => (
  <Grid item>
    {title ? (
      <Paper className={classes.paper}>
        <Typography variant="caption">{title}</Typography>
        <Card>{children}</Card>
      </Paper>
    ) : (
      <Paper className={classes.simplePaper}>{children}</Paper>
    )}
  </Grid>
);

export default withStyles(styles)(DetailItem);
