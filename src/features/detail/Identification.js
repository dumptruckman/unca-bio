import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  commonName: {
    marginLeft: '20px',
  },
});

const Identification = ({ classes, data }) => (
  <Card>
    <div>
      <Typography variant="title">
        <i>
          {data.scientificName}
          {data.author && data.author}
          {data.authorDate && data.authorDate}
        </i>
      </Typography>
    </div>
    <div>
      <Typography color="textSecondary">
        {data.fullTaxonomy} {data.subSpecies && data.subSpecies}
      </Typography>
    </div>
    <div className={classes.commonName}>
      <Typography color="textSecondary">{data.commonName}</Typography>
    </div>
    <div>
      <Typography component="p">
        Identified by {data.identifiedBy ? data.identifiedBy : 'Catalog'} {data.identifiedDate}
      </Typography>
    </div>
  </Card>
);

export default withStyles(styles)(Identification);
