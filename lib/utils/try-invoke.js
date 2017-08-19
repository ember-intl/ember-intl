/* eslint-env node */

'use strict';

module.exports = function tryInvoke(obj, methodName, ...args) {
  if (obj && typeof obj[methodName] === 'function') {
    return obj[methodName].apply(obj, args);
  }
};
