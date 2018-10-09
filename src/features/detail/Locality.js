import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  valueText: {
    marginLeft: '20px',
  },
});

const Locality = ({ classes, data: { locality } }) => {
  const coords = locality.coordinates;
  const fromDate = locality.collectingDateFrom && locality.collectingDateFrom.toDate();
  const toDate = locality.collectingDateTo && locality.collectingDateTo.toDate();

  return (
    <Card>
      <Grid container>
        <Grid item>
          <div>
            {locality.continentOcean && <Typography align="right">Continent/Ocean:</Typography>}
            {locality.country && <Typography align="right">Country:</Typography>}
            {locality.stateProvince && <Typography align="right">State/Province:</Typography>}
            {locality.specificLocality && <Typography align="right">Specific Locality:</Typography>}
            {locality.coordinates && <Typography align="right">Coordinates:</Typography>}
            {fromDate && toDate && <Typography align="right">Collecting Date:</Typography>}
            {locality.collectingRemarks && (
              <Typography align="right">Collecting Remarks:</Typography>
            )}
            {locality.fieldCatalogNumber && (
              <Typography align="right">Field Catalog Number:</Typography>
            )}
          </div>
        </Grid>
        <Grid item>
          <div>
            {locality.continentOcean && (
              <Typography className={classes.valueText}>{locality.continentOcean}</Typography>
            )}
            {locality.country && (
              <Typography className={classes.valueText}>{locality.country}</Typography>
            )}
            {locality.stateProvince && (
              <Typography className={classes.valueText}>{locality.stateProvince}</Typography>
            )}
            {locality.specificLocality && (
              <Typography className={classes.valueText}>{locality.specificLocality}</Typography>
            )}
            {locality.coordinates && (
              <Typography className={classes.valueText}>
                {coords.latitude}° {coords.longitude}°
              </Typography>
            )}
            {fromDate &&
              toDate && (
                <Typography className={classes.valueText}>
                  {fromDate.getFullYear()}-{toDate.getFullYear()} ({fromDate.getFullYear()}/
                  {fromDate.getMonth() + 1}/{fromDate.getDate()} - {toDate.getFullYear()}/
                  {toDate.getMonth() + 1}/{toDate.getDate()})
                </Typography>
              )}
            {locality.collectingRemarks && (
              <Typography className={classes.valueText}>{locality.collectingRemarks}</Typography>
            )}
            {locality.fieldCatalogNumber && (
              <Typography className={classes.valueText}>{locality.fieldCatalogNumber}</Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(Locality);
