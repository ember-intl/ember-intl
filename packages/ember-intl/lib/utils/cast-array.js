'use strict';

module.exports = function(obj) {
  if (typeof obj === 'undefined') {
    return [];
  }

  return Array.isArray(obj) ? obj : [obj];
};
