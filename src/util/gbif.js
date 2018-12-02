import { extractScientificName } from './taxonomy';

export const getGbifSpecimen = async taxonomy => {
  const json = await (await fetch(
    `http://api.gbif.org/v1/species?name=${taxonomy.split(' ').join('%20')}`
  )).json();
  return json.results ? (json.results.length > 0 ? json.results[0] : undefined) : undefined;
};

export const addFullTaxonomy = async specimen => {
  try {
    const s = await getGbifSpecimen(specimen.identification.fullTaxonomy);
    return s ? createUpdatedSpecimen(specimen, s) : specimen;
  } catch (e) {
    console.log(e);
    return specimen;
  }
};

const createUpdatedSpecimen = (specimen, s) => {
  const { identification } = specimen;
  const { fullTaxonomy: taxonomy } = identification;

  const fullTaxonomy = `${s.kingdom} ${s.phylum} ${s.class} ${s.order} ${
    s.family
  } ${extractScientificName(taxonomy)}`;
  const newSpecimen = {
    ...specimen,
    identification: {
      ...identification,
      fullTaxonomy,
    },
  };
  if (s.vernacularName) newSpecimen.identification.commonName = s.vernacularName;
  if (s.authorship) {
    newSpecimen.identification.authorship = s.authorship.trim().replace(/\((.*?)\)/g, '$1');
  }
  return newSpecimen;
};
