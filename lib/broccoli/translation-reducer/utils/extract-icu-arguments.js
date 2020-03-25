/* eslint-env node */
'use strict';

const parser = require('intl-messageformat-parser');

function extractICUArguments(string) {
  return parser
    .parse(string)
    .filter((element) => parser.isLiteralElement(element) === false)
    .map((argumentElement) => argumentElement.id);
}

module.exports = extractICUArguments;
