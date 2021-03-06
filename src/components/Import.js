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
import { loadSpecimens } from '../util/specimenCsv';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router';

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
    specimenData: null,
    existing: null,
  };

  findExisting = async specimenData => {
    const { firestore } = this.props;

    return Promise.all(
      specimenData.map(specimen =>
        firestore
          .collection('specimens')
          .doc(specimen.catalogNumber)
          .get()
      )
    );
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
        .then(async specimenData => {
          const duplicates = findDuplicates(specimenData);

          try {
            const docs = await this.findExisting(specimenData);
            const existing = docs.filter(d => d.exists);
            this.setState({ existing: existing.length > 0 ? existing : null });
          } catch (e) {
            console.log(e);
            alert(e);
          } finally {
            this.setState({
              isImporting: false,
              specimenData,
              duplicates: duplicates.size > 0 ? Array.from(duplicates) : null,
            });
          }
        })
        .catch(error => {
          this.setState({
            isImporting: false,
          });
          console.log(error);
          alert(error);
        });
    };
    reader.readAsText(file);
  };

  completeImport = () => {
    this.setState({ isImporting: true });

    const { firestore, auth, history } = this.props;
    const { specimenData } = this.state;

    auth
      .doReauthenticate()
      .then(async () => {
        const specimensCollection = firestore.collection('specimens');
        // Max batch size is 500
        for (let i = 0; i < specimenData.length; i += 500) {
          const batch = firestore.batch();
          // batch i through i + 500
          specimenData.slice(i, i + 500).forEach(specimen => {
            const specimenRef = specimensCollection.doc(specimen.catalogNumber);
            batch.set(specimenRef, specimen);
          });
          const range = Math.min(i + 500, specimenData.length);
          try {
            await batch.commit();
            alert(`Specimens ${i + 1} to ${range} have been imported successfully.`);
          } catch (e) {
            console.log(
              `Specimens ${i + 1} to ${range} have failed to import. Import will stop`,
              e
            );
            alert(
              `Specimens ${i + 1} to ${range} have failed to import. Import will stop. Cause: ${e}`
            );
            // return to stop further database batch write attempts
            return;
          } finally {
            this.setState({
              isImporting: false,
              duplicates: null,
              existing: null,
              specimenData: null,
            });
          }
        }
        alert('Import successful! You will be redirected to specimen browser.');
        history.push(routes.MASTER);
      })
      .catch(error => {
        // Reauthentication error
        console.log(error);
        this.setState({ isImporting: false });
        alert(`You cannot import the data. Reason: ${error}`);
      });
  };

  render() {
    const {
      auth: { isAdmin, isLoading },
      classes,
    } = this.props;
    const { isImporting, specimenData, duplicates, file, existing } = this.state;

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
          <LoadingBar isLoading={isImporting} />
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
                    <SpecimenList isLoading={isImporting} data={duplicates} noExport />
                  </div>
                </React.Fragment>
              )}

              {existing && (
                <React.Fragment>
                  <Divider />
                  <div className={classes.table}>
                    <Typography variant="h5" color="secondary">
                      The following catalog entries will be overwritten if you proceed!
                    </Typography>
                    <SpecimenList isLoading={isImporting} data={existing.map(d => d.data())} />
                  </div>
                </React.Fragment>
              )}

              <Divider />
              <div className={classes.table}>
                <Typography variant="h5" color="primary">
                  The following data will be imported.
                </Typography>
                <SpecimenList isLoading={isImporting} data={specimenData} noExport />
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

export default withRouter(withFirestore(withAuth(withStyles(styles)(Import))));
