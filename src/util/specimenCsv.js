import firebase from 'firebase';

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
