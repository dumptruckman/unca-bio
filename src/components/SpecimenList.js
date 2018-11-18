import React from 'react';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
import { FirestoreCollection } from 'react-firestore';
import SpecimenDetail from './detail/SpecimenDetail';
import LoadingBar from './shared/LoadingBar';
import { extractScientificName } from '../util/taxonomy';

export default () => (
  <FirestoreCollection
    path="specimens"
    render={({ isLoading, data }) => (
      <main>
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
          SubComponent={({ original }) => <SpecimenDetail specimen={original} />}
          columns={[
            {
              Header: 'Catalog Number',
              accessor: 'catalogNumber',
              maxWidth: 150,
            },
            {
              Header: 'Taxonomy',
              accessor: 'identification.fullTaxonomy',
              Cell: ({ value }) => <i>{extractScientificName(value)}</i>,
            },
            {
              Header: 'Sex',
              accessor: 'attributes.sex',
              maxWidth: 100,
            },
            {
              Header: 'Locality',
              accessor: 'locality.specificLocality',
            },
            {
              Header: 'Collection Date',
              accessor: 'collectionDate',
              maxWidth: 200,
            },
            {
              Header: 'Voucher Type',
              accessor: 'voucherType',
              maxWidth: 200,
            },
            // {
            //   Header: 'Parts',
            //   accessor: 'parts',
            // },
          ]}
        />
      </main>
    )}
  />
);
