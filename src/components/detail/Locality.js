import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DetailDataTable from './layout/DetailDataTable';
import DetailDatumRow from './layout/DetailDatumRow';
import DetailDatumLabel from './layout/DetailDatumLabel';
import DetailDatumValue from './layout/DetailDatumValue';

const styles = theme => ({});

const Locality = ({ classes, data: { locality }, editing }) => {
  const coords = locality ? locality.coordinates : undefined;
  const fromDate = locality
    ? locality.collectingDateFrom && locality.collectingDateFrom.toDate()
    : undefined;
  const toDate = locality
    ? locality.collectingDateTo && locality.collectingDateTo.toDate()
    : undefined;

  return (
    <DetailDataTable>
      {(editing || locality.continentOcean) && (
        <DetailDatumRow>
          <DetailDatumLabel>Continent/Ocean:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.continentOcean}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || locality.country) && (
        <DetailDatumRow>
          <DetailDatumLabel>Country:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.country}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || locality.stateProvince) && (
        <DetailDatumRow>
          <DetailDatumLabel>State/Province:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.stateProvince}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || locality.specificLocality) && (
        <DetailDatumRow>
          <DetailDatumLabel>Specific Locality:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.specificLocality}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || coords) && (
        <DetailDatumRow>
          <DetailDatumLabel>Coordinates:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? (
              <TextField />
            ) : (
              <Typography>
                {coords.latitude}° {coords.longitude}°
              </Typography>
            )}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || (fromDate && toDate)) && (
        <DetailDatumRow>
          <DetailDatumLabel>Collecting Date:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? (
              <TextField />
            ) : (
              <Typography>
                {fromDate.getFullYear()}-{toDate.getFullYear()} ({fromDate.getFullYear()}/
                {fromDate.getMonth() + 1}/{fromDate.getDate()} - {toDate.getFullYear()}/
                {toDate.getMonth() + 1}/{toDate.getDate()})
              </Typography>
            )}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || locality.collectingRemarks) && (
        <DetailDatumRow>
          <DetailDatumLabel>Collecting Remarks:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.collectingRemarks}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
      {(editing || locality.fieldCatalogNumber) && (
        <DetailDatumRow>
          <DetailDatumLabel>Field Catalog Number:</DetailDatumLabel>
          <DetailDatumValue>
            {editing ? <TextField /> : <Typography>{locality.fieldCatalogNumber}</Typography>}
          </DetailDatumValue>
        </DetailDatumRow>
      )}
    </DetailDataTable>
  );
};

export default withStyles(styles)(Locality);
