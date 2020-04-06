const isEngine = require('./is-engine');

function findEngine(current) {
  do {
    if (isEngine(current)) {
      return current;
    }
  } while ((current = current.parent));
  return null;
}

module.exports = findEngine;
