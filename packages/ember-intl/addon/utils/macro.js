/*
 * <3 ember-i18n <3
 * https://github.com/jamesarosen/ember-i18n/blob/master/addon/utils/macro.js
 */
import Ember from 'ember';

const { get, assert, computed } = Ember;
const keys = Object.keys;

function values(object) {
  return keys(object).map((key) => object[key]);
}

function mapPropertiesByHash(object, hash) {
  const result = {};

  keys(hash).forEach(function(key) {
    result[key] = get(object, hash[key]);
  });

  return result;
}

export default function createTranslatedComputedProperty(key, options) {
  const hash = options || Object.create(null);
  const dependentKeys = ['intl.locale'].concat(values(hash));

  return computed(...dependentKeys, function() {
    const intl = get(this, 'intl');
    assert(`Cannot translate "${key}".\n${this} does not have an intl property set. Try: intl: Ember.inject.service()`, intl);

    return intl.t(key, mapPropertiesByHash(this, hash));
  }).readOnly();
}
