import { getOwner } from '@ember/application';
import { computed, defineProperty } from '@ember/object';

import type IntlService from '../services/intl';

type GetterFn<T, C = unknown> = (
  this: C,
  intl: IntlService,
  key: string,
  context: C,
) => T;

type KeyOrGetterFn<T> = string | GetterFn<T>;

/**
 * @private
 * @hide
 */
const __intlInjectionName = `intl-${Date.now().toString(36)}`;

/**
 * @deprecated Will be removed in v7.
 *
 * In classic components, inject the `intl` service
 * and create a computed property.
 *
 * In Glimmer components, inject the `intl` service
 * and create a getter.
 */
export default function intl<T>(...args: KeyOrGetterFn<T>[]) {
  const getterFn = args.pop() as GetterFn<T>;

  const dependentKeys = [
    `${__intlInjectionName}.locale`,
    ...(args as string[]),
  ];

  return computed(...dependentKeys, function (propertyKey: string) {
    if (!this[__intlInjectionName]) {
      defineProperty(this, __intlInjectionName, {
        // @ts-expect-error: https://github.com/typed-ember/ember-cli-typescript/issues/1471
        value: getOwner(this).lookup('service:intl'),
        enumerable: false,
      });
    }

    const intl = this[__intlInjectionName] as IntlService;

    return getterFn.call(this, intl, propertyKey, this);
  });
}
