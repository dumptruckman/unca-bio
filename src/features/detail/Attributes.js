import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DetailDataTable from './layout/DetailDataTable';
import DetailDatumRow from './layout/DetailDatumRow';
import DetailDatumLabel from './layout/DetailDatumLabel';
import DetailDatumValue from './layout/DetailDatumValue';

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

const Attributes = ({ classes, data: { attributes }, editing }) => (
  <DetailDataTable>
    {(editing || attributes.sex) && (
      <DetailDatumRow>
        <DetailDatumLabel>Sex:</DetailDatumLabel>
        <DetailDatumValue>
          {editing ? <TextField /> : <Typography>{attributes.sex}</Typography>}
        </DetailDatumValue>
      </DetailDatumRow>
    )}
  </DetailDataTable>
);

export default withStyles(styles)(Attributes);
