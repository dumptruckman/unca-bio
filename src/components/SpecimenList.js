import React from 'react';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
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

const DEFAULT_PAGE_SIZE = 20;

class SpecimenList extends React.Component {
  state = {
    pageSize: DEFAULT_PAGE_SIZE,
  };

  onPageSizeChange = pageSize => {
    this.setState({ pageSize: pageSize });
  };

  render() {
    const { classes, isLoading, data } = this.props;
    const { pageSize } = this.state;
    return (
      <React.Fragment>
        <LoadingBar isLoading={isLoading} />
        <AccessibleReactTable
          data={data}
          filterable={true}
          loading={isLoading}
          showPagination={data.length > DEFAULT_PAGE_SIZE}
          pageSize={Math.min(data.length, pageSize)}
          onPageSizeChange={this.onPageSizeChange}
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
    );
  }
}

export default withStyles(styles)(SpecimenList);
