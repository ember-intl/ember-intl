import { computed, get, defineProperty } from '@ember/object';
import type ComputedProperty from '@ember/object/computed';
import { getOwner } from '@ember/application';
import type IntlService from '../services/intl';

export type GetterFn<T, C = unknown> = (this: C, intl: IntlService, key: string, context: C) => T;

/**
 * @private
 * @hide
 */
export const __intlInjectionName = `intl-${Date.now().toString(36)}` as 'intl-PRIVATE-SYMBOL';

export default function intl<T>(getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(key0: string, key1: string, key2: string, getterFn: GetterFn<T>): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  key6: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  key6: string,
  key7: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  key6: string,
  key7: string,
  key8: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  key6: string,
  key7: string,
  key8: string,
  key9: string,
  getterFn: GetterFn<T>
): ComputedProperty<T>;
export default function intl<T>(
  key0: string,
  key1: string,
  key2: string,
  key3: string,
  key4: string,
  key5: string,
  key6: string,
  key7: string,
  key8: string,
  key9: string,
  ...rest: [string | GetterFn<T>][] // Better than nothing ¯\_(ツ)_/¯
): ComputedProperty<T>;
export default function intl<T>(...dependentKeysAndGetterFn: unknown[]): ComputedProperty<T> {
  const getterFn = dependentKeysAndGetterFn.pop() as GetterFn<T>;
  const dependentKeys = dependentKeysAndGetterFn as string[];

  return computed(`${__intlInjectionName}.locale`, ...dependentKeys, function (
    this: { [__intlInjectionName]?: IntlService },
    propertyKey: string
  ) {
    if (!get(this, __intlInjectionName)) {
      defineProperty(this, __intlInjectionName, {
        value: getOwner(this).lookup('service:intl'),
        enumerable: false,
      });
    }
    const intl = get(this, __intlInjectionName);
    return getterFn.call(this, intl, propertyKey, this);
  } as any) as ComputedProperty<T>;
}
