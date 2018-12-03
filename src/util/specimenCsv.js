import firebase from 'firebase';
import { extractScientificName } from './taxonomy';

export const loadSpecimens = fileContents => {
  const lines = fileContents.split(/\r?\n/g);

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
  return (
    data
      // filter out empty lines
      .filter(line => line)
      // split up data in each line
      .map(line =>
        line
          // split on commas unless wrapped in double quotes
          .match(/("[^"]*"|[^,]*)(?:,|$)/g)
          .map(datum =>
            datum
              // Remove comma at end
              .replace(/,\s*$/, '')
              // remove the double quotes if they were present
              .replace(/"([^"]+(?="))"/g, '$1')
          )
      )
      // Transform blank data points to undefined otherwise trim whitespace
      .map(specimen =>
        specimen.map(datum => (datum === '-' || datum === '' ? undefined : datum.trim()))
      )
      // Drop any specimens without catalog number
      .filter(specimen => specimen[1])
      // Create the specimen object
      .map(
        ([
          fullTaxonomy,
          catalogNumber,
          sex,
          date,
          specificLocality,
          collectors,
          preparers,
          cabinet,
          drawer,
          comments,
          identifiedBy,
        ]) => {
          const specimen = { catalogNumber };
          if (collectors) specimen.collectors = collectors.split(',').map(x => x.trim());
          if (fullTaxonomy || identifiedBy) {
            const identification = {};
            if (fullTaxonomy) identification.fullTaxonomy = fullTaxonomy;
            if (identifiedBy) identification.identifiedBy = identifiedBy;
            specimen.identification = identification;
          }
          if (sex) specimen.attributes = { sex };
          if (date || specificLocality) {
            const locality = {};
            if (date) {
              locality.collectingDateFrom = firebase.firestore.Timestamp.fromDate(
                new Date(date + ' EST')
              );
              locality.collectingDateTo = firebase.firestore.Timestamp.fromDate(
                new Date(date + ' EST')
              );
            }
            if (specificLocality) locality.specificLocality = specificLocality;
            specimen.locality = locality;
          }
          if (preparers) specimen.preparers = preparers.split(',').map(x => x.trim());
          if (comments) specimen.comments = comments;
          return specimen;
        }
      )
  );
};

const toCsvForm = value => {
  if (value) {
    if (value.includes(',')) {
      return `"${value}"`;
    } else {
      return `${value}`;
    }
  }
  return '';
};

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export const specimensToCsv = specimenData => {
  let result =
    'Taxonomic Element,Collection Catalog No.,Sex,Date,Locality,Collector,Preparer,Cabinet,Drawer,Comments,Identifier\n';

  specimenData
    .map(
      ({
        identification,
        collectors,
        attributes,
        locality,
        preparers,
        comments,
        catalogNumber,
      }) => {
        let result = '';
        result += identification
          ? `${toCsvForm(extractScientificName(identification.fullTaxonomy))},`
          : ',';
        result += `${toCsvForm(catalogNumber)},`;
        result += attributes ? `${toCsvForm(attributes.sex)},` : ',';
        result +=
          locality && locality.collectingDateFrom
            ? `${toCsvForm(formatDate(locality.collectingDateFrom.toDate()))},`
            : ',';
        result += locality ? `${toCsvForm(locality.specificLocality)},` : ',';
        result += collectors ? `${toCsvForm(collectors.join(','))},` : ',';
        result += preparers ? `${toCsvForm(preparers.join(','))},` : ',';

        // We are not tracking cabinet & drawer
        result += ',,';

        result += `${toCsvForm(comments)},`;
        result += identification ? `${toCsvForm(identification.identifiedBy)}\n` : '\n';

        return result;
      }
    )
    .forEach(specimenLine => (result += specimenLine));

  return result;
};

export function downloadCsv(filename, csvString) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
