/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

function registerHelper(name, klass, registry) {
  return registry.register(`helper:${name}`, klass);
}

export default registerHelper;
