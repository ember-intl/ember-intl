import { get } from '@ember/object';

import type { TOptions } from '../services/intl';
import intl from './intl';

function extractValues(options: Record<string, string | Raw<string>>) {
  const dynamicValues = {} as Record<string, string>;
  const staticValues = {} as Record<string, string>;

  Object.keys(options).forEach((key: string) => {
    const value = options[key];

    if (value instanceof Raw) {
      staticValues[key] = value.valueOf();
    } else if (typeof value !== 'undefined') {
      dynamicValues[key] = value;
    }
  });

  return { dynamicValues, staticValues };
}

function mapPropertiesByHash<
  O extends Record<string, unknown>,
  H extends Record<string, keyof O>,
>(object: O, hash: H): { [K in keyof H]: O[H[K]] } {
  const result = {} as { [K in keyof H]: O[H[K]] };

  (Object.keys(hash) as (keyof H)[]).forEach((key) => {
    result[key] = get(object, hash[key]) as O[H[typeof key]];
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
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  valueOf(): T {
    return this._value;
  }

  toString(): string {
    return String(this._value);
  }
}

type MacroOptions = {
  [K in keyof TOptions]: TOptions[K] | Raw<TOptions[K]>;
};

/**
 * Use this utility function to mark a value as a raw literal.
 *
 * @deprecated Will be removed in `ember-intl@7.0.0`.
 * @param {*} value The value to mark as a raw literal.
 * @return The same value, but boxed in the `Raw` class so that the consuming
 *  macro understands that this value should be used as is.
 */
export function raw<T>(value: T): Raw<T> {
  return new Raw(value);
}

/**
 * @deprecated Will be removed in `ember-intl@7.0.0`.
 */
export default function t(key: string, options?: MacroOptions) {
  const hash = options || {};

  const { dynamicValues, staticValues } = extractValues(
    hash as Record<string, string | Raw<string>>,
  );

  const dependentKeys = Object.values(dynamicValues);

  return intl(...dependentKeys, (intl, propertyKey, ctx) => {
    const _options = {
      ...staticValues,
      ...mapPropertiesByHash(ctx as Record<string, unknown>, dynamicValues),
    };

    return intl.t(key, _options);
  });
}
