const extractScientificName = fullTaxonomy => {
  if (!fullTaxonomy || fullTaxonomy === '') {
    return fullTaxonomy;
  }
  const names = fullTaxonomy.split(' ');
  const speciesIndex = names.findIndex(x => x[0] === x[0].toLowerCase());
  if (speciesIndex === 0) {
    return names.join(' ');
  } else if (speciesIndex > 0) {
    return names.slice(speciesIndex - 1).join(' ');
  } else {
    return names[names.length - 1];
  }
};

export { extractScientificName };
