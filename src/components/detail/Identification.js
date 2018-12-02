import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { extractScientificName } from '../../util/taxonomy';

const styles = theme => ({
  commonName: {
    marginLeft: '20px',
  },
});

const Identification = ({
  classes,
  data: {
    identification: { authorship, fullTaxonomy, commonName, identifiedBy, identifiedDate },
  },
}) => (
  <React.Fragment>
    <div>
      <Typography variant="h6">
        <i>{extractScientificName(fullTaxonomy)}</i>
        {authorship && ` (${authorship})`}
      </Typography>
    </div>
    <div>
      <Typography color="textSecondary">{fullTaxonomy}</Typography>
    </div>
    <div className={classes.commonName}>
      <Typography color="textSecondary">{commonName}</Typography>
    </div>
    <div>
      <Typography component="p">
        Identified by {identifiedBy ? identifiedBy : 'Catalog'} {identifiedDate}
      </Typography>
    </div>
  </React.Fragment>
);

export default withStyles(styles)(Identification);
