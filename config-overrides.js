const rewireEslint = require('react-app-rewire-eslint');
const { injectBabelPlugin } = require('react-app-rewired');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

/* config-overrides.js */
module.exports = function override(config, env) {
  let newConfig;

  newConfig = injectBabelPlugin('transform-class-properties', config);
  newConfig = injectBabelPlugin('transform-object-rest-spread', config);
  newConfig = rewireEslint(config, env, overrideEslintOptions);

  return newConfig;
};
