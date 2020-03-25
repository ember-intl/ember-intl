/* eslint-env node */
'use strict';

const parser = require('intl-messageformat-parser');

function extractICUArguments(string) {
  try {
    // Errors thrown by the parser won't include any details about the string. By rethrowing the
    // error with the string quoted it's much easier to identify which ICU argument was invalid.
    return parser
      .parse(string)
      .filter(
        (element) =>
          parser.isTimeElement(element) ||
          parser.isDateElement(element) ||
          parser.isArgumentElement(element) ||
          parser.isSelectElement(element) ||
          parser.isPluralElement(element)
      )
      .map((argumentElement) => argumentElement.value);
  } catch (err) {
    throw new Error(`An error occured (${err.message}) when extracting ICU arguments for '${string}'`);
  }
}

module.exports = extractICUArguments;
