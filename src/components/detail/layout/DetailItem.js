import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  title: {
    marginLeft: '10px',
    marginTop: '5px',
    //paddingBottom: '5px',
  },
  simpleCard: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  card: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: '20px',
    paddingTop: '5px',
  },
});

const DetailItem = ({ classes, title, children }) => (
  <Grid item>
    {title ? (
      <Card className={classes.card}>
        <Typography className={classes.title} variant="caption">
          {title}
        </Typography>
        <CardContent className={classes.cardContent}>{children}</CardContent>
      </Card>
    ) : (
      <Card className={classes.simpleCard}>{children}</Card>
    )}
  </Grid>
);

export default withStyles(styles)(DetailItem);
