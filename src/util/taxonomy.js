const extractScientificName = fullTaxonomy => {
  if (!fullTaxonomy) {
    return fullTaxonomy;
  }
  const names = fullTaxonomy.split(' ');
  const speciesIndex = names.findIndex(x => x[0] === x[0].toLowerCase());
  if (speciesIndex) {
    if (speciesIndex === 0) {
      return names.join(' ');
    } else {
      return names.slice(speciesIndex - 1).join(' ');
    }
  } else {
    return names[names.length - 1];
  }
};

export { extractScientificName };
