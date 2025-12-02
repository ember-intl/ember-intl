function findEngine(addon) {
  do {
    const isEngine = addon.pkg?.keywords?.includes('ember-engine');

    if (isEngine) {
      return addon;
    }
  } while ((addon = addon.parent));

  return undefined;
}

module.exports = findEngine;
