import React from 'react';
import Paper from '@material-ui/core/Paper';
import titleImage from '../../images/specimenlarge.png';
import browseImage from '../../images/collection.jpg';
import searchImage from '../../images/searching.jpg';
import addImage from '../../images/adding.jpg';
import importImage from '../../images/import.jpg';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as routes from '../../constants/routes';
import HomeCard from './HomeCard';
import { withAuth } from '../auth/withAuth';

const styles = theme => ({
  layout: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  titleBlock: {
    width: '100%',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up('xs')]: {
      fontSize: 24,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 36,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 60,
    },
  },
  titleImage: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
  },
});

const Home = ({ classes, auth }) => (
  <div className={classes.layout}>
    <Paper className={classes.titleBlock}>
      <Typography className={classes.titleText} variant="h1" color="inherit">
        UNCA Biology Specimen Catalog
      </Typography>
      <img className={classes.titleImage} src={titleImage} alt="Lizard skeleton specimen" />
    </Paper>
    <Grid container spacing={16}>
      <HomeCard
        title="Browse Specimens"
        icon={ViewListIcon}
        image={browseImage}
        route={routes.MASTER}
      />
      <HomeCard title="Advanced Search" icon={SearchIcon} image={searchImage} />
      {auth.isContributor && <HomeCard title="Add Specimens" icon={AddIcon} image={addImage} />}
      {auth.isAdmin && (
        <HomeCard
          title="Import Specimens"
          icon={CloudUploadIcon}
          image={importImage}
          route={routes.IMPORT}
        />
      )}
    </Grid>
  </div>
);

export default withAuth(withStyles(styles)(Home));
