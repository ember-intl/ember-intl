import { computed, get, defineProperty } from '@ember/object';
import { getOwner } from '@ember/application';
import IntlService from '../services/intl';
import ComputedProperty from '@ember/object/computed';
import { ComputedPropertyGetterObj } from '@ember/object/-private/types';

/**
 * @private
 * @hide
 */
export const __intlInjectionName: unique symbol = `intl-${Date.now().toString(36)}` as any;
interface MaybeIntlInjected {
  [__intlInjectionName]?: IntlService;
}
type IntlComputedContext = MaybeIntlInjected & object;

/**
 * @private
 * @hide
 */
export interface IntlComputedPropertyCallback<Context extends IntlComputedContext = any, Result = any> {
  (this: Context, intl: IntlService, propertyKey: string, context: Context): Result;
}

function intl<Context extends IntlComputedContext = any, Result = any>(
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  k1: string,
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  k1: string,
  k2: string,
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  k1: string,
  k2: string,
  k3: string,
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  k1: string,
  k2: string,
  k3: string,
  k4: string,
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  k1: string,
  k2: string,
  k3: string,
  k4: string,
  k5: string,
  cb: IntlComputedPropertyCallback<Context, Result>
): ComputedProperty<Result>;
function intl<Context extends IntlComputedContext = any, Result = any>(
  ...dependentKeysAndGetterFn: any[]
): ComputedProperty<Result> {
  const getterFn: IntlComputedPropertyCallback<Context, Result> = dependentKeysAndGetterFn.pop();
  const dependentKeys: string[] = dependentKeysAndGetterFn;

  const getter: ComputedPropertyGetterObj<Result> = {
    get(this: Context, propertyKey: string) {
      if (!get(this, __intlInjectionName)) {
        defineProperty(this, (__intlInjectionName as unknown) as string, {
          value: getOwner(this).lookup('service:intl'),
          enumerable: false
        });
      }
      const intl = get(this, __intlInjectionName);
      return getterFn.call(this, intl, propertyKey, this);
    }
  };

  // @ts-ignore
  return computed(`${(__intlInjectionName as unknown) as string}.locale`, ...dependentKeys, getter) as ComputedProperty<
    Result
  >;
}

export default intl;
