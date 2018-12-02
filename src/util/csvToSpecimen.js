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
        ]) => ({
          catalogNumber,
          collectors: collectors ? collectors.split(',').map(x => x.trim()) : undefined,
          identification: {
            fullTaxonomy,
            identifiedBy,
          },
          attributes: {
            sex,
          },
          locality: {
            collectingDateFrom: date
              ? firebase.firestore.Timestamp.fromDate(new Date(date))
              : undefined,
            collectingDateTo: date
              ? firebase.firestore.Timestamp.fromDate(new Date(date))
              : undefined,
            specificLocality,
          },
          preparers: preparers ? preparers.split(',').map(x => x.trim()) : undefined,
          comments,
        })
      )
  );
};
