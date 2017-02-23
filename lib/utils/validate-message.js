/* jshint node: true */

'use strict';

const messageParser = require('intl-messageformat-parser');

function validateMessage(message) {
  messageParser.parse(message);
}

module.exports = validateMessage;
