import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  commonName: {
    marginLeft: '20px',
  },
});

const Identification = ({ classes, data: { identification } }) => (
  <div>
    <div>
      <Typography variant="title">
        <i>{identification.scientificName}</i>
        {(identification.author || identification.authorDate) &&
          ' (' +
            (identification.author && identification.author) +
            (identification.author && identification.authorDate && ', ') +
            (identification.authorDate && identification.authorDate.toDate().getFullYear()) +
            ')'}
      </Typography>
    </div>
    <div>
      <Typography color="textSecondary">{identification.fullTaxonomy}</Typography>
    </div>
    <div className={classes.commonName}>
      <Typography color="textSecondary">{identification.commonName}</Typography>
    </div>
    <div>
      <Typography component="p">
        Identified by {identification.identifiedBy ? identification.identifiedBy : 'Catalog'}{' '}
        {identification.identifiedDate}
      </Typography>
    </div>
  </div>
);

export default withStyles(styles)(Identification);
