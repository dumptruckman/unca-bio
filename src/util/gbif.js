import { extractScientificName } from './taxonomy';

export const getGbifSpecimen = taxonomy =>
  new Promise((resolve, reject) => {
    fetch(`http://api.gbif.org/v1/species?name=${taxonomy.split(' ').join('%20')}`)
      .then(response => {
        response
          .json()
          .then(json =>
            resolve(
              json.results ? (json.results.length > 0 ? json.results[0] : undefined) : undefined
            )
          )
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });

export const addFullTaxonomy = specimen =>
  new Promise((resolve, reject) => {
    console.log(specimen);
    const { identification } = specimen;
    const { fullTaxonomy: taxonomy } = identification;
    getGbifSpecimen(taxonomy)
      .then(s => {
        if (s) {
          const fullTaxonomy = `${s.kingdom} ${s.phylum} ${s.class} ${s.order} ${
            s.family
          } ${extractScientificName(taxonomy)}`;
          resolve({
            ...specimen,
            identification: {
              ...identification,
              fullTaxonomy,
              commonName: s.vernacularName,
              authorship: s.authorship,
            },
          });
        } else {
          resolve(specimen);
        }
      })
      .catch(error => {
        console.log(error);
        resolve(specimen);
      });
  });
