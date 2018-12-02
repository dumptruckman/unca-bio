import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SpecimenList from './SpecimenList';
import { withAuth } from './auth/withAuth';
import NotAuthorized from './shared/NotAuthorized';
import LoadingBar from './shared/LoadingBar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore } from 'react-firestore';
import { addFullTaxonomy } from '../util/gbif';
import { loadSpecimens } from '../util/csvToSpecimen';

const styles = theme => ({
  confirmation: {
    padding: '1em',
  },
  table: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  noFileSupport: {
    width: '100%',
    textAlign: 'center',
    marginTop: '2em',
  },
});

const findDuplicates = specimenData => {
  const sortedSpecimens = specimenData.slice().sort((a, b) => a.catalogNumber - b.catalogNumber);

  // Identify duplicates
  const duplicates = new Set();
  for (let i = 0; i < sortedSpecimens.length - 1; i++) {
    if (sortedSpecimens[i + 1].catalogNumber === sortedSpecimens[i].catalogNumber) {
      duplicates.add(sortedSpecimens[i]);
      duplicates.add(sortedSpecimens[i + 1]);
    }
  }

  return duplicates;
};

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
      const specimenData = loadSpecimens(content);

      Promise.all(specimenData.map(addFullTaxonomy))
        .then(specimenData => {
          const duplicates = findDuplicates(specimenData);

          this.setState({
            isImporting: false,
            specimenData,
            duplicates: duplicates.size > 0 ? Array.from(duplicates) : null,
          });
        })
        .catch(error => {
          this.setState({
            isImporting: false,
          });
          alert(error);
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
    const { isImporting, specimenData, duplicates, file } = this.state;
    console.log(file);

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      return (
        <div className={classes.noFileSupport}>
          <Typography variant="h3" color="secondary">
            Your browser does not support this feature.
          </Typography>
        </div>
      );
    } else if (isLoading) {
      return <LoadingBar isLoading={isLoading} />;
    } else if (isAdmin) {
      return (
        <React.Fragment>
          {isImporting && <LoadingBar isLoading={isLoading} />}
          <Input
            type="file"
            onChange={this.handleChange}
            disabled={isImporting}
            inputProps={{ accept: '.csv' }}
          />
          <Button
            color="primary"
            onClick={this.beginImport}
            disabled={isImporting || !(file instanceof Blob)}
          >
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
        </React.Fragment>
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
