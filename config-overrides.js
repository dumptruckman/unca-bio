const rewireEslint = require('react-app-rewire-eslint');
const { injectBabelPlugin } = require('react-app-rewired');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

/* config-overrides.js */
module.exports = function override(config, env) {
  let newConfig = config;

  newConfig = injectBabelPlugin('transform-class-properties', newConfig);
  newConfig = injectBabelPlugin('transform-object-rest-spread', newConfig);
  newConfig = rewireEslint(newConfig, env, overrideEslintOptions);

  return newConfig;
};
