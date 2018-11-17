import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

const styles = theme => ({});

const DetailDataTable = ({ classes, children, tableProps, tbodyProps }) => (
  <Table {...tableProps}>
    <TableBody {...tbodyProps}>{children}</TableBody>
  </Table>
);

export default withStyles(styles)(DetailDataTable);
