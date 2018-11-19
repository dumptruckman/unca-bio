import React from 'react';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
import { FirestoreCollection } from 'react-firestore';
import SpecimenDetail from './detail/SpecimenDetail';
import LoadingBar from './shared/LoadingBar';
import { extractScientificName } from '../util/taxonomy';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  th: {
    wordWrap: 'break-word',
    textOverflow: 'clip',
    whiteSpace: 'normal',
  },
});

const SpecimenList = ({ classes }) => (
  <FirestoreCollection
    path="specimens"
    render={({ isLoading, data }) => (
      <React.Fragment>
        <LoadingBar isLoading={isLoading} />
        <AccessibleReactTable
          data={data}
          filterable={true}
          loading={isLoading}
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              : true;
          }}
          getTheadThProps={() => ({
            style: {
              wordWrap: 'ellipsis',
              textOverflow: 'clip',
              whiteSpace: 'normal',
            },
          })}
          SubComponent={({ original }) => <SpecimenDetail specimen={original} />}
          columns={[
            {
              Header: 'Catalog Number',
              accessor: 'catalogNumber',
              maxWidth: 150,
              minWidth: 80,
            },
            {
              Header: 'Taxonomy',
              accessor: 'identification.fullTaxonomy',
              Cell: ({ value }) => <i>{extractScientificName(value)}</i>,
              minWidth: 200,
            },
            // {
            //   Header: 'Sex',
            //   accessor: 'attributes.sex',
            //   maxWidth: 80,
            //   minWidth: 50,
            // },
            {
              Header: 'Locality',
              accessor: 'locality.specificLocality',
              minWidth: 150,
            },
            {
              Header: 'Collection Date',
              accessor: 'collectionDate',
              maxWidth: 200,
              minWidth: 85,
            },
            {
              Header: 'Voucher Type',
              accessor: 'voucherType',
              maxWidth: 200,
              minWidth: 80,
            },
            // {
            //   Header: 'Parts',
            //   accessor: 'parts',
            // },
          ]}
        />
      </React.Fragment>
    )}
  />
);

export default withStyles(styles)(SpecimenList);
