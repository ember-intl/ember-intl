const { ordinals, plurals } = require('../../../utils/cldr-core');

module.exports = function isKnownLanguage(language) {
  return language in ordinals || language in plurals;
};
