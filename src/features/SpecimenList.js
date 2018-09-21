import React from 'react';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
import { FirestoreCollection } from 'react-firestore';

export default () => (
  <FirestoreCollection
    path="specimens"
    render={({ isLoading, data }) => {
      if (isLoading) {
        return <p>"loading"</p>;
      }
      return (
        <AccessibleReactTable
          data={data}
          filterable={true}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              : true;
          }}
          columns={[
            {
              Header: 'Catalog Number',
              accessor: 'catalogNumber',
            },
            {
              Header: 'Identification',
              accessor: 'scientificName',
              Cell: ({ value }) => <i>{value}</i>,
            },
            {
              Header: 'Common Name',
              accessor: 'commonName',
            },
            {
              Header: 'Sex',
              accessor: 'sex',
            },
          ]}
        />
      );
    }}
  />
);
