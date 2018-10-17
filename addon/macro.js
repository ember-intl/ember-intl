/*
 * <3 ember-i18n <3
 * https://github.com/jamesarosen/ember-i18n/blob/master/addon/utils/macro.js
 */
import { assert } from '@ember/debug';
import { computed, get, getProperties } from '@ember/object';
import { getOwner } from '@ember/application';
import EmptyObject from 'ember-intl/-private/empty-object';

function partitionDynamicValuesAndStaticValues(options) {
  const dynamicValues = new EmptyObject();
  const staticValues = new EmptyObject();

  Object.keys(options).forEach(key => {
    const value = options[key];
    if (value instanceof Raw) {
      staticValues[key] = value;
    } else {
      dynamicValues[key] = value;
    }
  });

  return [dynamicValues, staticValues];
}

function mapPropertiesByHash(object, hash) {
  const result = new EmptyObject();

  Object.keys(hash).forEach(key => {
    result[key] = get(object, hash[key]);
  });

  return result;
}

/**
 * This class is used to box primitive types and mark them as raw literals that
 * should be used as is by the translation macro.
 *
 * This class is internal. Instead of using this class directly, use the `raw`
 * utility function, that creates an instance of this class.
 */
class Raw {
  constructor(value) {
    this._value = value;
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return String(this._value);
  }
}

/**
 * Use this utility function to mark a value as a raw literal.
 *
 * @param {*} value The value to mark as a raw literal.
 * @return The same value, but boxed in the `Raw` class so that the consuming
 *  macro understands that this value should be used as is.
 */
export function raw(value) {
  return new Raw(value);
}

export default function createTranslatedComputedProperty(key, options) {
  const hash = options || new EmptyObject();
  const [dynamicValues, staticValues] = partitionDynamicValuesAndStaticValues(hash);
  const dependentKeys = ['intl.locale'].concat(Object.values(dynamicValues));

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

    return intl.t(key, Object.assign({}, staticValues, mapPropertiesByHash(this, dynamicValues)));
  }).readOnly();
}
