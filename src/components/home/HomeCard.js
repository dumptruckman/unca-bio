import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/Card';
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Grid from '@material-ui/core/Grid/Grid';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';

const styles = theme => ({
  cardHeader: {
    fontSize: '32px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    paddingTop: '30%',
  },
});

const HomeCard = ({ classes, title, icon: Icon, route, image }) => (
  <Grid item xs={12} md={6}>
    <Card>
      <CardActionArea component={route ? Link : undefined} to={route}>
        <CardHeader
          avatar={
            <Avatar aria-label={title} className={classes.avatar}>
              <Icon />
            </Avatar>
          }
          title={
            <Typography className={classes.cardHeader} variant="h2">
              {title}
            </Typography>
          }
        />
        <CardMedia className={classes.media} image={image} title={title} />
      </CardActionArea>
    </Card>
  </Grid>
);

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  route: PropTypes.string,
};

export default withStyles(styles)(HomeCard);
