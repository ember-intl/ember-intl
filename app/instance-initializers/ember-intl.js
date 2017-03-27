/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { deprecate } = Ember;

export function instanceInitializer(instance) {
  deprecate('[ember-intl] instance initializer is deprecated, no longer necessary to call in testing.', false, {
    id: 'ember-intl-instance-initalizer',
    until: '3.0.0'
  });
}

export default {
  name: 'ember-intl',
  initialize() {}
};
