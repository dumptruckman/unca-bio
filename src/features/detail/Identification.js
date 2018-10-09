import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  commonName: {
    marginLeft: '20px',
  },
});

const Identification = ({ classes, data: { identification } }) => (
  <Card>
    <div>
      <Typography variant="title">
        <i>
          {identification.scientificName}
          {identification.author && identification.author}
          {identification.authorDate && identification.authorDate}
        </i>
      </Typography>
    </div>
    <div>
      <Typography color="textSecondary">
        {identification.fullTaxonomy} {identification.subSpecies && identification.subSpecies}
      </Typography>
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
  </Card>
);

export default withStyles(styles)(Identification);
