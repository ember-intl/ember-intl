import { get } from '@ember/object';
import { assign } from '@ember/polyfills';
import EmptyObject from 'ember-intl/-private/empty-object';
import intl from './intl';
import { Result } from '../-private/formatters/format-message';
import { tOptions } from '../services/intl';
import { IntlComputedPropertyCallback } from './intl';

type DynamicOptions<Context> = {
  [P in keyof tOptions]: keyof Context;
};

// would be nice to be able to check that the property on Context
// the key refers to is the right type for P in tOptions
type TranslatedComputedPropertyOptions<Context> = {
  [P in keyof tOptions]: Raw<tOptions[P]> | keyof Context;
};

function partitionDynamicValuesAndStaticValues<Context>(
  options: TranslatedComputedPropertyOptions<Context>
): [DynamicOptions<Context>, tOptions] {
  const dynamicValues = new EmptyObject() as DynamicOptions<Context>;
  const staticValues = new EmptyObject() as tOptions;

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

function mapPropertiesByHash<Context>(ctx: Context, hash: DynamicOptions<Context>) {
  const result = new EmptyObject() as tOptions;

  Object.keys(hash).forEach(key => {
    result[key] = get(ctx, hash[key]);
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
  options: TranslatedComputedPropertyOptions<Context> = new EmptyObject()
) {
  const [dynamicValues, staticValues] = partitionDynamicValuesAndStaticValues(options);
  const dependentKeys = Object.values(dynamicValues);

  const translate: IntlComputedPropertyCallback<Context, Result> = function translate(intl, _, ctx) {
    return intl.t(translationKey, assign({}, staticValues, mapPropertiesByHash(ctx, dynamicValues)));
  };

  // @ts-ignore
  return intl<Context, Result>(...dependentKeys, translate);
}
