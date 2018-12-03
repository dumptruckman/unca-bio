import React from 'react';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
import SpecimenDetail from './detail/SpecimenDetail';
import LoadingBar from './shared/LoadingBar';
import { extractScientificName } from '../util/taxonomy';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

const styles = theme => {
  console.log(theme.palette);
  return {
    exportCheckbox: {
      width: '100%',
    },
    exportBar: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.white,
      top: 'auto',
      bottom: 0,
    },
    hidden: {
      display: 'none',
    },
    exportText: {
      fontSize: '1.3em',
      width: '100%',
    },
    avatar: {
      marginRight: '.7em',
    },
    avatarColor: {
      backgroundColor: theme.palette.secondary.light,
    },
    tbody: {
      backgroundColor: theme.palette.background.default,
    },
    bottomMargin: {
      marginBottom: '5em',
    },
  };
};

const DEFAULT_PAGE_SIZE = 20;

class SpecimenList extends React.Component {
  state = {
    pageSize: DEFAULT_PAGE_SIZE,
    toExport: new Set(),
    expanded: {},
  };

  onPageSizeChange = pageSize => {
    this.setState({ pageSize: pageSize });
  };

  toggleExport = (index, checked) => {
    if (checked) {
      this.setState(({ toExport }) => ({
        toExport: new Set(toExport.add(index)),
      }));
    } else {
      this.setState(({ toExport }) => {
        if (toExport.delete(index)) {
          return {
            toExport,
          };
        }
      });
    }
  };

  buildColumns = () => {
    const { classes } = this.props;
    const { toExport } = this.state;
    const exportColumn = [
      {
        Header: 'Export?',
        accessor: '',
        maxWidth: 70,
        minWidth: 70,
        filterable: false,
        style: {
          padding: '0px',
        },
        Cell: ({ index }) => (
          <Checkbox
            className={classes.exportCheckbox}
            checked={toExport.has(index)}
            onChange={(_, checked) => this.toggleExport(index, checked)}
          />
        ),
      },
    ];
    const normalColumns = [
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
    ];
    if (this.props.noExport) {
      return [...normalColumns];
    } else {
      return [...normalColumns, ...exportColumn];
    }
  };

  render() {
    const { classes, isLoading, data, noExport } = this.props;
    const { pageSize, toExport } = this.state;
    return (
      <React.Fragment>
        <LoadingBar isLoading={isLoading} />
        <AccessibleReactTable
          className={classnames({
            [classes.bottomMargin]: toExport.size !== 0,
          })}
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            },
          })}
          getTdProps={() => ({
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          })}
          SubComponent={({ original }) => <SpecimenDetail specimen={original} />}
          columns={this.buildColumns()}
        />
        {!noExport && (
          <AppBar
            position="fixed"
            className={classnames(classes.exportBar, { [classes.hidden]: toExport.size === 0 })}
          >
            <Toolbar>
              <Avatar classes={{ root: classes.avatar, colorDefault: classes.avatarColor }}>
                {toExport.size}
              </Avatar>
              <Typography color="inherit" className={classes.exportText}>{`specimen${
                toExport.size !== 1 ? 's' : ''
              } selected for export`}</Typography>
              <Button variant="contained" color="secondary" disabled={toExport.size === 0}>
                Export to CSV
              </Button>
            </Toolbar>
          </AppBar>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SpecimenList);
