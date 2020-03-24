/* eslint-env node */

'use strict';

function traverse(node, visitor) {
  if (!node || !node.type) {
    return;
  }

  if (visitor[node.type]) {
    visitor[node.type](node);
  }

  switch (node.type) {
    case 'messageFormatPattern': {
      node.elements.forEach((it) => traverse(it, visitor));
      break;
    }
    case 'argumentElement': {
      traverse(node.format, visitor);
      break;
    }
    case 'optionalFormatPattern': {
      traverse(node.value, visitor);
      break;
    }
    case 'pluralFormat': {
      node.options.forEach((it) => traverse(it, visitor));
      break;
    }
    case 'selectFormat': {
      node.options.forEach((it) => traverse(it, visitor));
      break;
    }
  }
}

module.exports = traverse;
