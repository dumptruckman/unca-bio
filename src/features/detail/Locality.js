import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  valueCell: {
    paddingTop: '0px',
    paddingBottom: '0px',
    width: '100%',
  },
  row: {
    height: '0px',
  },
  noBorder: {
    border: 'none',
  },
});

const Locality = ({ classes, data: { locality }, editing }) => {
  const coords = locality ? locality.coordinates : undefined;
  const fromDate = locality
    ? locality.collectingDateFrom && locality.collectingDateFrom.toDate()
    : undefined;
  const toDate = locality
    ? locality.collectingDateTo && locality.collectingDateTo.toDate()
    : undefined;

  return (
    <div>
      <Table>
        <TableBody>
          {(editing || locality.continentOcean) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Continent/Ocean:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.continentOcean}</Typography>}
              </TableCell>
            </TableRow>
          )}
          {(editing || locality.country) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Country:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.country}</Typography>}
              </TableCell>
            </TableRow>
          )}
          {(editing || locality.stateProvince) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">State/Province:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.stateProvince}</Typography>}
              </TableCell>
            </TableRow>
          )}
          {(editing || locality.specificLocality) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Specific Locality:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.specificLocality}</Typography>}
              </TableCell>
            </TableRow>
          )}
          {(editing || coords) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Coordinates:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? (
                  <TextField />
                ) : (
                  <Typography>
                    {coords.latitude}° {coords.longitude}°
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          )}
          {(editing || (fromDate && toDate)) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Collecting Date:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? (
                  <TextField />
                ) : (
                  <Typography>
                    {fromDate.getFullYear()}-{toDate.getFullYear()} ({fromDate.getFullYear()}/
                    {fromDate.getMonth() + 1}/{fromDate.getDate()} - {toDate.getFullYear()}/
                    {toDate.getMonth() + 1}/{toDate.getDate()})
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          )}
          {(editing || locality.collectingRemarks) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Collecting Remarks:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.collectingRemarks}</Typography>}
              </TableCell>
            </TableRow>
          )}
          {(editing || locality.fieldCatalogNumber) && (
            <TableRow className={classes.row}>
              <TableCell className={classes.noBorder} variant="head" padding="none">
                <Typography align="right">Field Catalog Number:</Typography>
              </TableCell>
              <TableCell className={[classes.valueCell, classes.noBorder]}>
                {editing ? <TextField /> : <Typography>{locality.fieldCatalogNumber}</Typography>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(Locality);
