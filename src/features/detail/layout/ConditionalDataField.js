import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { SpecimenDetailContext } from '../../SpecimenDetail';

const ConditionalDataField = ({ conditional, className, label, value, input, children }) => (
  <SpecimenDetailContext.Consumer>
    {({ editing }) => {
      const conditionalValue = conditional();
      const conditionMet = conditionalValue !== undefined || conditionalValue === true;
      if (label) {
        if (editing) {
          return input;
        } else if (conditionMet) {
          return (
            <Grid container>
              <Grid item>{label}</Grid>
              <Grid item>{value}</Grid>
            </Grid>
          );
        } else {
          return null;
        }
      } else {
        if (editing) {
          return input;
        } else if (conditionMet) {
          return value;
        } else {
          return null;
        }
      }
      // if (conditional() !== undefined) {
      //   return <Typography className={className}>{children}</Typography>;
      // } else if (editing) {
      //   return (
      //     <TextField
      //       className={className}
      //       defaultValue={children}
      //       margin="normal"
      //       variant="outlined"
      //     />
      //   );
      // } else {
      //   return null;
      // }
    }}
  </SpecimenDetailContext.Consumer>
);

export default ConditionalDataField;
