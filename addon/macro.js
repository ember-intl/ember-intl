/*
 * <3 ember-i18n <3
 * https://github.com/jamesarosen/ember-i18n/blob/master/addon/utils/macro.js
 */
import { assert } from '@ember/debug';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import EmptyObject from 'ember-intl/-private/empty-object';

const { keys } = Object;

function values(object) {
  return keys(object).map(key => object[key]);
}

function mapPropertiesByHash(object, hash) {
  const result = {};

  keys(hash).forEach(function(key) {
    result[key] = get(object, hash[key]);
  });

  return result;
}

export default function createTranslatedComputedProperty(key, options) {
  const hash = options || new EmptyObject();
  const dependentKeys = ['intl.locale'].concat(values(hash));

  return computed(...dependentKeys, function() {
    let intl = get(this, 'intl');
    if (!intl) {
      const owner = getOwner(this);
      assert(
        `Cannot translate "${key}".\n${this} does not have an 'intl' property set or an owner to look up the service from.`,
        owner
      );

      intl = owner.lookup('service:intl');

      assert(
        `Cannot translate "${key}".\n${this} does not have an 'intl' property set and there is no 'intl' service registered with the owner.`,
        intl
      );
    }

    return intl.t(key, mapPropertiesByHash(this, hash));
  }).readOnly();
}
