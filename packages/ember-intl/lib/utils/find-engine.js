function isEngine(addon) {
  return (
    addon.pkg &&
    addon.pkg.keywords &&
    addon.pkg.keywords.includes('ember-engine')
  );
}

function findEngine(current) {
  do {
    if (isEngine(current)) {
      return current;
    }
  } while ((current = current.parent));
  return null;
}

module.exports = findEngine;
