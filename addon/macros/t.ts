import { get } from '@ember/object';
import { assign } from '@ember/polyfills';
import EmptyObject from 'ember-intl/-private/empty-object';
import intl from './intl';
import { FormatterOptions, FormatResult } from '../-private/formatters/-base';
import { IntlComputedPropertyCallback } from './intl';

function partitionDynamicValuesAndStaticValues(options: FormatterOptions) {
  const dynamicValues = new EmptyObject();
  const staticValues = new EmptyObject();

  Object.keys(options).forEach(key => {
    const value = options[key];
    if (value instanceof Raw) {
      staticValues[key] = value.valueOf();
    } else {
      dynamicValues[key] = value;
    }
  });

  return [dynamicValues, staticValues];
}

function mapPropertiesByHash(object: FormatterOptions, hash: FormatterOptions) {
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
class Raw<T> {
  readonly _value: T;

  constructor(value: T) {
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
export function raw<T>(value: T) {
  return new Raw(value);
}

export default function createTranslatedComputedProperty<Context = any>(
  translationKey: string,
  options: FormatterOptions
) {
  const hash = options || new EmptyObject();
  const [dynamicValues, staticValues] = partitionDynamicValuesAndStaticValues(hash);
  const dependentKeys = Object.values(dynamicValues);

  const translate: IntlComputedPropertyCallback<Context, FormatResult> = function translate(intl, _, ctx) {
    return intl.t(translationKey, assign({}, staticValues, mapPropertiesByHash(ctx, dynamicValues)));
  };

  // @ts-ignore
  return intl<Context, FormatResult>(...dependentKeys, translate);
}
