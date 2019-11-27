/* eslint-env node */

'use strict';

function isEngine(addon) {
  return addon.pkg && addon.pkg.keywords && addon.pkg.keywords.includes('ember-engine');
}

module.exports = isEngine;
