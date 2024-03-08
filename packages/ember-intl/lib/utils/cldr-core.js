const ordinals = require('cldr-core/supplemental/ordinals.json').supplemental[
  'plurals-type-ordinal'
];

const plurals = require('cldr-core/supplemental/plurals.json').supplemental[
  'plurals-type-cardinal'
];

module.exports = {
  ordinals,
  plurals,
};
