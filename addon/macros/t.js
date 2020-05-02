import { get } from '@ember/object';
import EmptyObject from 'ember-intl/-private/utils/empty-object';
import intl from './intl';

function partitionDynamicValuesAndStaticValues(options) {
  const dynamicValues = new EmptyObject();
  const staticValues = new EmptyObject();

  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (value instanceof Raw) {
      staticValues[key] = value.valueOf();
    } else {
      dynamicValues[key] = value;
    }
  });

  return [dynamicValues, staticValues];
}

function mapPropertiesByHash(object, hash) {
  const result = new EmptyObject();

  Object.keys(hash).forEach((key) => {
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

export default function createTranslatedComputedProperty(translationKey, options) {
  const hash = options || new EmptyObject();
  const [dynamicValues, staticValues] = partitionDynamicValuesAndStaticValues(hash);
  const dependentKeys = Object.values(dynamicValues);

  return intl(...dependentKeys, (intl, propertyKey, ctx) =>
    intl.t(translationKey, { ...staticValues, ...mapPropertiesByHash(ctx, dynamicValues) })
  );
}
