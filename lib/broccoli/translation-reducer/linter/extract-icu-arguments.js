const parser = require('@formatjs/icu-messageformat-parser');
const traverse = require('../../../message-validator/ast-traverse');
const parseOptions = require('../../../parse-options');

function extractICUArguments(string) {
  try {
    const args = new Set();
    const recordVisitedNodeValue = (node) => args.add(node.value);

    // Errors thrown by the parser won't include any details about the string. By rethrowing the
    // error with the string quoted it's much easier to identify which ICU argument was invalid.
    traverse(parser.parse(string, parseOptions), {
      [parser.TYPE.time]: recordVisitedNodeValue,
      [parser.TYPE.date]: recordVisitedNodeValue,
      [parser.TYPE.plural]: recordVisitedNodeValue,
      [parser.TYPE.select]: recordVisitedNodeValue,
      [parser.TYPE.argument]: recordVisitedNodeValue,
    });

    return [...args];
  } catch (err) {
    throw new Error(`An error occurred (${err.message}) when extracting ICU arguments for '${string}'`);
  }
}

module.exports = extractICUArguments;
