import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  title: {
    marginLeft: '-5px',
    paddingBottom: '5px',
  },
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
        <Typography className={classes.title} variant="caption">
          {title}
        </Typography>
        <Paper elevation={0}>{children}</Paper>
      </Paper>
    ) : (
      <Paper className={classes.simplePaper}>{children}</Paper>
    )}
  </Grid>
);

export default withStyles(styles)(DetailItem);
