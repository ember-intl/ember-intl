/* eslint-env node */
'use strict';

const parser = require('@ember-intl/intl-messageformat-parser');

function extractICUArguments(string) {
  return parser
    .parse(string)
    .elements.filter(element => element.type === 'argumentElement')
    .map(argumentElement => argumentElement.id);
}

module.exports = extractICUArguments;
