import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import SpecimenList from '../SpecimenList';
import { withAuth } from '../auth/withAuth';
import NotAuthorized from '../shared/NotAuthorized';
import LoadingBar from '../shared/LoadingBar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore } from 'react-firestore';

const styles = theme => ({
  confirmation: {
    padding: '1em',
  },
  table: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
});

class Import extends React.Component {
  state = {
    filePath: null,
    file: null,
    isImporting: false,
    duplicates: null,
  };

  handleChange = event => {
    this.setState({
      filePath: event.target.value,
      file: event.target.files.length === 1 ? event.target.files[0] : null,
    });
  };

  beginImport = () => {
    this.setState({ isImporting: true });
    const { file } = this.state;
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      const lines = content.split(/\r?\n/g);

      if (lines.length < 1) {
        this.setState({
          isImporting: false,
          error: 'data file is blank',
        });
        return;
      }

      const header = lines[0];

      if (lines.length < 2) {
        this.setState({
          isImporting: false,
          error: 'no rows of data present',
        });
      }

      const data = lines.slice(1);
      const specimenData = data
        .filter(line => line) // filter out empty lines
        .map(line =>
          line
            .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
            .map(datum => datum.replace(/"([^"]+(?="))"/g, '$1'))
        )
        .map(specimen => ({
          catalogNumber: specimen[1],
          collectors: specimen[5] ? specimen[5].split(',').map(x => x.trim()) : undefined,
          identification: {
            fullTaxonomy: specimen[0],
          },
          attributes: {
            sex: specimen[2] || undefined,
          },
          locality: {
            collectingDateFrom: specimen[3]
              ? firebase.firestore.Timestamp.fromDate(new Date(specimen[3]))
              : undefined,
            collectingDateTo: specimen[3]
              ? firebase.firestore.Timestamp.fromDate(new Date(specimen[3]))
              : undefined,
            specificLocality: specimen[4] || undefined,
          },
          preparers: specimen[6] ? specimen[6].split(',').map(x => x.trim()) : undefined,
          comments: specimen[9] || undefined,
        }));

      // Identify duplicates
      const duplicates = new Set();
      const sortedSpecimens = specimenData
        .slice()
        .sort((a, b) => a.catalogNumber - b.catalogNumber);
      for (let i = 0; i < sortedSpecimens.length - 1; i++) {
        if (sortedSpecimens[i + 1].catalogNumber === sortedSpecimens[i].catalogNumber) {
          duplicates.add(sortedSpecimens[i]);
          duplicates.add(sortedSpecimens[i + 1]);
        }
      }

      this.setState({
        isImporting: false,
        specimenData,
        duplicates: duplicates.size > 0 ? Array.from(duplicates) : null,
      });
    };
    reader.readAsText(file);
  };

  completeImport = () => {
    this.setState({ isImporting: true });

    const { firestore } = this.props;
    const { specimenData } = this.state;

    const batch = firestore.batch();
    const specimens = firestore.collection('specimens');

    specimenData.map(specimen => {});
  };

  render() {
    const {
      auth: { isAdmin, isLoading },
      classes,
    } = this.props;
    const { isImporting, specimenData, duplicates } = this.state;

    if (isLoading) {
      return (
        <main>
          <LoadingBar isLoading={isLoading} />
        </main>
      );
    } else if (isAdmin) {
      return (
        <main>
          {isImporting && <LoadingBar isLoading={isLoading} />}
          <Input type="file" onChange={this.handleChange} disabled={isImporting} />
          <Button color="primary" onClick={this.beginImport} disabled={isImporting}>
            Import
          </Button>
          {specimenData && (
            <React.Fragment>
              {duplicates && (
                <React.Fragment>
                  <Divider />
                  <div className={classes.table}>
                    <Typography variant="h5" color="secondary">
                      The following duplicate catalog numbers were found in the import data. These
                      should probably be corrected before importing.
                    </Typography>
                    <SpecimenList isLoading={isImporting} data={duplicates} />
                  </div>
                </React.Fragment>
              )}

              <Divider />
              <div className={classes.table}>
                <Typography variant="h5" color="primary">
                  The following data will be imported.
                </Typography>
                <SpecimenList isLoading={isImporting} data={specimenData} />
              </div>

              <Divider />
              <div className={classes.confirmation}>
                <Typography>Do you want to add this data to the catalog?</Typography>
                <Button disabled={isImporting} onClick={this.completeImport} color="secondary">
                  Confirm Import
                </Button>
              </div>
            </React.Fragment>
          )}
        </main>
      );
    } else {
      return (
        <main>
          <NotAuthorized />
        </main>
      );
    }
  }
}

export default withFirestore(withAuth(withStyles(styles)(Import)));
